import { Locator, Page } from '@playwright/test';
import { E2ESelectorGroups, expect, PanelEditPage, VariableEditPage } from '@grafana/plugin-e2e';
import { getLocatorSelectors, LocatorSelectors } from './selectors';
import { TEST_IDS } from '../../src/constants/tests';

/**
 * Selectors
 */
const getParametersSelector = getLocatorSelectors(TEST_IDS.parametersEditor);

/**
 * Parameters Editor Helper
 */
export class ParametersEditorHelper {
  private readonly selectors: LocatorSelectors<typeof TEST_IDS.parametersEditor>;

  constructor(public readonly locator: Locator) {
    this.selectors = this.getSelectors(locator);
  }

  private getMsg(msg: string): string {
    return `Values Editor: ${msg}`;
  }

  private getSelectors(locator: Locator) {
    return getParametersSelector(locator);
  }

  public get() {
    return this.selectors;
  }

  public async checkAddButtonPresence() {
    return expect(this.get().buttonAdd(), this.getMsg('Check Add button presence')).toBeVisible();
  }

  public async addParameter() {
    await this.get().buttonAdd().click();
  }

  public async checkRowPresence() {
    return expect(this.get().row(), this.getMsg('Check Add button presence')).toBeVisible();
  }
}

/**
 * Query Editor Helper
 */
export class QueryEditorHelper {
  private readonly locator: Locator;
  private readonly grafanaPage: PanelEditPage;
  private readonly selectors: LocatorSelectors<typeof TEST_IDS.queryEditor>;

  constructor(page: Page, grafanaPage: PanelEditPage) {
    this.locator = page.locator('body');
    this.grafanaPage = grafanaPage;

    this.selectors = getLocatorSelectors(TEST_IDS.queryEditor)(this.locator);
  }

  private getMsg(msg: string): string {
    return `Query Editor: ${msg}`;
  }

  public get() {
    return this.locator;
  }

  public getSelectors() {
    return this.selectors;
  }

  public async checkRequestField() {
    return expect(this.selectors.fieldFeedType(), this.getMsg('Check presence')).toBeVisible();
  }

  public async checkPresence() {
    return expect(this.selectors.root(), this.getMsg('Check presence')).toBeVisible();
  }

  public async changeRequestType(key: string) {
    await this.selectors.root().getByRole('combobox').click();
    await this.grafanaPage
      .getByGrafanaSelector(this.grafanaPage.ctx.selectors.components.Select.option)
      .getByText(key)
      .click();
  }

  public async checkDateFieldPresence() {
    return expect(this.selectors.fieldDate(), this.getMsg('Check presence')).toBeVisible();
  }

  public async checkDateFilter(key: string) {
    return expect(this.selectors.fieldDate(), this.getMsg('Check presence')).toHaveValue(key);
  }

  public getParametersEditor() {
    return new ParametersEditorHelper(this.get());
  }
}
