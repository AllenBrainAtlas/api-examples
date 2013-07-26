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
# aba_histogram_values.rb
#
# This Ruby script will download all ISH gene expression values for 12 major
# adult mouse brain structures for all non-failed Allen Adult Mouse Brain Atlas experiments
# It will write them to a comma-delimited text file
#
# Use case is to download the data behind the histogram on pages such as
# http://mouse.brain-map.org/experiment/show/3
#
# The reported value is "expression energy".  The value is not log-transformed
# More information about the derivation of expression energy is available in the
# "EXPRESSION GRIDDING MODULE" section of the Informatics Data Processing document at
# http://help.brain-map.org/download/attachments/2818169/InformaticsDataProcessing.pdf
#
# Tested on
# Ruby 1.8.7 running on Mac OSX 10.6.8
# Ruby 1.9.3 running on CentOS 5.3
######

require 'rexml/document'
require 'net/http'
require 'uri'
require 'csv'

# get a list of all ABA data set ids
url = "http://api.brain-map.org/api/v2/data/query.xml?criteria=model::DataSet,rma::criteria,[failed$eq%27f%27][id$ge1],products[abbreviation$eq%27Mouse%27],probes%28orientation[name$eq%27Antisense%27]%29,rma::options[only$eq%27data_sets.id%27][order$eq%27data_sets.id$asc%27][start_row$eq0][num_rows$eq26000]" #25897
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
writer = CSV.open('aba_histogram_values.csv', 'w')
column_headers = ["data_set_id","gene_acronym","plane_of_section","Isocortex","OLF","HPF","CTXsp","STR","PAL","TH","HY","MB","P","MY","CB"]
writer << column_headers

dslist.each { |l|
  puts l   # Puts current data set id for tracking progress
  url = "http://api.brain-map.org/api/v2/data/query.xml?criteria=model::StructureUnionize,rma::criteria,section_data_set[failed$eq%27f%27][id$in" + l + "]%28products[abbreviation$eqMouse]%29,structure%28structure_sets_structures%28structure_set[name$eq%27Mouse%20-%20Coarse%27]%29%29,rma::include,section_data_set%28genes%29,structure,rma::options[only$eq%27genes.acronym,structure_unionizes.expression_energy,data_sets.id,data_sets.plane_of_section_id,structures.acronym,structures.graph_order%27][order$eq%27genes.acronym$asc,data_sets.id$asc%27][start_row$eq0][num_rows$eq2000]" if !l.nil?
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
