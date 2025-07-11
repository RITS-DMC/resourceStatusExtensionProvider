sap.ui.define([
    "sap/dm/dme/podfoundation/extension/PluginControllerExtension",
    "sap/ui/core/mvc/OverrideExecution",
    "sap/dm/dme/plugins/resourceStatus/controller/extensions/PluginEventExtensionConstants",
    "sap/m/MessageToast"
], function (PluginControllerExtension, OverrideExecution, PluginEventConstants, MessageToast) {
    "use strict";

    const oOverrideExecution = {
        onFetchResourceStatusTableData: OverrideExecution.After,
        onOpenStatusChangeDialog: OverrideExecution.Before,
        onSaveResourceStatus: OverrideExecution.After
    };

    return PluginControllerExtension.extend("rits.custom.plugin.sampleplugin.resourceStatusExtensionProvider.PluginEventExtension", {
        constructor: function(oExtensionUtilities) {
            this._oExtensionUtilities = oExtensionUtilities;
        },

        getOverrideExecution: function(sOverrideMember) {
            if (oOverrideExecution.hasOwnProperty(sOverrideMember)) {
                return oOverrideExecution[sOverrideMember];
            }
            return null;
        },

        getExtensionName: function() {
            return PluginEventConstants.EXTENSION_NAME;
        },

        onFetchResourceStatusTableData: function(sUrl, oQueryParams, oPromise) {
            MessageToast.show("View loaded successfully");
            console.log("onFetchResourceStatusTableData");
            this._oExtensionUtilities.logMessage("PluginEventExtension.onFetchResourceStatusTableData: called");

            // oPromise is only provided when this function is called after the core function (OverrideExecution.After), otherwise it is null
            oPromise.finally(() => {
                this._oExtensionUtilities.logMessage("PluginEventExtension.onFetchResourceStatusTableData: finished");
            });
        },

        onOpenStatusChangeDialog: function(oDialog) {
            MessageToast.show("Resource changed loaded successfully");
            console.log("onOpenStatusChangeDialog");
            this._oExtensionUtilities.logMessage("PluginEventExtension.onOpenStatusChangeDialog: called");
        },

        onSaveResourceStatus: function(sUrl, oRequestBody, oPromise) {
            var sResource = oRequestBody.resource;
            var sStatus = oRequestBody.status;
            var sUrl = this.getController().getPublicApiRestDataSourceUri() + '/pe/api/v1/process/processDefinitions/start?key=REG_e9477448-bc91-4fa6-80e0-d7a3f4a1e0d8&async=false';
            var oPayload = {
                MessageToBeSent: "Resource "+sResource+ " Status Changed to " +sStatus
              };
              return new Promise((resolve, reject) => {
                this.getController().ajaxPostRequest(sUrl, oPayload, resolve, reject);
              }).then(function(oResponse) {
                if(oResponse.Out_message=="1"){
                    MessageToast.show("Notification Shared in Teams Successfully");
              }
                  else{
                       MessageToast.show("During Notification API Error Occurred");
                      return;
                  }
              }.bind(this));
              
            this._oExtensionUtilities.logMessage("PluginEventExtension.onSaveResourceStatus: called");

            // oPromise is only provided when this function is called after the core function (OverrideExecution.After), otherwise it is null
            oPromise.finally(() => {
                this._oExtensionUtilities.logMessage("PluginEventExtension.onFetchResourceStatusTableData: finished");
            });
        }
    })
});
