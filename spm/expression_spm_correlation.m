% Get a list of the top n probes that are differentially 
% expressed between contrast vs. target structures and correlate them
% with an spm activation map.
function [corrs,samples] = expression_spm_correlation(target_ids, contrast_ids, activation_file, mask_file, n, specimen)

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

[ids, fcs] = differential_search(target_ids, contrast_ids, n);

[samples, explevels] = download_expression(ids, specimen.donor_id);

corrs = correlate_to_spm(activation_file, mask_file, samples, explevels, specimen.alignment3d);

% Do a differential search (contrast vs target) and retrieve the top n 
% probes from the results.
function [ids,fold_changes] = differential_search(target_ids, contrast_ids, n)

% The `service::human_microarray differential` set indicates that the 
% differential search should take place on the human microarray data.  
service = get_api_path();
requestFmt = '%s/query.json?criteria=service::human_microarray_differential[sort_by$eq''fold-change''][structures1$in%s][structures2$in%s][num_rows$eq%d]';
ids = zeros(n,1);
fold_changes = zeros(n,1);

% Convert the structure ids into string lists.
target_str = num2str(target_ids,'%d,');
target_str = target_str(1:end-1);

contrast_str = num2str(contrast_ids,'%d,');
contrast_str = contrast_str(1:end-1);

% Make the request and parse the results as JSON.
request = sprintf(requestFmt, service, target_str, contrast_str, n);
disp(request);
str = urlread(request);
json = parse_json(str);

% Pull out the probe ids and fold_changes from the results.
for i=1:n
    ids(i) = json.msg{i}.id;
    fold_changes(i) = str2double(json.msg{i}.fold_change);
end


% Compute the correlation between expression levels and spm voxels.
function correlations = correlate_to_spm(activation_file, mask_file, samples, explevels, MNI)

% Load the activation and mask images.   
spmhd = spm_vol(activation_file);
spmimg = spm_read_vols(spmhd);

maskhd = spm_vol(mask_file);
maskimg = spm_read_vols(maskhd);

spmMNI = spmhd.mat;

% Concatenate the transform from MNI to SPM image onto original MNI
% transform. Now we can transform a T1 coordinate directly to an SPM voxel.
aibsToSPM = inv(spmMNI)*MNI;

coords = transform_samples(samples,aibsToSPM);
coords = int32(round(coords));

% Find samples inside the mask and inside the image.
for i=1:size(coords,2)
    coord = coords(:,i);
    if ((sum(coord>0) ~= 3) || maskimg(coord(1),coord(2),coord(3)) == 0)
        coords(:,i) = -1;
    end
end

% Filter the exp levels and coordinates to only include the valid ones.
valid = sum(coords>0)==3;
explevels = explevels(valid,:);
coords = coords(:,valid);
nsamples = size(coords,2);

% Compute the average spm value in a 3x3x3 neighborhood of each voxel.
kernel = ones(3,3,3)/27;
avgimg = convn(spmimg,kernel,'same');

% Sample the average spm at the human microarray sample locations.
spmlevels = zeros(1,nsamples);
for i=1:nsamples
    coord = coords(:,i);
    spmlevels(i) = avgimg(coord(1),coord(2),coord(3));
end

% Cross correlation between the expression and SPM vectors.
v = [spmlevels; explevels']';
covar = corrcoef(v);

% Return the first row, which is the correlation coefficients between the
% SPM image samples and each of the probe expression vectors.
correlations = covar(1,2:end);

