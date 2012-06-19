#!/usr/bin/env ruby
# A ruby cgi web page that allows a user to download all the manual annotation data for a given gene and developmental mouse timepoint.
# Usage: Copy this file into a directory that can server ruby cgi pages and make it executable
# Web page user enters the gene symbol for one of the ~2000 genes available in the Allen Institute Developing Mouse Brain Atlas
# and selects one of the three timepoints: E11.5, E13.5 or E15.5
# Click on 'Submit' to build the API query; click on 'Download' link to download the data in csv format
# TODO check to see if results are available for the selected combination of Gene Symbol and age timepoint
require 'cgi'
server = "api.brain-map.org"
cgi = CGI.new("html4")  # add HTML generation methods
cgi.out{
  cgi.html{
    cgi.head{ "\n"+cgi.title{"Developing Mouse Manual Annotation query by Gene Symbol"} } +
    cgi.body{ "\n"+
      cgi.form{"\n"+ "Allen Institute for Brain Science\n" + cgi.br +
	"Developing Mouse Brain Atlas\n" + cgi.br +
	"Manual Annotation Data Retrieval by Gene" +
        cgi.hr +
        cgi.h4 { "Enter Gene Symbol: " } + 
        cgi.text_field("gene", "C1ql2", size=30) +"\n"+
        cgi.br +
        cgi.h4 { "Select Age: " } + 
        cgi.popup_menu("age", ["E11.5", true], "E13.5", "E15.5") +"\n"+
        cgi.br +
        cgi.submit +
        cgi.h4 { "gene is: #{cgi['gene']}" } +
	cgi.h4 { "age is: #{cgi['age']}" } +
        cgi.br + cgi.a("HREF" => "http://#{server}/api/v2/data/ManualAnnotation/query.csv?criteria=section_data_set%28genes,specimen%28donor%28age%29%29%29,structure[genes.acronym$eq%27#{cgi['gene']}%27][ages.name$eq%27#{cgi['age']}%27]&tabular=ages.name%20as%20age,genes.acronym%20as%20gene,structures.acronym%20as%20structure,structures.graph_order%20as%20structure_order,intensity_call%20as%20intensity,density_call%20as%20density,pattern_call%20as%20pattern&num_rows=2000&order=structures.graph_order") { "Click to download results" } + cgi.br +
	cgi.br +
	cgi.hr +
	"Copyright 2012 Wayne Wakeman" + cgi.br +
	cgi.br +
   "Licensed under the Apache License, Version 2.0 (the \"License\");" + cgi.br +
   "you may not use this file except in compliance with the License." + cgi.br +
   "You may obtain a copy of the License at" + cgi.br +
	cgi.br +
   "    http://www.apache.org/licenses/LICENSE-2.0" + cgi.br +
	cgi.br +
   "Unless required by applicable law or agreed to in writing, software" + cgi.br +
   "distributed under the License is distributed on an \"AS IS\" BASIS," + cgi.br +
   "WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied." + cgi.br +
   "See the License for the specific language governing permissions and" + cgi.br +
   "limitations under the License."
      }
    }
  }
}
