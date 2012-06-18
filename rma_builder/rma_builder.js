// Copyright 2012 Allen Institute for Brain Science
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

var _schema = {}
var _models = [];

function get_schema() {
  var schema_hash = {};

    var model_name = this;
    var url = $('.request.endpoint').val() + '/enumerate.json';

    $.get(url, function(data) {
        var descriptions = data.msg;
        $.each(descriptions,function() {
            for(model_name in this['DataDescription']) {
                schema_hash[model_name] = this['DataDescription'][model_name];
                _models.push(model_name);
            }
        });
        _models = _models.sort();
    }, 'json');

  return schema_hash;
}

function populate_dropdowns() {
    //  model dropdown template
    var model_name_select = $('.template .stage.model .model_name');

    $.each(_models,function() {
        var model_name = this.toString();
        model_name_select.append('<option value="' + model_name + '">' + model_name + '</option>');
    });

    var sphinx_model_parameter = $(model_name_select).clone().addClass('parameter').attr('name', 'k');
    $('.template .text_search_parameters .model_parameter').append(sphinx_model_parameter);

    // association (criteria/include) dropdown templates
    var association_template = $('.template>.associations');

    $.each(_models,function() {
        var blank_association_template = association_template.clone();
        var model_name = this.toString();
        $(blank_association_template).attr('id', model_name + '_associations_block');
        $(blank_association_template).find('.association')
            .append('<select id="' + model_name + '_associations"><option value="" selected="selected">[none]</option></select>');
        $('.template').append(blank_association_template);
        var include_dropdown_template = $('#' + model_name + '_associations');
        var socs = _schema[model_name]['associations'].sort(function(a,b) {
            if (a['name'] == b['name']) return 0;
            if (a['name'] > b['name']) return 1;
            else return -1;
        });
        $.each(socs, function() {
          include_dropdown_template.append('<option value="' + this['name'] + '">' + this['name'] + '</option>');
        });
    });

    // attribute (only/except/filter) dropdown templates
    $.each(_models,function() {
        var model_name = this.toString();
        $('.template').append('<select id="' + model_name + '_attributes"><option value="" selected="selected">[none]</option></select>');
        var only_dropdown_template = $('#' + model_name + '_attributes');
        $.each(get_model_attribute_names(model_name), function() {
          only_dropdown_template.append('<option value="' + this + '">' + this + '</option>');
        });
    });
}

function get_model_attribute_names(model_name) {
    var attribute_array = [];

    var tribs = _schema[model_name]['fields'];
    $.each(tribs, function() {
      attribute_array.push(this['name']);
    });

    return attribute_array.sort();
}

function get_associated_model(model_name, association_name) {
    var associations = _schema[model_name]['associations'];

    for (var i = 0; i < associations.length; i++) {
        if (associations[i]['name'] == association_name) {
            var associated_model = associations[i]['class'];
            break;
        }
    }

    return associated_model;
}

function get_association_dropdown(model_name) {
  var association_block = $('.template').find('#' + model_name + '_associations_block').clone();
  var filters_block = $(association_block).find('>.filters');
  var association_dropdown = $(association_block).find('select');
  var comma_button = $(association_block).find('input.comma');
  var paren_button = $(association_block).find('input.parentheses');
  var bracket_button = $(association_block).find('input.brackets');
  var delete_button = $(association_block).find('input.delete');
  var nested_association_block = $(association_block).find('.nested.associations');

  delete_button.click(function () { $(association_block).remove(); });

  association_dropdown.change(function() {
      var soc = $(association_dropdown).val();
      var associations = _schema[model_name]['associations'];

      // todo: does this even do anything?
      for (var i = 0; i < associations.length; i++) {
          if (associations[i]['name'] == soc) {
              var associated_model = associations[i]['class'];
              break;
          }
      }

      // sibling associations
      $(comma_button).off('click');
      $(comma_button).click(function() {
        $(association_block).after(get_association_dropdown(model_name));
      });

      // nested associations
      $(paren_button).off('click');
      $(paren_button).click(function() {
        $(nested_association_block).append(get_association_dropdown(associated_model));
      });

      // association filters
      $(bracket_button).off('click');
      $(bracket_button).click(function() {
          var filter_template = $('.template>.filter').clone();
          $(filter_template).find('>.delete').click(function() { filter_template.remove(); } );
          $(filter_template).find('>.variable').append(get_attribute_dropdown(associated_model));
          $(filters_block).append(filter_template);
      });
      update_only_except($(this).parents('.stage'));
  });

  return association_block;
}

function get_attribute_dropdown(model_name) {
  return $('.template').find('#' + model_name + '_attributes').clone();
}

