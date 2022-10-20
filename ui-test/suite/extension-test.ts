import { expect } from "chai";
import { WebDriver, ActivityBar, SideBarView, CustomTreeSection, ViewControl, ExtensionsViewSection } from "vscode-extension-tester";
import { viewHasItems } from "../common/conditions";
import { views } from "../common/constants";

export function tektonExtensionTest(): void {

    describe('Tekton Extension Test', () => {
      let driver: WebDriver;
      let view: ViewControl;
      let sideBar: SideBarView;
  
      before(async function() {
        this.timeout(4000);
  
        view = await new ActivityBar().getViewControl('Extensions');
        sideBar = await view.openView();
        await driver.wait(() => { return viewHasItems(); }, 200000);
      });
  
      it('Check Tekton Extensions is installed', async function () {
        this.timeout(10000);
        const section = (await sideBar.getContent().getSection('Installed')) as ExtensionsViewSection;
        const extensions = await section.getVisibleItems();
        expect(await Promise.all(extensions.map((item) => item.getTitle()))).to.include('Tekton Pipelines');
      });
    });
};