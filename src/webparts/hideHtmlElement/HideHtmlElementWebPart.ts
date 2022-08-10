import { DisplayMode, Version } from '@microsoft/sp-core-library';
import { PropertyPaneTextField } from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { IPropertyPaneConfiguration } from '@microsoft/sp-property-pane';

import styles from './HideHtmlElementWebPart.module.scss';

export interface IHideHtmlElementWebPartProps {
  ElementId: string;
}

export default class HideHtmlElementWebPart extends BaseClientSideWebPart<IHideHtmlElementWebPartProps> {
  protected get disableReactivePropertyChanges(): boolean {
    return true;
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return{
      pages: [
        {
          header: {
            description: "Hide Page Element Configuration"
          },
          groups: [
            {
              groupFields: [
                PropertyPaneTextField('ElementId', {
                  label: "Enter the Html Element Id",
                  multiline: false
                })
              ]
            }
          ]
        }
      ]
    }
  }

  public render(): void {
    this.domElement.innerHTML = "";
    if(this.displayMode === DisplayMode.Read) {
      if(this.properties.ElementId !== undefined) {
        document.getElementById(this.properties.ElementId).style.display = "none";
      }
    }
    else{
      this.domElement.innerHTML = `<div class="${styles.hideHtmlElement}">Hide Html Element V${this.manifest.version}</div>`;
    }
  }



  protected onInit(): Promise<void> {
    return super.onInit();
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }
}