function get_order_dropdown(model_name_array) {
    var order_dropdown = $('.template>.order').clone();
    var table_dropdown = $(order_dropdown).find('.model_qualifier');
    var attribute_dropdown = $(order_dropdown).find('select.attribute');
    var unique_attribute_hash = {};
    var unique_attribute_array = [];

    $.each(model_name_array, function() {
      var model_name = this.toString();
      var table_name = _schema[model_name]['table'];
      $(table_dropdown).append('<option value="' + table_name + '">' + table_name + '</option>');
      var attribute_array = get_model_attribute_names(model_name);
      $.each(attribute_array, function() { unique_attribute_hash[this] = true; } );
    });

    for (attribute in unique_attribute_hash) {
      unique_attribute_array.push(attribute);
    }

    var sorted_attribute_array = unique_attribute_array.sort();

    for (var i = 0; i < sorted_attribute_array.length; i++) {
      var attribute = sorted_attribute_array[i];
      $(attribute_dropdown).append('<option value="' + attribute + '">' + attribute + '</option>')
    }

    order_dropdown.find('.comma').click(function() {
        $(order_dropdown).after(get_order_dropdown(get_referenced_models($(order_dropdown).parents('.stage'))));
    });
    order_dropdown.find('.delete').click(function() { $(order_dropdown).remove(); });

    return order_dropdown;
}

function get_only_dropdown(model_name_array) {
    var only_dropdown = $('.template>.only').clone();
    var table_dropdown = $(only_dropdown).find('.model_qualifier');
    var attribute_dropdown = $(only_dropdown).find('select.attribute');
    var unique_attribute_hash = {};
    var unique_attribute_array = [];

    $.each(model_name_array, function() {
      var model_name = this.toString();
      var table_name = _schema[model_name]['table'];
      $(table_dropdown).append('<option value="' + table_name + '">' + table_name + '</option>');
      var attribute_array = get_model_attribute_names(model_name);
      $.each(attribute_array, function() { unique_attribute_hash[this] = true; } );
    });

    for (attribute in unique_attribute_hash) {
      unique_attribute_array.push(attribute);
    }

    var sorted_attribute_array = unique_attribute_array.sort();

    for (var i = 0; i < sorted_attribute_array.length; i++) {
      var attribute = sorted_attribute_array[i];
      $(attribute_dropdown).append('<option value="' + attribute + '">' + attribute + '</option>')
    }

    only_dropdown.find('.comma').click(function() {
        $(only_dropdown).after(get_only_dropdown(get_referenced_models($(only_dropdown).parents('.stage'))));
    });
    only_dropdown.find('.delete').click(function() { $(only_dropdown).remove(); });

    return only_dropdown;
}

function update_only_except(stage) {
    var only_divs = $(stage.find('.group>.only'));
    var except_divs = $(stage.find('.group>.except'));
    var order_divs = $(stage.find('.group>.order'));
    var models = get_referenced_models(stage);
    $(only_divs).each(function() {
        $(this).empty().append(get_only_dropdown(models));
    });
    $(except_divs).each(function() {
        $(this).empty().append(get_only_dropdown(models));
    });
    $(order_divs).each(function() {
        $(this).empty().append(get_order_dropdown(models));
    });
}

function add_model_stage() {
    var stage = $('.template .stage.model').clone();
    $(stage).find('input.delete').click(function() {
      stage.remove();
    });
    var default_model_name = $(stage).find('.model_name').val();

    var selection_div = $(stage).find('.selection');
    var bracket_button = $(selection_div).find('.model.brackets');
    var model_filters_block = $(selection_div).find('.filters');
    var criteria_div = $(stage).find('.criteria');
    var includes_div = $(stage).find('.includes');
    var only_div = $(stage).find('.only');
    var except_div = $(stage).find('.except');
    var order_div = $(stage).find('.order');
    var model_select = $(stage).find('.model_name');

    $(model_select).change(function() {
      var model_name = $(this).val();

      criteria_div.empty().append(get_association_dropdown(model_name));
      includes_div.empty().append(get_association_dropdown(model_name));
      update_only_except(stage);
    });

    $(bracket_button).click(function() {
        var filter_template = $('.template>.filter').clone();
        $(filter_template).find('>.delete').click(function() { filter_template.remove(); } );
        $(filter_template).find('>.variable').append(get_attribute_dropdown($(model_select).val()));
        $(model_filters_block).append(filter_template);
    });

    criteria_div.append(get_association_dropdown(default_model_name));
    includes_div.append(get_association_dropdown(default_model_name));
    only_div.append(get_only_dropdown([default_model_name]));
    except_div.append(get_only_dropdown([default_model_name]));
    order_div.append(get_order_dropdown([default_model_name]));

    stage.appendTo('.workspace');
}

function regenerate_query() {
    return regenerate_query(null);
}

