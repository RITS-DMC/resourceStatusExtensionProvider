sap.ui.define([
    "sap/dm/dme/podfoundation/extension/PluginExtensionProvider",
    "rits/custom/plugin/sampleplugin/resourceStatusExtensionProvider/PluginEventExtension",
    "rits/custom/plugin/sampleplugin/resourceStatusExtensionProvider/PluginLifecycleExtension",
    "rits/custom/plugin/sampleplugin/resourceStatusExtensionProvider/PropertyEditorExtension",
    "rits/custom/plugin/sampleplugin/resourceStatusExtensionProvider/ExtensionUtilities"
], function (PluginExtensionProvider, PluginEventExtension, PluginLifecycleExtension, PropertyEditorExtension, ExtensionUtilities) {
    "use strict";

    return PluginExtensionProvider.extend("rits.custom.plugin.sampleplugin.resourceStatusExtensionProvider.ExtensionProvider", {
        constructor: function () {
            this.oExtensionUtilities = new ExtensionUtilities();
        },

        getExtensions: function () {
           return [
               new PluginEventExtension(this.oExtensionUtilities),
               new PluginLifecycleExtension(this.oExtensionUtilities),
               new PropertyEditorExtension(this.oExtensionUtilities)
           ];
        }
    })
});