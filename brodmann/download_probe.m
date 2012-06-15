% download the meta information for a probe, given a probe name
function probe = download_probe(probe_name)

requestFmt = '%s/Probe/query.json?criteria=[name$eq''%s'']&include=gene';
url = sprintf(requestFmt, get_api_path(), probe_name);
disp(url);

str = urlread(url);
json = parse_json(str);
probe = json.msg{1};


