import { Locator } from '@playwright/test';
import { DashboardPage, E2ESelectorGroups, expect, Panel } from '@grafana/plugin-e2e';

/**
 * Panel Helper
 */
export class PanelHelper {
  private readonly locator: Locator;
  private readonly panel: Panel;
  private readonly selectors: E2ESelectorGroups;

  constructor(dashboardPage: DashboardPage, panelTitle: string, selectors: E2ESelectorGroups) {
    this.panel = dashboardPage.getPanelByTitle(panelTitle);
    this.locator = this.panel.locator;
    this.selectors = selectors;
  }

  public get() {
    return this.locator;
  }

  private getMsg(msg: string): string {
    return `Panel: ${msg}`;
  }

  public getContainer() {
    return this.get().getByTestId(this.selectors.components.Panels.Panel.content);
  }

  public async checkFieldValues(fieldsArray: string[]) {
    const fields = this.panel.fieldNames;
    return expect(fields).toContainText(fieldsArray);
  }

  public async checkDataValues(dataArray: string[]) {
    const data = this.panel.data;
    return expect(data).toContainText(dataArray);
  }

  public async checkIfNoErrors() {
    return expect(this.panel.getErrorIcon(), this.getMsg('Check If No Errors')).not.toBeVisible();
  }
}
