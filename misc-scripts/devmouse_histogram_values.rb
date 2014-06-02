######
#
# Copyright 2013 Allen Institute for Brain Science
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
# http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
#
# devmouse_histogram_values.rb
#
# This Ruby script will download all ISH gene expression values for 11 major
# developing mouse brain structures for all non-failed Allen Developing Mouse Brain Atlas experiments
# No replicate series are considered; one data set for each combination of Gene and Age is marked as a 'delegate'; that experiment is used in this analysis
# The script writes the expression energy values for these data sets to a comma-delimited text file
#
# Use case is to download the data behind the histogram on pages such as
# http://developingmouse.brain-map.org/gene/show/11224
#
# The reported value is "expression energy".  The value is not log-transformed
# More information about the derivation of expression energy is available in the
# "EXPRESSION GRIDDING MODULE" section of the Informatics Data Processing document at
# http://help.brain-map.org/download/attachments/2818169/InformaticsDataProcessing.pdf
#
# These expression energy values are determined by our informatics algorithms. They are very good
# at determining expression levels for such a large data set, but are not immune to false positives.
# Critical results should be verified by viewing the original image data.
#
# This data is generally qualitative.  Be wary when comparing quantitative expression values between experiments,
# even when the same probe was used.  Refer to the InformaticsDataProcessing white paper referenced above for more information.
#
# After running the script, you will probably want to sort the data by gene_acronym, embryonic DESC, days
#
# Tested on
# Ruby 1.9.3 running on CentOS 5.3
######

require 'rexml/document'
require 'net/http'
require 'uri'
require 'csv'

# get a list of all ABA data set ids
url = "http://api.brain-map.org/api/v2/data/query.xml?criteria=model::DataSet,rma::criteria,[delegate$eq't'][failed$eq%27f%27][id$ge1],products[abbreviation$eq%27DevMouse%27],probes%28orientation[name$eq%27Antisense%27]%29,specimen(donor(age[name$in'E11.5','E13.5','E15.5','E18.5','P4','P14','P28'])),rma::options[only$eq%27data_sets.id%27][order$eq%27data_sets.id$asc%27][start_row$eq0][num_rows$eq15000]" #14587
dslist = Array.new

begin
  xml_data = Net::HTTP.get_response(URI.parse(url)).body
  #puts("processingURL: #{url}") #DEBUG
rescue => e
  puts("error processing get data sets")
  #next
rescue Timeout::Error => e
  puts("timeout error processing get data sets")
  #next
end
doc = REXML::Document.new(xml_data)

doc.root.each_element('section-data-sets/section-data-set/id') { |datasetid|
  dslist << datasetid.text
}

i = 0
writer = CSV.open('devmouse_histogram_values.csv', 'w')
column_headers = ["data_set_id","gene_acronym","plane_of_section","days","embryonic","age","RSP","Tel","PHy","p3","p2","p1","M","PPH","PH","PMH","MH"]
writer << column_headers

dslist.each { |l|
  puts l   # Puts current data set id for tracking progress
  url = "http://api.brain-map.org/api/v2/data/query.xml?criteria=model::StructureUnionize,rma::criteria,section_data_set[failed$eq%27f%27][delegate$eq%27t%27][id$in" + l + "]%28products[abbreviation$eqDevMouse],specimen%28donor%28age[name$in%27E11.5%27,%27E13.5%27,%27E15.5%27,%27E18.5%27,%27P4%27,%27P14%27,%27P28%27]%29%29%29,structure%28structure_sets_structures%28structure_set[name$eq%27Developing%20Mouse%20-%20Coarse%27]%29%29,rma::include,section_data_set%28genes,specimen%28donor%28age%29%29%29,structure,rma::options[only$eq%27genes.acronym,structure_unionizes.expression_energy,data_sets.id,data_sets.plane_of_section_id,structures.acronym,structures.graph_order,specimens.id,donors.id,ages.name,ages.days,ages.embryonic%27][start_row$eq0][num_rows$eq2000]" if !l.nil?

  energies = Array.new
  structures = Array.new
  structure_orders = Array.new
  a = Array.new

      begin
        xml_data = Net::HTTP.get_response(URI.parse(url)).body
        #puts("processingURL: #{url}") #DEBUG
      rescue => e
        #puts("error processing data set #{line} at line number #{i}")
        next
      rescue Timeout::Error => e
        #puts("timeout error processing data set  #{line} at line number #{i}")
        next
      end
      doc = REXML::Document.new(xml_data)

next if REXML::XPath.first( doc.root, "structure-unionizes/structure-unionize/section-data-set/id" ).nil?  #Just in case
dsid = REXML::XPath.first( doc.root, "structure-unionizes/structure-unionize/section-data-set/id" ).text.to_s
next if REXML::XPath.first( doc.root, 'structure-unionizes/structure-unionize/section-data-set/genes/gene/acronym').nil? #Just in case
genesym = REXML::XPath.first( doc.root, 'structure-unionizes/structure-unionize/section-data-set/genes/gene/acronym').text
posid = REXML::XPath.first( doc.root, 'structure-unionizes/structure-unionize/section-data-set/plane-of-section-id').text.to_s
next if REXML::XPath.first( doc.root, 'structure-unionizes/structure-unionize/section-data-set/specimen/donor/age/days').nil? #Just in case
age_days = REXML::XPath.first( doc.root, 'structure-unionizes/structure-unionize/section-data-set/specimen/donor/age/days').text.to_s
age_embryonic = REXML::XPath.first( doc.root, 'structure-unionizes/structure-unionize/section-data-set/specimen/donor/age/embryonic').text.to_s
age_name = REXML::XPath.first( doc.root, 'structure-unionizes/structure-unionize/section-data-set/specimen/donor/age/name').text

h = Hash.new
      doc.root.each_element('structure-unionizes/structure-unionize/expression-energy') { |ee|
        expression_energy = ee.text
        energies << expression_energy
      }

      doc.root.each_element('structure-unionizes/structure-unionize/structure/acronym') { |str|
        structure = str.text
        structures << structure
      }

      doc.root.each_element('structure-unionizes/structure-unionize/structure/graph-order') { |sgo|
        structure_order = sgo.text
        structure_orders << structure_order
      }

ecount = 0
energies.each { |e|
   h[structure_orders[ecount].to_i] = energies[ecount]
  ecount = ecount + 1
}

a << dsid
a << genesym
a << posid
a << age_days
a << age_embryonic
a << age_name

hsort = h.sort # Make sure that all values are listed in increasing structure graph_order
hsort.each { |hs|
  a << hs[1]
}

writer << a
  a.clear
  energies.clear
  structures.clear
  structure_orders.clear

  i = i + 1
}
writer.close