function regenerate_query(format) {
    var endpoint = $('.request.endpoint').val();

    if (format == null) {
      format = $('.request.format').val();
    }

    var query = [];
    query.push(endpoint + '/query.' + format + '?criteria=');

    var stages = $('.workspace .stage');
    var stage_index = 0;
    var stage_count = stages.length;

    stages.each(function() {
        if ($(this).hasClass('model')) {
            generate_model_stage(query, this);
        }
        else if ($(this).hasClass('service')) {
            generate_service_stage(query, this);
        }
        else if ($(this).hasClass('pipe')) {
            var pipe_name = $(this).find('.pipe_name').val();
            query.push('pipe::' + pipe_name);
            var pipe_variable = $(this).find('.pipe.variable').val();
            var pipe_path = $(this).find('.pipe.path').val();
            query.push('[' + pipe_variable +  '$eq\'' + pipe_path + '\']');
        }

        stage_index++;

        if (stage_index < stage_count) {
            query.push(',');
        }
    });

  return query
}

function regenerate() {
  var query = regenerate_query();

  var query_text = query.join('<br />');
  var query_url = query.join('').replace(/(,)+/,',').replace(/,$/,'');

  var query_link = 'Execute Query and Display Result Data in new window:<a target="_rma" href="' + query_url + '">Link</a>'


  $('.generated').empty()
    //  .append(query.join(''))
      .append('<p>' + query_text + '</p>')
      .append(query_link);
}

function make_table(result_html_array, model_name, result_item_array) {
    result_html_array.push("<table>");

    for (var i = 0; i < result_item_array.length; i++) {
      var result_item = result_item_array[i];

      result_html_array.push("<tr><td>");
      for (var attribute in result_item) {
          result_html_array.push("<table>")
          result_html_array.push("<tr><td>" + attribute + ": ");
          if (typeof result_item[attribute] == "object") {
              if (result_item[attribute] != null) {
              make_table(result_html_array, model_name, result_item[attribute]);
              }
          } else {
              result_html_array.push(result_item[attribute]);
          }
          result_html_array.push("</td></tr>")
          result_html_array.push("</table>")
      }
      result_html_array.push("</td></tr>");
    }

    result_html_array.push("</table>");
}

function reload() {
  regenerate();

  var query = regenerate_query('json');
  var url = query.join('');

  $.get(url, function(data) {
     var results = data.msg;

      // TODO: this needs to be more robust for aggregated queries
      var last_model = $($('.workspace .stage').last()).find('.model_name').val();

      var result_html_array = [];
      make_table(result_html_array, last_model, results);

          $('.results').empty()
          .append(result_html_array.join(''));
//          .append('<p>' + query_text + '</p>')
//          .append(query_link);
  }, 'json');


}

function get_referenced_models(element) {
    var model_hash = {};
    var model_array = [];

    model_hash[$(element).find('.model_name').val()] = true;

    var associations = $(element).find('.association>select');

    $(associations).each(function() {
      var model_name = $(this).attr('id').split('_')[0];
      model_hash[model_name] = true;

      var association_name = $(this).val();

      if (association_name != "") {
          var associated_model_name = get_associated_model(model_name, association_name);
          if (associated_model_name != "undefined") { // todo: shouldn't need this
            model_hash[associated_model_name] = true;
          }
      }
    });

    for (m in model_hash) {
        model_array.push(m);
    }

    return model_array;
}

function generate_filters(query_array, filter_element_array) {
    if (filter_element_array.length > 0) {
        for (var filter_index = 0; filter_index < filter_element_array.length; filter_index++) {
            var variable_select = $(filter_element_array[filter_index]).find('.variable>select');
            var operator_select = $(filter_element_array[filter_index]).find('select.operator');
            var argument = $(filter_element_array[filter_index]).find('.argument');
            query_array.push('[' + $(variable_select).val() + $(operator_select).val() + $(argument).val() + ']');
        }
    }
}

function generate_associations(query_array, element, top_level) {
  var child_associations = $(element).find('>.associations');

  if (child_associations.length > 0) {
    if (top_level == false) {
      query_array.push('(');
    }
    for (var i = 0; i < child_associations.length; i++) {
      var association_select = $(child_associations[i]).find('>.association>select');
      var association_name = $(association_select).val();

      if (association_name != "") {
          query_array.push(association_name);

          var filters = $(child_associations[i]).find('>.filters>.filter');
          generate_filters(query_array, filters);
      }

      var nested_associations = $(child_associations[i]).find('>.associations');
      generate_associations(query_array,nested_associations,false);
      if (i < child_associations.length - 1) {
          query_array.push(',');
      }
    }
    if (top_level == false) {
      query_array.push(')');
    }
  }
}

function generate_service_stage(query, service_stage_div) {
    var service_name = $($(service_stage_div).find('.service_name option:selected')).attr('class');
    query.push('service::' + service_name);

    var parameters = $(service_stage_div).find('.parameter');
    parameters.each(function() {
      if ($(this).val() != '') {
        query.push('[' + $(this).attr('name') + '$eq' + $(this).val() + ']');
      }
    });
}

