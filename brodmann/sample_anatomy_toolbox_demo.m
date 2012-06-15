% Copyright 2012 Allen Institute for Brain Science
% Licensed under the Apache License, Version 2.0 (the "License");
% you may not use this file except in compliance with the License.
% You may obtain a copy of the License at
%
% http://www.apache.org/licenses/LICENSE-2.0
%
% Unless required by applicable law or agreed to in writing, software
% distributed under the License is distributed on an "AS IS" BASIS,
% WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
% See the License for the specific language governing permissions and
% limitations under the License.

% The [SPM Anatomy
% Toolbox](http://www.fz-juelich.de/inm/inm-1/DE/Forschung/_docs/SPMAnatomyToolbox/SPMAnatomyToolbox_node.html)
% has probabilistic maps of Brodmann areas.  This code extracts the sample
% expression values for a single probe and then exports the sample
% locations in a format that can be read into the toolbox.  This is a PDYN
% probe, which you can see by inspecting the `probe` variable below.
specimen_name = 'H0351.2001';
probe_name = 'A_23_P40262';

% Download the specimen and probe expression values.
probe = download_probe(probe_name);
specimen = download_specimen(specimen_name); 
[samples, explevels] = download_expression(probe.id, specimen.donor_id);

% Use the batch cytoarchitectonic probabilities
% tool to read in the `human_ma_samples_MNI.txt` file generated below.
% Note: the transform from microarray sample locations to MNI space was
% computed using simple affine registration.  As a result, anatomical
% labels of fine structures produced by the Anatomy Toolbox may not be
% completely accurate.  More advanced registration of human brain specimen
% to MNI coordinates is recommended for accurate analysis.  
disp('Exporting sample coordinates to human_ma_samples_MNI.txt');
coords = transform_samples(samples,specimen.alignment3d)';
save human_ma_samples_MNI.txt coords -ascii
