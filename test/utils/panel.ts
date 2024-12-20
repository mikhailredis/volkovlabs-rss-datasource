import * as semver from 'semver';
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

  public async checkContent(text: string, grafanaVersion: string) {
    if (semver.gte(grafanaVersion, '11.3.0')) {
      return expect(this.getContainer(), this.getMsg('Check Content')).toContainText(text);
    }
    return expect(this.get().getByTestId('data-testid text content'), this.getMsg('Check Content')).toContainText(text);
  }

  public async checkIfNoErrors() {
    return expect(this.panel.getErrorIcon(), this.getMsg('Check If No Errors')).not.toBeVisible();
  }
}
