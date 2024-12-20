import { test, expect } from '@grafana/plugin-e2e';
import { ConfigEditorHelper, QueryEditorHelper, PanelHelper } from './utils';
import { DataSourceOptions } from '../src/types';

test.describe('RSS datasource', () => {
  test('Check grafana version', async ({ grafanaVersion }) => {
    console.log('Grafana version: ', grafanaVersion);
    expect(grafanaVersion).toEqual(grafanaVersion);
  });

  test.describe('Datasource config editor', () => {
    test('Should render config editor', async ({
      createDataSourceConfigPage,
      readProvisionedDataSource,
      page,
      selectors,
    }) => {
      const datasource = await readProvisionedDataSource({ fileName: 'datasource.yaml' });
      const configPage = await createDataSourceConfigPage({ type: datasource.type });
      const configEditor = new ConfigEditorHelper(page, configPage, selectors);

      await configEditor.checkPresenceURLEditor();
    });

    test('"Save & test" should be successful when configuration is valid', async ({
      createDataSourceConfigPage,
      readProvisionedDataSource,
      selectors,
      page,
    }) => {
      const datasource = await readProvisionedDataSource<DataSourceOptions>({
        fileName: 'datasource.yaml',
      });
      const configPage = await createDataSourceConfigPage({ type: datasource.type });
      const configEditor = new ConfigEditorHelper(page, configPage, selectors);

      await configEditor.checkPresenceURLEditor();

      /**
       * https://volkovlabs.io/blog/rss.xml
       */
      await configEditor.setPath(datasource.jsonData.feed);
      await configEditor.checkSaveSuccess();
    });

    test('"Save & test" should be failed if invalid path', async ({
      createDataSourceConfigPage,
      readProvisionedDataSource,
      selectors,
      page,
    }) => {
      const datasource = await readProvisionedDataSource<DataSourceOptions>({
        fileName: 'datasource.yaml',
      });
      const configPage = await createDataSourceConfigPage({ type: datasource.type });
      const configEditor = new ConfigEditorHelper(page, configPage, selectors);

      await configEditor.checkPresenceURLEditor();
      await configEditor.setPath('https:');
      await configEditor.checkSaveFail();
    });
  });

  test.describe('Query editor', () => {
    test('Should show query editor', async ({ page, panelEditPage, readProvisionedDataSource }) => {
      const ds = await readProvisionedDataSource({ fileName: 'datasource.yaml' });
      await panelEditPage.datasource.set(ds.name);
      await panelEditPage.setVisualization('Table');

      const queryEditor = new QueryEditorHelper(page, panelEditPage);
      await queryEditor.checkPresence();
      await queryEditor.checkRequestField();
    });

    test('Should return data', async ({ page, panelEditPage, readProvisionedDataSource }) => {
      const ds = await readProvisionedDataSource({ fileName: 'datasource.yaml' });

      await panelEditPage.datasource.set(ds.name);
      await panelEditPage.setVisualization('Table');

      const queryEditor = new QueryEditorHelper(page, panelEditPage);

      await queryEditor.checkPresence();
      await queryEditor.checkRequestField();
      await queryEditor.changeRequestType('Returns channel data only');
      await queryEditor.checkDateFieldPresence();
      await queryEditor.checkDateFilter('');

      /**
       * Check data fields
       */
      await expect(panelEditPage.panel.fieldNames).toContainText([
        'title',
        'description',
        'generator',
        'lastBuildDate',
        'link',
        'webMaster',
        'ttl',
        'imageUrl',
        'imageTitle',
        'imageLink',
      ]);

      /**
       * Check data values should be one row
       */
      await expect(panelEditPage.panel.data).toContainText([
        'Volkov Labs Blog',
        'Volkov Labs Blog',
        'https://github.com/jpmonette/feed',
      ]);
    });

    test('Should show parameters editor', async ({ page, selectors, panelEditPage, readProvisionedDataSource }) => {
      const ds = await readProvisionedDataSource({ fileName: 'datasource.yaml' });

      await panelEditPage.datasource.set(ds.name);
      await panelEditPage.setVisualization('Table');

      const queryEditor = new QueryEditorHelper(page, panelEditPage);

      await queryEditor.checkPresence();
      await queryEditor.checkRequestField();

      await queryEditor.checkDateFieldPresence();
      await queryEditor.checkDateFilter('');

      const parametersEditor = queryEditor.getParametersEditor();

      await parametersEditor.checkAddButtonPresence();
      await parametersEditor.addParameter();
      await parametersEditor.checkRowPresence();
    });
  });

  test.describe('Provisioning', () => {
    test('Should return data', async ({ gotoDashboardPage, readProvisionedDashboard, selectors }) => {
      /**
       * Go To Panels dashboard localServer.json
       * return dashboardPage
       */
      const dashboard = await readProvisionedDashboard({ fileName: 'localServer.json' });
      const dashboardPage = await gotoDashboardPage({ uid: dashboard.uid });

      const panel = new PanelHelper(dashboardPage, 'Table Google', selectors);
      await panel.checkIfNoErrors();
      await panel.checkFieldValues(['author', 'id', 'title', 'updated']);
      await panel.checkDataValues(['Google Workspace']);
    });
  });
});
