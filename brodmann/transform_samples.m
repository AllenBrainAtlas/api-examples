% The samples structure is a bit awkward.  This extracts the mri
% coordinates and applies a specified transform T.
function coords = transform_samples(samples, T)

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

nsamples = numel(samples);
coords = zeros(3,nsamples);

for i=1:nsamples
    mri = [cell2mat(samples{i}.sample.mri) 1]';
    coord = T*mri;
    coords(:,i) = coord(1:3);
end
