const Property = require("../model/property");
const TagClass = require("../protocol/tagclass");
const ServiceParameterConstants =
  require("../protocol/serviceparameterconstants.js").ServiceParameterConstants;

class PropertyMessageToDeviceObjectConverter {
    convert(bacnetMessage, deviceObject) {

        let serviceParameters = bacnetMessage.apdu.serviceParameters;

        if (Array.isArray(serviceParameters) && serviceParameters.length) {

            serviceParameters.map(sp => {

                if (sp.tagClass == TagClass.CONTEXT_SPECIFIC_TAG) {

                    //console.log(sp.lengthValueType + " " + ServiceParameterConstants.OPENING_TAG_CODE);

                    if (sp.lengthValueType == ServiceParameterConstants.OPENING_TAG_CODE) {
                    } else if (sp.lengthValueType == ServiceParameterConstants.CLOSING_TAG_CODE) {
                    } else {
                        let property = new Property();
                        property.serviceParameterKey = sp;
                        deviceObject.properties.push(property);
                    }
                } else if (sp.tagClass == TagClass.APPLICATION_TAG) {
                    let property = new Property();
                    property.serviceParameterKey = sp;
                    deviceObject.properties.push(property);
                }

            });
        }
    }
  }

  module.exports = PropertyMessageToDeviceObjectConverter;
