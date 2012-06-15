% Download a specimen's meta information (including the MNI transform).
function specimen = download_specimen(specimen_name)

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

service = get_api_path();
requestFmt = '%s/Specimen/query.json?criteria=[name$eq''%s'']&include=alignment3d';
request = sprintf(requestFmt,service,specimen_name);
disp(request);

str = urlread(request);
json = parse_json(str);

specimen = json.msg{1};

% Modify the transform so that it's a proper matrix, rather than a struct
% array.  Notice that the first nine elements of the transform are the 3x3
% rotation matrix and the last three are the translation vector.
x = specimen.alignment3d;
specimen.alignment3d = [ x.tvr_00 x.tvr_01 x.tvr_02 x.tvr_09;
                         x.tvr_03 x.tvr_04 x.tvr_05 x.tvr_10;
                         x.tvr_06 x.tvr_07 x.tvr_08 x.tvr_11;
                         0        0        0        1];
