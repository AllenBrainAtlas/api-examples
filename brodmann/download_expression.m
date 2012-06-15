% Download expression data for a given set of probe_ids.
function [samples,explevels] = download_expression(probe_ids, donor_id)

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

% Convert the probe ids into a comma-separated string.
nprobes = numel(probe_ids);
if (nprobes > 1)
    probe_str = num2str(probe_ids','%d,');
    probe_str = probe_str(1:end-1);   
else
    probe_str = num2str(probe_ids','%d');
end

% Make the request and parse the results as JSON.
service = get_api_path();
request = '/query.json?criteria=service::human_microarray_expression';
probes = sprintf('[probes$in%s]',probe_str);
donors = sprintf('[donor$eq%d]',donor_id);
url = [service request probes donors];
disp(url);

str = urlread(url);
json = parse_json(str);

% Pull out the samples, probes, and expression levels from the results.
samples = json.msg.samples;
nsamples = numel(samples);
probes = json.msg.probes;
explevels = zeros(nsamples,nprobes);
for i=1:nprobes
    explevels(:,i) = cell2mat(probes{i}.expression_level);
end        