function generate_model_stage(query, model_stage_div) {
    // root model for the stage
    var model_name = $(model_stage_div).find('.model_name').val();
    query.push('model::' + model_name);

    // criteria
    var criteria_array = [];
    var model_top_level_filters = $(model_stage_div).find('.selection .model.filters>.model.filter');
    generate_filters(criteria_array,model_top_level_filters);

    if (criteria_array.length > 0) {
        criteria_array.push(',');
    }

    var criteria_dom = $(model_stage_div).find('.criteria');
    generate_associations(criteria_array,criteria_dom,true);

    if (criteria_array.length > 0) {
      if (!query[query.length - 1].match(/,$/)) { query.push(','); }
      query.push('rma::criteria,');
      query.push(criteria_array.join(''));
    }

    // includes
    var include_array = [];
    var include_dom = $(model_stage_div).find('.includes');
    generate_associations(include_array,include_dom,true);

    if (include_array.length > 0) {
      if (!query[query.length - 1].match(/,$/)) { query.push(','); }
      query.push('rma::include,');
      query.push(include_array.join(''));
    }

    // options only/except/order/num_rows/start_row
    var only_array = [];
    var except_array = [];
    var order_array = [];

    $(model_stage_div).find('.group>.only>.only').each(function() {
      var only_model = $(this).find('select.model_qualifier').val();
      var only_attribute = $(this).find('select.attribute').val();
      if (only_model != '' && only_attribute != '') {
          only_array.push(only_model + '.' + only_attribute);
      } else if (only_attribute != '') {
          only_array.push(only_attribute);
      }
    });

    $(model_stage_div).find('.group>.except>.except').each(function() {
      var except_model = $(this).find('select.model_qualifier').val();
      var except_attribute = $(this).find('select.attribute').val();
      if (except_model != '' && except_attribute != '') {
          except_array.push(except_model + '.' + except_attribute);
      } else if (except_attribute != '') {
          except_array.push(except_attribute);
      }
    });

    $(model_stage_div).find('.group>.order>.order').each(function() {
      var order_model = $(this).find('select.model_qualifier').val();
      var order_attribute = $(this).find('select.attribute').val();
      var order_direction = $(this).find('select.direction').val();
      if (order_model != '' && order_attribute != '') {
          if (order_direction == '') {
            order_array.push(order_model + '.' + order_attribute);
          } else {
            order_array.push(order_model + '.' + order_attribute + '$' + order_direction);
          }
      } else if (order_attribute != '') {
          if (order_direction == '') {
            order_array.push(order_attribute);
          } else {
            order_array.push(order_attribute + '$' + order_direction);
          }
      }
    });

    var num_rows = $(model_stage_div).find('.num_rows').val();
    var start_row = $(model_stage_div).find('.start_row').val();

    if (only_array.length > 0 || except_array.length > 0 || order_array.length > 0 || num_rows != "" || start_row != "") {
        query.push(',rma::options');

        if (only_array.length > 0) {
            query.push("[only$eq'" + only_array.join(',') + "']");
        }

        if (except_array.length > 0) {
            query.push("[except$eq'" + except_array.join(',') + "']");
        }

        if (order_array.length > 0) {
            query.push("[order$eq'" + order_array.join(',') + "']");
        }

        if (start_row != "") {
            query.push("[start_row$eq" + start_row + "]");
        }

        if (num_rows != "") {
            query.push("[num_rows$eq" + num_rows + "]");
        }
    }
}

function add_service_stage() {
    var stage = $('.template .stage.service').clone();
    $(stage).find('input.delete').click(function() {
      $(this).parents('.stage').remove();
    });

    var service_select = $(stage).find('.service_name')
    var params_block = $(stage).find('.parameters')

    $(service_select).change(function() {
        var params_template = $('.template .' + $(this).val() + '_parameters' ).clone();
        $(params_block).empty().append(params_template);
    });

    $(params_block).append($('.template .' + $(service_select).val() + '_parameters').clone());
    stage.appendTo('.workspace');
}

$(document).ready(function() {
    $.ajaxSetup({async:false});

    _schema = get_schema();
    populate_dropdowns();

    $("input#model").click(function() { add_model_stage(); });
    $("input#service").click(function() { add_service_stage(); });
    $("input#pipe").click(function() {
        var stage = $('.template .stage.pipe').clone();
        $(stage).find('input.delete').click(function() {
          $(this).parents('.stage').remove();
        });
        stage.appendTo('.workspace');
    });

    $("input#regenerate").click(function() { regenerate(); });
    $("input#reload").click(function() { reload(); });

    $("select.endpoint").change(function() {
      _models = [];
      _schema = get_schema();
      $('.workspace').empty();
    });
});
