import { visualizations } from '../../../src/legacy/core_plugins/visualizations/public';

import { visFactory } from 'ui/vis/vis_factory';
import { Schemas } from 'ui/vis/editors/default/schemas';

import { CohortVisualizationProvider } from './cohort_visualization';

import './cohort.less';
import optionsTemplate from './options_template.html';

export default function CohortTypeProvider(Private) {
  return visFactory.createBaseVisualization({
    name: 'cohort',
    title: 'Cohort Analysis',
    icon: 'fa-user',
    description: 'Cohort analysis plugin',
    visualization: Private(CohortVisualizationProvider),
    visConfig: {
      defaults: {
        percentual: false,
        inverse: false,
        cumulative: false,
        table: false,
        mapColors: 'heatmap',
      },
    },
    hierarchicalData: true,
    responseHandler: 'none',
    editorConfig: {
      optionsTemplate: optionsTemplate,
      schemas: new Schemas([
        {
          group: 'metrics',
          name: 'metric',
          title: 'Total',
          max: 1,
          min: 1,
          aggFilter: ['count', 'sum', 'avg'],
          defaults: [
            { type: 'count', schema: 'metric' },
          ],
        }, {
          group: 'buckets',
          name: 'cohort_date',
          title: 'Cohort Date',
          min: 1,
          max: 1,
          aggFilter: ['date_histogram', 'terms'],
          defaults: [
            {
              type: 'date_histogram', schema: 'cohort_date', params: {
                interval: 'M',
                orderBy: '_term',
              },
            },
          ],
        }, {
          group: 'buckets',
          name: 'cohort_period',
          title: 'Cohort Period',
          min: 1,
          max: 1,
          aggFilter: 'histogram',
          defaults: [
            {
              type: 'histogram', schema: 'cohort_period', params: {
                interval: 1,
              },
            },
          ],
        },
      ]),
    },
  });
}

visualizations.types.registerVisualization(CohortTypeProvider);
