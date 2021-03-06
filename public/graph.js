import { TemplateVisTypeProvider } from 'ui/template_vis_type/template_vis_type';
import { VisTypesRegistryProvider } from 'ui/registry/vis_types';
import { VisSchemasProvider } from 'ui/vis/schemas';

import "plugins/graph/graph.less";
import 'plugins/graph/graph_controller';
import graphVisTemplate from 'plugins/graph/graph.html';
import graphVisParamsTemplate from 'plugins/graph/graph_params.html';
//import graphVisParamsTemplate from 'plugins/graph/series.html';


VisTypesRegistryProvider.register(ForceGraphProvider);

function ForceGraphProvider(Private) {
    const TemplateVisType = Private(TemplateVisTypeProvider);
    const Schemas = Private(VisSchemasProvider);

    return new TemplateVisType({
        name: 'graph',
        title: 'Force graph',
        description: 'D3 force layout for Kibana',
        icon: 'fa-share-alt',
        template: graphVisTemplate,
        params: {
             defaults: {
                label: 'Fontsize',
                fontSize: 14,
                alphaTarget: 0.3,
                distanceMax: 300,
                strength: -200,
                radius: 6,
                metrics: [{ "id": "", "title": "", "field": "", "type": "" }],
                buckets: [{ "id": "", "title": "", "field": "", "schema": "", "type": "" }],
                aggs: [{ "id": "", "title": "", "field": "", "schema": "", "type": "" }],
                metrics_controller: [{ "id": -1, "title": "Fixed", "field": "", "type": "" }],
                aggs_controller: [{ "id": -1, "title": "Fixed", "field": "", "schema": "", "type": "" }],
                aggs_controller_decoration: [{ "id": -1, "title": "None", "field": "", "schema": "", "type": "" }],
                lowNodeSize: [8],
                highNodeSize: [8],
                lowLinkSize: [8],
                highLinkSize: [8],
                nodeSize: [{ "id": -1, "title": "Fixed", "field": "", "schema": "", "type": "" }],
                linkSize: [{ "id": -1, "title": "Fixed", "field": "", "schema": "", "type": "" }],
                imageNode: [{ "id": -1, "title": "None", "field": "", "schema": "", "type": "" }],
                colourNode: [{ "id": -1, "title": "None", "field": "", "schema": "", "type": "" }],
                visibleNode: [true],
                maxMetric: [],
                minMetric: []
            },
            editor: graphVisParamsTemplate
        },
        schemas: new Schemas([
            {
                group: 'metrics',
                name: 'metric',
                title: 'Metric',
                icon: 'fa fa-tachometer',
                min: 1,
                max: 4,
                defaults: [{
                    type: 'count',
                    schema: 'metric'
                }]
            },
            {
                group: 'buckets',
                name: 'bucket',
                title: 'Field',
                icon: 'fa fa-circle-thin',
                mustBeFirst: 'true',
                aggFilter: ['terms']
                min: 1,
                max: 2
            },
            {
                group: 'buckets',
                name: 'relation',
                icon: 'fa fa-random',
                title: 'Relation',
                max: 1,
                aggFilter: ['terms']
            },
            {
                group: 'buckets',
                name: 'colornode',
                icon: 'fa fa-paint-brush',
                title: 'Node Color',
                max: 1,
                aggFilter: ['terms']
            }
        ]),
        requiresSearch: true
    });
}

// export the provider so that the visType can be required with Private()
export default ForceGraphProvider;
