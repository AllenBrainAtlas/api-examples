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

% This script first does a differential search to identify the top and
% bottom probes ranked by their differential expression between contrast
% and target brain regions.  Expression values for these probes are then
% correlated to the values sampled from an activity map computed by the
% [Statistical Parametric Mapping](http://www.fil.ion.ucl.ac.uk/spm/)
% library at human brain microarray sample locations (after mapping the 
% coordinates to MNI).  The data set used in this demonstration code
% were computed by following the SPM manual's walkthrough of the [visual
% attention](http://www.fil.ion.ucl.ac.uk/spm/data/attention/) example data
% set.

% The selected SPM activity map shows strong activation in the visual
% cortex, so the differential search is between structures in the visual
% cortex (cuneus and lingual gyrus) and the rest of the brain.
target_ids = [4005];
contrast_ids = [4184,4191];
activation_file =  '../attention/GLM/spmT_0002.hdr';
mask_file = '../attention/GLM/mask.hdr';
n = 25;
specimen_name = 'H0351.2001';

%% Do the computation.
specimen = download_specimen(specimen_name);
[top_corrs,samples] = expression_spm_correlation(target_ids,contrast_ids,activation_file,mask_file,n,specimen);
bottom_corrs = expression_spm_correlation(contrast_ids,target_ids,activation_file,mask_file,n,specimen);

%% Plot the results.
% This is some data shuffling to get the legend to display properly.  I'm
% displaying the first n correlations (which come from the contrast vs
% target set of probes) in red, then the second n correlations (target vs
% contrast) in blue.  I pad with zeros so that they display side-by-side.
figure;
hold on;
bar([top_corrs zeros(1,n)],'FaceColor','red');
bar([zeros(1,n) bottom_corrs],'FaceColor','blue');
xlabel('probe');
ylabel('correlation to SPM activation');
legend('high fold change','low fold change');
axis([0 2*n -.2 .2]);
