{
    "patcher": {
        "fileversion": 1,
        "appversion": {
            "major": 9,
            "minor": 1,
            "revision": 2,
            "architecture": "x64",
            "modernui": 1
        },
        "classnamespace": "box",
        "rect": [ 55.0, 99.0, 662.0, 476.0 ],
        "integercoordinates": 1,
        "boxes": [
            {
                "box": {
                    "autosave": 1,
                    "color": [ 0.618934978328545, 0.744701397656435, 0.953750108255376, 1.0 ],
                    "fontface": 1,
                    "fontsize": 14.0,
                    "hint": "To make a preset, unlock the patcher and highlight the rnbo~ object, then click on the snapshot sidebar icon. From here, click on the + icon or the New... button to add a new snapshot and the play button to recall it. Just like standard Max snapshots , you can embed them in the patcher and rename them as you see fit.",
                    "id": "obj-41",
                    "inletInfo": {
                        "IOInfo": [
                            {
                                "type": "signal",
                                "index": 1,
                                "tag": "in1",
                                "comment": ""
                            },
                            {
                                "type": "signal",
                                "index": 2,
                                "tag": "in2",
                                "comment": ""
                            },
                            {
                                "type": "midi",
                                "index": -1,
                                "tag": "",
                                "comment": ""
                            }
                        ]
                    },
                    "maxclass": "newobj",
                    "numinlets": 3,
                    "numoutlets": 4,
                    "outletInfo": {
                        "IOInfo": [
                            {
                                "type": "signal",
                                "index": 1,
                                "tag": "out1",
                                "comment": ""
                            },
                            {
                                "type": "signal",
                                "index": 2,
                                "tag": "out2",
                                "comment": ""
                            },
                            {
                                "type": "signal",
                                "index": 3,
                                "tag": "out3",
                                "comment": ""
                            }
                        ]
                    },
                    "outlettype": [ "signal", "signal", "signal", "list" ],
                    "patcher": {
                        "fileversion": 1,
                        "appversion": {
                            "major": 9,
                            "minor": 1,
                            "revision": 2,
                            "architecture": "x64",
                            "modernui": 1
                        },
                        "classnamespace": "rnbo",
                        "rect": [ 33.0, 80.0, 354.0, 423.0 ],
                        "default_fontname": "Lato",
                        "gridonopen": 2,
                        "gridsize": [ 10.0, 10.0 ],
                        "gridsnaponopen": 2,
                        "objectsnaponopen": 0,
                        "subpatcher_template": "MP-Rnbo",
                        "integercoordinates": 1,
                        "title": "untitled",
                        "boxes": [
                            {
                                "box": {
                                    "id": "obj-10",
                                    "maxclass": "newobj",
                                    "numinlets": 1,
                                    "numoutlets": 0,
                                    "patching_rect": [ 480.0, 380.0, 81.0, 23.0 ],
                                    "rnbo_classname": "outport",
                                    "rnbo_extra_attributes": {
                                        "meta": ""
                                    },
                                    "rnbo_serial": 1,
                                    "rnbo_uniqueid": "outport_obj-10",
                                    "text": "outport mode"
                                }
                            },
                            {
                                "box": {
                                    "id": "obj-78",
                                    "maxclass": "newobj",
                                    "numinlets": 2,
                                    "numoutlets": 2,
                                    "outlettype": [ "signal", "" ],
                                    "patching_rect": [ 450.0, 330.0, 69.0, 23.0 ],
                                    "rnbo_classname": "fade~",
                                    "rnbo_serial": 1,
                                    "rnbo_uniqueid": "fade~_obj-78",
                                    "rnboinfo": {
                                        "needsInstanceInfo": 1,
                                        "argnames": {
                                            "segments": {
                                                "attrOrProp": 1,
                                                "digest": "Target value or target value/ramp time pairs",
                                                "isalias": 0,
                                                "aliases": [ "dest" ],
                                                "settable": 1,
                                                "attachable": 0,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "inlet": 1,
                                                "type": "list",
                                                "defaultValue": ""
                                            },
                                            "dest": {
                                                "attrOrProp": 1,
                                                "digest": "Target value or target value/ramp time pairs",
                                                "isalias": 1,
                                                "aliasOf": "segments",
                                                "aliases": [],
                                                "settable": 1,
                                                "attachable": 0,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "inlet": 1,
                                                "type": "list",
                                                "defaultValue": ""
                                            },
                                            "time": {
                                                "attrOrProp": 1,
                                                "digest": "Ramp time",
                                                "defaultarg": 2,
                                                "isalias": 0,
                                                "aliases": [],
                                                "settable": 1,
                                                "attachable": 0,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "inlet": 1,
                                                "type": "number",
                                                "defaultValue": "0"
                                            },
                                            "keepramp": {
                                                "attrOrProp": 1,
                                                "digest": "Keep last ramp",
                                                "isalias": 0,
                                                "aliases": [],
                                                "settable": 1,
                                                "attachable": 1,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "type": "bool",
                                                "defaultValue": "false"
                                            },
                                            "out": {
                                                "attrOrProp": 1,
                                                "digest": "Ramp out",
                                                "isalias": 0,
                                                "aliases": [],
                                                "settable": 0,
                                                "attachable": 0,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "outlet": 1,
                                                "type": "signal"
                                            },
                                            "target": {
                                                "attrOrProp": 1,
                                                "digest": "Bang when ramp has finished",
                                                "isalias": 0,
                                                "aliases": [],
                                                "settable": 0,
                                                "attachable": 0,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "outlet": 1,
                                                "type": "bang"
                                            },
                                            "value": {
                                                "attrOrProp": 2,
                                                "digest": "Initial value.",
                                                "defaultarg": 1,
                                                "isalias": 0,
                                                "aliases": [],
                                                "settable": 1,
                                                "attachable": 0,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "type": "number",
                                                "defaultValue": "0"
                                            }
                                        },
                                        "inputs": [
                                            {
                                                "name": "segments",
                                                "type": "list",
                                                "digest": "Target value or target value/ramp time pairs",
                                                "hot": 1,
                                                "docked": 0
                                            },
                                            {
                                                "name": "time",
                                                "type": "number",
                                                "digest": "Ramp time",
                                                "defaultarg": 2,
                                                "docked": 0
                                            }
                                        ],
                                        "outputs": [
                                            {
                                                "name": "out",
                                                "type": "signal",
                                                "digest": "Ramp out",
                                                "docked": 0
                                            },
                                            {
                                                "name": "target",
                                                "type": "bang",
                                                "digest": "Bang when ramp has finished",
                                                "docked": 0
                                            }
                                        ],
                                        "helpname": "line~",
                                        "aliasOf": "line~",
                                        "classname": "fade~",
                                        "operator": 0,
                                        "versionId": 2134689829,
                                        "changesPatcherIO": 0
                                    },
                                    "text": "fade~ 0. 10"
                                }
                            },
                            {
                                "box": {
                                    "id": "obj-68",
                                    "maxclass": "newobj",
                                    "numinlets": 3,
                                    "numoutlets": 1,
                                    "outlettype": [ "signal" ],
                                    "patching_rect": [ 260.0, 620.0, 59.0, 23.0 ],
                                    "rnbo_classname": "mix~",
                                    "rnbo_serial": 1,
                                    "rnbo_uniqueid": "mix~_obj-68",
                                    "text": "mix~"
                                }
                            },
                            {
                                "box": {
                                    "id": "obj-65",
                                    "maxclass": "newobj",
                                    "numinlets": 3,
                                    "numoutlets": 1,
                                    "outlettype": [ "signal" ],
                                    "patching_rect": [ 70.0, 310.0, 59.0, 23.0 ],
                                    "rnbo_classname": "mix~",
                                    "rnbo_serial": 2,
                                    "rnbo_uniqueid": "mix~_obj-65",
                                    "text": "mix~"
                                }
                            },
                            {
                                "box": {
                                    "id": "obj-63",
                                    "maxclass": "newobj",
                                    "numinlets": 1,
                                    "numoutlets": 0,
                                    "patching_rect": [ 450.0, 150.0, 79.0, 23.0 ],
                                    "rnbo_classname": "outport",
                                    "rnbo_extra_attributes": {
                                        "meta": ""
                                    },
                                    "rnbo_serial": 2,
                                    "rnbo_uniqueid": "outport_obj-63",
                                    "text": "outport slope"
                                }
                            },
                            {
                                "box": {
                                    "id": "obj-44",
                                    "maxclass": "newobj",
                                    "numinlets": 2,
                                    "numoutlets": 1,
                                    "outlettype": [ "signal" ],
                                    "patching_rect": [ 120.0, 680.0, 29.5, 23.0 ],
                                    "rnbo_classname": "*~",
                                    "rnbo_serial": 1,
                                    "rnbo_uniqueid": "*~_obj-44",
                                    "text": "*~"
                                }
                            },
                            {
                                "box": {
                                    "id": "obj-42",
                                    "maxclass": "newobj",
                                    "numinlets": 2,
                                    "numoutlets": 1,
                                    "outlettype": [ "signal" ],
                                    "patching_rect": [ 70.0, 680.0, 29.5, 23.0 ],
                                    "rnbo_classname": "*~",
                                    "rnbo_serial": 2,
                                    "rnbo_uniqueid": "*~_obj-42",
                                    "text": "*~"
                                }
                            },
                            {
                                "box": {
                                    "fontface": 1,
                                    "id": "obj-29",
                                    "maxclass": "flonum",
                                    "maximum": 100.0,
                                    "minimum": 0.0,
                                    "numinlets": 1,
                                    "numoutlets": 2,
                                    "outlettype": [ "", "bang" ],
                                    "parameter_enable": 0,
                                    "patching_rect": [ 200.0, 90.0, 50.0, 23.0 ],
                                    "rnbo_classname": "number",
                                    "rnbo_extra_attributes": {
                                        "maximum": 100.0,
                                        "initialFormat": "float",
                                        "minimum": 0.0,
                                        "order": "",
                                        "preset": 0
                                    },
                                    "rnbo_serial": 1,
                                    "rnbo_uniqueid": "number_obj-29",
                                    "saved_attribute_attributes": {
                                        "textcolor": {
                                            "expression": "themecolor.theme_selectioncolor"
                                        }
                                    },
                                    "textcolor": [ 0.922234290352602, 0.71007200526417, 0.329758341965716, 1.0 ]
                                }
                            },
                            {
                                "box": {
                                    "id": "obj-30",
                                    "maxclass": "newobj",
                                    "numinlets": 2,
                                    "numoutlets": 2,
                                    "outlettype": [ "", "" ],
                                    "patching_rect": [ 200.0, 60.0, 84.0, 23.0 ],
                                    "rnbo_classname": "param",
                                    "rnbo_extra_attributes": {
                                        "meta": "",
                                        "tonormalized": "",
                                        "ctlin": 4.0,
                                        "maximum": 100.0,
                                        "enum": "",
                                        "fromnormalized": "",
                                        "minimum": 0.0,
                                        "steps": 0.0,
                                        "unit": "%",
                                        "order": "4",
                                        "displayorder": "-",
                                        "preset": 1,
                                        "displayname": "Smoothing",
                                        "sendinit": 1,
                                        "exponent": 1.0
                                    },
                                    "rnbo_serial": 1,
                                    "rnbo_uniqueid": "smooth",
                                    "rnboinfo": {
                                        "needsInstanceInfo": 1,
                                        "argnames": {
                                            "value": {
                                                "attrOrProp": 1,
                                                "digest": "Parameter value",
                                                "defaultarg": 2,
                                                "isalias": 0,
                                                "aliases": [],
                                                "settable": 1,
                                                "attachable": 0,
                                                "isparam": 1,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "inlet": 1,
                                                "type": "number",
                                                "defaultValue": "0"
                                            },
                                            "normalizedvalue": {
                                                "attrOrProp": 1,
                                                "digest": "Set value normalized. ",
                                                "isalias": 0,
                                                "aliases": [],
                                                "attachable": 0,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "inlet": 1,
                                                "type": "number"
                                            },
                                            "reset": {
                                                "attrOrProp": 1,
                                                "digest": "Reset param to initial value",
                                                "isalias": 0,
                                                "aliases": [],
                                                "attachable": 1,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "type": "bang"
                                            },
                                            "normalized": {
                                                "attrOrProp": 1,
                                                "digest": "Normalized parameter value.",
                                                "isalias": 0,
                                                "aliases": [],
                                                "attachable": 0,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "outlet": 1,
                                                "type": "number"
                                            },
                                            "name": {
                                                "attrOrProp": 2,
                                                "digest": "Name of the parameter",
                                                "defaultarg": 1,
                                                "isalias": 0,
                                                "aliases": [],
                                                "settable": 1,
                                                "attachable": 0,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "type": "symbol",
                                                "label": "Parameter Name",
                                                "mandatory": 1
                                            },
                                            "enum": {
                                                "attrOrProp": 2,
                                                "digest": "Use an enumerated output",
                                                "isalias": 0,
                                                "aliases": [],
                                                "settable": 1,
                                                "attachable": 0,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "type": "list",
                                                "label": "Enum Values",
                                                "displayorder": 6
                                            },
                                            "minimum": {
                                                "attrOrProp": 2,
                                                "digest": "Minimum value",
                                                "isalias": 0,
                                                "aliases": [ "min" ],
                                                "settable": 1,
                                                "attachable": 0,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "type": "number",
                                                "defaultValue": "0",
                                                "label": "Minimum",
                                                "displayorder": 1
                                            },
                                            "min": {
                                                "attrOrProp": 2,
                                                "digest": "Minimum value",
                                                "isalias": 1,
                                                "aliasOf": "minimum",
                                                "aliases": [],
                                                "settable": 1,
                                                "attachable": 0,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "type": "number",
                                                "defaultValue": "0",
                                                "label": "Minimum",
                                                "displayorder": 1
                                            },
                                            "maximum": {
                                                "attrOrProp": 2,
                                                "digest": "Maximum value",
                                                "isalias": 0,
                                                "aliases": [ "max" ],
                                                "settable": 1,
                                                "attachable": 0,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "type": "number",
                                                "defaultValue": "1",
                                                "label": "Maximum",
                                                "displayorder": 2
                                            },
                                            "max": {
                                                "attrOrProp": 2,
                                                "digest": "Maximum value",
                                                "isalias": 1,
                                                "aliasOf": "maximum",
                                                "aliases": [],
                                                "settable": 1,
                                                "attachable": 0,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "type": "number",
                                                "defaultValue": "1",
                                                "label": "Maximum",
                                                "displayorder": 2
                                            },
                                            "exponent": {
                                                "attrOrProp": 2,
                                                "digest": "Scale values exponentially",
                                                "isalias": 0,
                                                "aliases": [],
                                                "settable": 1,
                                                "attachable": 0,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "type": "number",
                                                "defaultValue": "1",
                                                "label": "Exponent",
                                                "displayorder": 7
                                            },
                                            "steps": {
                                                "attrOrProp": 2,
                                                "digest": "Divide the output into a number of discrete steps",
                                                "isalias": 0,
                                                "aliases": [],
                                                "settable": 1,
                                                "attachable": 0,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "type": "number",
                                                "defaultValue": "0",
                                                "label": "Steps",
                                                "displayorder": 8
                                            },
                                            "displayName": {
                                                "attrOrProp": 2,
                                                "digest": "DEPRECATED: Use the lower case 'displayname' instead",
                                                "isalias": 0,
                                                "aliases": [],
                                                "settable": 1,
                                                "attachable": 0,
                                                "isparam": 0,
                                                "deprecated": 1,
                                                "touched": 0,
                                                "type": "symbol",
                                                "label": "Display Name"
                                            },
                                            "displayname": {
                                                "attrOrProp": 2,
                                                "digest": "A more readable name for the parameter in an external RNBO target",
                                                "isalias": 0,
                                                "aliases": [],
                                                "settable": 1,
                                                "attachable": 0,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "type": "symbol",
                                                "defaultValue": "",
                                                "label": "Display Name",
                                                "displayorder": 14
                                            },
                                            "unit": {
                                                "attrOrProp": 2,
                                                "digest": "A symbol to describe the unit of the parameter in an external RNBO target",
                                                "isalias": 0,
                                                "aliases": [],
                                                "settable": 1,
                                                "attachable": 0,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "type": "symbol",
                                                "defaultValue": "",
                                                "label": "Unit",
                                                "displayorder": 15
                                            },
                                            "tonormalized": {
                                                "attrOrProp": 2,
                                                "digest": "Converts a real parameter value to its normalized form",
                                                "isalias": 0,
                                                "aliases": [],
                                                "settable": 1,
                                                "attachable": 0,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "type": "symbol",
                                                "label": "To Normalized Expression",
                                                "displayorder": 10
                                            },
                                            "fromnormalized": {
                                                "attrOrProp": 2,
                                                "digest": "Converts a normalized parameter into its actual parameter value",
                                                "isalias": 0,
                                                "aliases": [],
                                                "settable": 1,
                                                "attachable": 0,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "type": "symbol",
                                                "label": "From Normalized Expression",
                                                "displayorder": 9
                                            },
                                            "order": {
                                                "attrOrProp": 2,
                                                "digest": "Order in which initial parameter values will be sent out on patcher load. The order can be numeric or symbolic ('first' and 'last')",
                                                "isalias": 0,
                                                "aliases": [],
                                                "settable": 1,
                                                "attachable": 0,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "type": "symbol",
                                                "defaultValue": "0",
                                                "label": "Restore Order",
                                                "displayorder": 12
                                            },
                                            "displayorder": {
                                                "attrOrProp": 2,
                                                "digest": "Order in which parameters will show up in a list of all parameters. The order can be numeric or symbolic ('first' and 'last')",
                                                "isalias": 0,
                                                "aliases": [],
                                                "settable": 1,
                                                "attachable": 0,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "type": "symbol",
                                                "defaultValue": "-",
                                                "label": "Display Order",
                                                "displayorder": 13
                                            },
                                            "sendinit": {
                                                "attrOrProp": 2,
                                                "digest": "Send initial value",
                                                "isalias": 0,
                                                "aliases": [],
                                                "settable": 1,
                                                "attachable": 0,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "type": "bool",
                                                "defaultValue": "true",
                                                "label": "Send Init",
                                                "displayorder": 4
                                            },
                                            "ctlin": {
                                                "attrOrProp": 2,
                                                "digest": "MIDI controller number to control this parameter.",
                                                "isalias": 0,
                                                "aliases": [],
                                                "settable": 1,
                                                "attachable": 0,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "type": "number",
                                                "defaultValue": "-1",
                                                "label": "MIDI Controller Number.",
                                                "displayorder": 16
                                            },
                                            "meta": {
                                                "attrOrProp": 2,
                                                "digest": "A JSON formatted string containing metadata for use by the exported code",
                                                "isalias": 0,
                                                "aliases": [],
                                                "settable": 1,
                                                "attachable": 0,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "type": "symbol",
                                                "defaultValue": "",
                                                "label": "Metadata",
                                                "displayorder": 17
                                            },
                                            "nopreset": {
                                                "attrOrProp": 2,
                                                "digest": "Do not add this value to the preset [DEPRECATED - USE @preset 0 instead].",
                                                "isalias": 0,
                                                "aliases": [],
                                                "settable": 1,
                                                "attachable": 0,
                                                "isparam": 0,
                                                "deprecated": 1,
                                                "touched": 0,
                                                "type": "bool",
                                                "defaultValue": "false"
                                            },
                                            "preset": {
                                                "attrOrProp": 2,
                                                "digest": "Add this value to the preset.",
                                                "isalias": 0,
                                                "aliases": [],
                                                "settable": 1,
                                                "attachable": 0,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "type": "bool",
                                                "defaultValue": "true",
                                                "label": "Include In Preset",
                                                "displayorder": 11
                                            }
                                        },
                                        "inputs": [
                                            {
                                                "name": "value",
                                                "type": "number",
                                                "digest": "Parameter value",
                                                "defaultarg": 2,
                                                "hot": 1,
                                                "docked": 0
                                            },
                                            {
                                                "name": "normalizedvalue",
                                                "type": "number",
                                                "digest": "Set value normalized. ",
                                                "docked": 0
                                            }
                                        ],
                                        "outputs": [
                                            {
                                                "name": "value",
                                                "type": "number",
                                                "digest": "Parameter value",
                                                "defaultarg": 2,
                                                "hot": 1,
                                                "docked": 0
                                            },
                                            {
                                                "name": "normalized",
                                                "type": "number",
                                                "digest": "Normalized parameter value.",
                                                "docked": 0
                                            }
                                        ],
                                        "helpname": "param",
                                        "aliasOf": "param",
                                        "classname": "param",
                                        "operator": 0,
                                        "versionId": -1661410411,
                                        "changesPatcherIO": 0
                                    },
                                    "text": "param smooth",
                                    "varname": "smooth"
                                }
                            },
                            {
                                "box": {
                                    "id": "obj-31",
                                    "maxclass": "flonum",
                                    "numinlets": 1,
                                    "numoutlets": 2,
                                    "outlettype": [ "", "bang" ],
                                    "parameter_enable": 0,
                                    "patching_rect": [ 200.0, 180.0, 50.0, 23.0 ],
                                    "rnbo_classname": "number",
                                    "rnbo_extra_attributes": {
                                        "maximum": "<none>",
                                        "initialFormat": "float",
                                        "minimum": "<none>",
                                        "order": "",
                                        "preset": 0
                                    },
                                    "rnbo_serial": 2,
                                    "rnbo_uniqueid": "number_obj-31"
                                }
                            },
                            {
                                "box": {
                                    "id": "obj-32",
                                    "linecount": 2,
                                    "maxclass": "newobj",
                                    "numinlets": 6,
                                    "numoutlets": 1,
                                    "outlettype": [ "" ],
                                    "patching_rect": [ 200.0, 120.0, 100.0, 37.0 ],
                                    "rnbo_classname": "scale",
                                    "rnbo_serial": 1,
                                    "rnbo_uniqueid": "scale_obj-32",
                                    "text": "scale 0. 100. 10. 500. 2.445"
                                }
                            },
                            {
                                "box": {
                                    "fontface": 1,
                                    "id": "obj-41",
                                    "maxclass": "flonum",
                                    "maximum": 100.0,
                                    "minimum": 0.0,
                                    "numinlets": 1,
                                    "numoutlets": 2,
                                    "outlettype": [ "", "bang" ],
                                    "parameter_enable": 0,
                                    "patching_rect": [ 70.0, 90.0, 50.0, 23.0 ],
                                    "rnbo_classname": "number",
                                    "rnbo_extra_attributes": {
                                        "maximum": 100.0,
                                        "initialFormat": "float",
                                        "minimum": 0.0,
                                        "order": "",
                                        "preset": 0
                                    },
                                    "rnbo_serial": 3,
                                    "rnbo_uniqueid": "number_obj-41",
                                    "saved_attribute_attributes": {
                                        "textcolor": {
                                            "expression": "themecolor.theme_selectioncolor"
                                        }
                                    },
                                    "textcolor": [ 0.922234290352602, 0.71007200526417, 0.329758341965716, 1.0 ]
                                }
                            },
                            {
                                "box": {
                                    "id": "obj-39",
                                    "maxclass": "newobj",
                                    "numinlets": 2,
                                    "numoutlets": 2,
                                    "outlettype": [ "", "" ],
                                    "patching_rect": [ 70.0, 60.0, 83.0, 23.0 ],
                                    "rnbo_classname": "param",
                                    "rnbo_extra_attributes": {
                                        "meta": "",
                                        "tonormalized": "",
                                        "ctlin": 1.0,
                                        "maximum": 100.0,
                                        "enum": "",
                                        "fromnormalized": "",
                                        "minimum": 0.0,
                                        "steps": 0.0,
                                        "unit": "%",
                                        "order": "1",
                                        "displayorder": "-",
                                        "preset": 1,
                                        "displayname": "Volume",
                                        "sendinit": 1,
                                        "exponent": 1.0
                                    },
                                    "rnbo_serial": 2,
                                    "rnbo_uniqueid": "volume",
                                    "rnboinfo": {
                                        "needsInstanceInfo": 1,
                                        "argnames": {
                                            "value": {
                                                "attrOrProp": 1,
                                                "digest": "Parameter value",
                                                "defaultarg": 2,
                                                "isalias": 0,
                                                "aliases": [],
                                                "settable": 1,
                                                "attachable": 0,
                                                "isparam": 1,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "inlet": 1,
                                                "type": "number",
                                                "defaultValue": "100"
                                            },
                                            "normalizedvalue": {
                                                "attrOrProp": 1,
                                                "digest": "Set value normalized. ",
                                                "isalias": 0,
                                                "aliases": [],
                                                "attachable": 0,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "inlet": 1,
                                                "type": "number"
                                            },
                                            "reset": {
                                                "attrOrProp": 1,
                                                "digest": "Reset param to initial value",
                                                "isalias": 0,
                                                "aliases": [],
                                                "attachable": 1,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "type": "bang"
                                            },
                                            "normalized": {
                                                "attrOrProp": 1,
                                                "digest": "Normalized parameter value.",
                                                "isalias": 0,
                                                "aliases": [],
                                                "attachable": 0,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "outlet": 1,
                                                "type": "number"
                                            },
                                            "name": {
                                                "attrOrProp": 2,
                                                "digest": "Name of the parameter",
                                                "defaultarg": 1,
                                                "isalias": 0,
                                                "aliases": [],
                                                "settable": 1,
                                                "attachable": 0,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "type": "symbol",
                                                "label": "Parameter Name",
                                                "mandatory": 1
                                            },
                                            "enum": {
                                                "attrOrProp": 2,
                                                "digest": "Use an enumerated output",
                                                "isalias": 0,
                                                "aliases": [],
                                                "settable": 1,
                                                "attachable": 0,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "type": "list",
                                                "label": "Enum Values",
                                                "displayorder": 6
                                            },
                                            "minimum": {
                                                "attrOrProp": 2,
                                                "digest": "Minimum value",
                                                "isalias": 0,
                                                "aliases": [ "min" ],
                                                "settable": 1,
                                                "attachable": 0,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "type": "number",
                                                "defaultValue": "0",
                                                "label": "Minimum",
                                                "displayorder": 1
                                            },
                                            "min": {
                                                "attrOrProp": 2,
                                                "digest": "Minimum value",
                                                "isalias": 1,
                                                "aliasOf": "minimum",
                                                "aliases": [],
                                                "settable": 1,
                                                "attachable": 0,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "type": "number",
                                                "defaultValue": "0",
                                                "label": "Minimum",
                                                "displayorder": 1
                                            },
                                            "maximum": {
                                                "attrOrProp": 2,
                                                "digest": "Maximum value",
                                                "isalias": 0,
                                                "aliases": [ "max" ],
                                                "settable": 1,
                                                "attachable": 0,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "type": "number",
                                                "defaultValue": "1",
                                                "label": "Maximum",
                                                "displayorder": 2
                                            },
                                            "max": {
                                                "attrOrProp": 2,
                                                "digest": "Maximum value",
                                                "isalias": 1,
                                                "aliasOf": "maximum",
                                                "aliases": [],
                                                "settable": 1,
                                                "attachable": 0,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "type": "number",
                                                "defaultValue": "1",
                                                "label": "Maximum",
                                                "displayorder": 2
                                            },
                                            "exponent": {
                                                "attrOrProp": 2,
                                                "digest": "Scale values exponentially",
                                                "isalias": 0,
                                                "aliases": [],
                                                "settable": 1,
                                                "attachable": 0,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "type": "number",
                                                "defaultValue": "1",
                                                "label": "Exponent",
                                                "displayorder": 7
                                            },
                                            "steps": {
                                                "attrOrProp": 2,
                                                "digest": "Divide the output into a number of discrete steps",
                                                "isalias": 0,
                                                "aliases": [],
                                                "settable": 1,
                                                "attachable": 0,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "type": "number",
                                                "defaultValue": "0",
                                                "label": "Steps",
                                                "displayorder": 8
                                            },
                                            "displayName": {
                                                "attrOrProp": 2,
                                                "digest": "DEPRECATED: Use the lower case 'displayname' instead",
                                                "isalias": 0,
                                                "aliases": [],
                                                "settable": 1,
                                                "attachable": 0,
                                                "isparam": 0,
                                                "deprecated": 1,
                                                "touched": 0,
                                                "type": "symbol",
                                                "label": "Display Name"
                                            },
                                            "displayname": {
                                                "attrOrProp": 2,
                                                "digest": "A more readable name for the parameter in an external RNBO target",
                                                "isalias": 0,
                                                "aliases": [],
                                                "settable": 1,
                                                "attachable": 0,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "type": "symbol",
                                                "defaultValue": "",
                                                "label": "Display Name",
                                                "displayorder": 14
                                            },
                                            "unit": {
                                                "attrOrProp": 2,
                                                "digest": "A symbol to describe the unit of the parameter in an external RNBO target",
                                                "isalias": 0,
                                                "aliases": [],
                                                "settable": 1,
                                                "attachable": 0,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "type": "symbol",
                                                "defaultValue": "",
                                                "label": "Unit",
                                                "displayorder": 15
                                            },
                                            "tonormalized": {
                                                "attrOrProp": 2,
                                                "digest": "Converts a real parameter value to its normalized form",
                                                "isalias": 0,
                                                "aliases": [],
                                                "settable": 1,
                                                "attachable": 0,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "type": "symbol",
                                                "label": "To Normalized Expression",
                                                "displayorder": 10
                                            },
                                            "fromnormalized": {
                                                "attrOrProp": 2,
                                                "digest": "Converts a normalized parameter into its actual parameter value",
                                                "isalias": 0,
                                                "aliases": [],
                                                "settable": 1,
                                                "attachable": 0,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "type": "symbol",
                                                "label": "From Normalized Expression",
                                                "displayorder": 9
                                            },
                                            "order": {
                                                "attrOrProp": 2,
                                                "digest": "Order in which initial parameter values will be sent out on patcher load. The order can be numeric or symbolic ('first' and 'last')",
                                                "isalias": 0,
                                                "aliases": [],
                                                "settable": 1,
                                                "attachable": 0,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "type": "symbol",
                                                "defaultValue": "0",
                                                "label": "Restore Order",
                                                "displayorder": 12
                                            },
                                            "displayorder": {
                                                "attrOrProp": 2,
                                                "digest": "Order in which parameters will show up in a list of all parameters. The order can be numeric or symbolic ('first' and 'last')",
                                                "isalias": 0,
                                                "aliases": [],
                                                "settable": 1,
                                                "attachable": 0,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "type": "symbol",
                                                "defaultValue": "-",
                                                "label": "Display Order",
                                                "displayorder": 13
                                            },
                                            "sendinit": {
                                                "attrOrProp": 2,
                                                "digest": "Send initial value",
                                                "isalias": 0,
                                                "aliases": [],
                                                "settable": 1,
                                                "attachable": 0,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "type": "bool",
                                                "defaultValue": "true",
                                                "label": "Send Init",
                                                "displayorder": 4
                                            },
                                            "ctlin": {
                                                "attrOrProp": 2,
                                                "digest": "MIDI controller number to control this parameter.",
                                                "isalias": 0,
                                                "aliases": [],
                                                "settable": 1,
                                                "attachable": 0,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "type": "number",
                                                "defaultValue": "-1",
                                                "label": "MIDI Controller Number.",
                                                "displayorder": 16
                                            },
                                            "meta": {
                                                "attrOrProp": 2,
                                                "digest": "A JSON formatted string containing metadata for use by the exported code",
                                                "isalias": 0,
                                                "aliases": [],
                                                "settable": 1,
                                                "attachable": 0,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "type": "symbol",
                                                "defaultValue": "",
                                                "label": "Metadata",
                                                "displayorder": 17
                                            },
                                            "nopreset": {
                                                "attrOrProp": 2,
                                                "digest": "Do not add this value to the preset [DEPRECATED - USE @preset 0 instead].",
                                                "isalias": 0,
                                                "aliases": [],
                                                "settable": 1,
                                                "attachable": 0,
                                                "isparam": 0,
                                                "deprecated": 1,
                                                "touched": 0,
                                                "type": "bool",
                                                "defaultValue": "false"
                                            },
                                            "preset": {
                                                "attrOrProp": 2,
                                                "digest": "Add this value to the preset.",
                                                "isalias": 0,
                                                "aliases": [],
                                                "settable": 1,
                                                "attachable": 0,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "type": "bool",
                                                "defaultValue": "true",
                                                "label": "Include In Preset",
                                                "displayorder": 11
                                            }
                                        },
                                        "inputs": [
                                            {
                                                "name": "value",
                                                "type": "number",
                                                "digest": "Parameter value",
                                                "defaultarg": 2,
                                                "hot": 1,
                                                "docked": 0
                                            },
                                            {
                                                "name": "normalizedvalue",
                                                "type": "number",
                                                "digest": "Set value normalized. ",
                                                "docked": 0
                                            }
                                        ],
                                        "outputs": [
                                            {
                                                "name": "value",
                                                "type": "number",
                                                "digest": "Parameter value",
                                                "defaultarg": 2,
                                                "hot": 1,
                                                "docked": 0
                                            },
                                            {
                                                "name": "normalized",
                                                "type": "number",
                                                "digest": "Normalized parameter value.",
                                                "docked": 0
                                            }
                                        ],
                                        "helpname": "param",
                                        "aliasOf": "param",
                                        "classname": "param",
                                        "operator": 0,
                                        "versionId": -1661410411,
                                        "changesPatcherIO": 0
                                    },
                                    "text": "param volume",
                                    "varname": "volume"
                                }
                            },
                            {
                                "box": {
                                    "fontface": 1,
                                    "id": "obj-24",
                                    "maxclass": "flonum",
                                    "maximum": 100.0,
                                    "minimum": -100.0,
                                    "numinlets": 1,
                                    "numoutlets": 2,
                                    "outlettype": [ "", "bang" ],
                                    "parameter_enable": 0,
                                    "patching_rect": [ 340.0, 90.0, 50.0, 23.0 ],
                                    "rnbo_classname": "number",
                                    "rnbo_extra_attributes": {
                                        "maximum": 100.0,
                                        "initialFormat": "float",
                                        "minimum": -100.0,
                                        "order": "",
                                        "preset": 0
                                    },
                                    "rnbo_serial": 4,
                                    "rnbo_uniqueid": "number_obj-24",
                                    "saved_attribute_attributes": {
                                        "textcolor": {
                                            "expression": "themecolor.theme_selectioncolor"
                                        }
                                    },
                                    "textcolor": [ 0.922234290352602, 0.71007200526417, 0.329758341965716, 1.0 ]
                                }
                            },
                            {
                                "box": {
                                    "id": "obj-22",
                                    "maxclass": "toggle",
                                    "numinlets": 1,
                                    "numoutlets": 1,
                                    "outlettype": [ "int" ],
                                    "parameter_enable": 0,
                                    "patching_rect": [ 480.0, 290.0, 24.0, 24.0 ],
                                    "rnbo_classname": "toggle",
                                    "rnbo_extra_attributes": {
                                        "order": "",
                                        "preset": 0
                                    },
                                    "rnbo_serial": 1,
                                    "rnbo_uniqueid": "toggle_obj-22"
                                }
                            },
                            {
                                "box": {
                                    "id": "obj-9",
                                    "maxclass": "newobj",
                                    "numinlets": 2,
                                    "numoutlets": 2,
                                    "outlettype": [ "", "" ],
                                    "patching_rect": [ 480.0, 260.0, 74.0, 23.0 ],
                                    "rnbo_classname": "param",
                                    "rnbo_extra_attributes": {
                                        "meta": "",
                                        "tonormalized": "",
                                        "ctlin": 2.0,
                                        "maximum": 1.0,
                                        "enum": "pow comp",
                                        "fromnormalized": "",
                                        "minimum": 0.0,
                                        "steps": 2.0,
                                        "unit": "",
                                        "order": "2",
                                        "displayorder": "-",
                                        "preset": 1,
                                        "displayname": "Mode",
                                        "sendinit": 1,
                                        "exponent": 1.0
                                    },
                                    "rnbo_serial": 3,
                                    "rnbo_uniqueid": "mode",
                                    "rnboinfo": {
                                        "needsInstanceInfo": 1,
                                        "argnames": {
                                            "value": {
                                                "attrOrProp": 1,
                                                "digest": "Parameter value",
                                                "defaultarg": 2,
                                                "isalias": 0,
                                                "aliases": [],
                                                "settable": 1,
                                                "attachable": 0,
                                                "isparam": 1,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "inlet": 1,
                                                "type": "number",
                                                "defaultValue": "0"
                                            },
                                            "normalizedvalue": {
                                                "attrOrProp": 1,
                                                "digest": "Set value normalized. ",
                                                "isalias": 0,
                                                "aliases": [],
                                                "attachable": 0,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "inlet": 1,
                                                "type": "number"
                                            },
                                            "reset": {
                                                "attrOrProp": 1,
                                                "digest": "Reset param to initial value",
                                                "isalias": 0,
                                                "aliases": [],
                                                "attachable": 1,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "type": "bang"
                                            },
                                            "normalized": {
                                                "attrOrProp": 1,
                                                "digest": "Normalized parameter value.",
                                                "isalias": 0,
                                                "aliases": [],
                                                "attachable": 0,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "outlet": 1,
                                                "type": "number"
                                            },
                                            "maximum": {
                                                "attrOrProp": 2,
                                                "digest": "Maximum value",
                                                "isalias": 0,
                                                "aliases": [ "max" ],
                                                "settable": 1,
                                                "attachable": 0,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 1,
                                                "type": "number",
                                                "defaultValue": "1",
                                                "label": "Maximum",
                                                "displayorder": 2,
                                                "disabledInMaxInspector": 1
                                            },
                                            "max": {
                                                "attrOrProp": 2,
                                                "digest": "Maximum value",
                                                "isalias": 1,
                                                "aliasOf": "maximum",
                                                "aliases": [],
                                                "settable": 1,
                                                "attachable": 0,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "type": "number",
                                                "defaultValue": "1",
                                                "label": "Maximum",
                                                "displayorder": 2
                                            },
                                            "minimum": {
                                                "attrOrProp": 2,
                                                "digest": "Minimum value",
                                                "isalias": 0,
                                                "aliases": [ "min" ],
                                                "settable": 1,
                                                "attachable": 0,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 1,
                                                "type": "number",
                                                "defaultValue": "0",
                                                "label": "Minimum",
                                                "displayorder": 1,
                                                "disabledInMaxInspector": 1
                                            },
                                            "min": {
                                                "attrOrProp": 2,
                                                "digest": "Minimum value",
                                                "isalias": 1,
                                                "aliasOf": "minimum",
                                                "aliases": [],
                                                "settable": 1,
                                                "attachable": 0,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "type": "number",
                                                "defaultValue": "0",
                                                "label": "Minimum",
                                                "displayorder": 1
                                            },
                                            "steps": {
                                                "attrOrProp": 2,
                                                "digest": "Divide the output into a number of discrete steps",
                                                "isalias": 0,
                                                "aliases": [],
                                                "settable": 1,
                                                "attachable": 0,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 1,
                                                "type": "number",
                                                "defaultValue": "2",
                                                "label": "Steps",
                                                "displayorder": 8,
                                                "disabledInMaxInspector": 1
                                            },
                                            "exponent": {
                                                "attrOrProp": 2,
                                                "digest": "Scale values exponentially",
                                                "isalias": 0,
                                                "aliases": [],
                                                "settable": 1,
                                                "attachable": 0,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 1,
                                                "type": "number",
                                                "defaultValue": "1",
                                                "label": "Exponent",
                                                "displayorder": 7,
                                                "disabledInMaxInspector": 1
                                            },
                                            "name": {
                                                "attrOrProp": 2,
                                                "digest": "Name of the parameter",
                                                "defaultarg": 1,
                                                "isalias": 0,
                                                "aliases": [],
                                                "settable": 1,
                                                "attachable": 0,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "type": "symbol",
                                                "label": "Parameter Name",
                                                "mandatory": 1
                                            },
                                            "enum": {
                                                "attrOrProp": 2,
                                                "digest": "Use an enumerated output",
                                                "isalias": 0,
                                                "aliases": [],
                                                "settable": 1,
                                                "attachable": 0,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "type": "list",
                                                "label": "Enum Values",
                                                "displayorder": 6
                                            },
                                            "displayName": {
                                                "attrOrProp": 2,
                                                "digest": "DEPRECATED: Use the lower case 'displayname' instead",
                                                "isalias": 0,
                                                "aliases": [],
                                                "settable": 1,
                                                "attachable": 0,
                                                "isparam": 0,
                                                "deprecated": 1,
                                                "touched": 0,
                                                "type": "symbol",
                                                "label": "Display Name"
                                            },
                                            "displayname": {
                                                "attrOrProp": 2,
                                                "digest": "A more readable name for the parameter in an external RNBO target",
                                                "isalias": 0,
                                                "aliases": [],
                                                "settable": 1,
                                                "attachable": 0,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "type": "symbol",
                                                "defaultValue": "",
                                                "label": "Display Name",
                                                "displayorder": 14
                                            },
                                            "unit": {
                                                "attrOrProp": 2,
                                                "digest": "A symbol to describe the unit of the parameter in an external RNBO target",
                                                "isalias": 0,
                                                "aliases": [],
                                                "settable": 1,
                                                "attachable": 0,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "type": "symbol",
                                                "defaultValue": "",
                                                "label": "Unit",
                                                "displayorder": 15
                                            },
                                            "tonormalized": {
                                                "attrOrProp": 2,
                                                "digest": "Converts a real parameter value to its normalized form",
                                                "isalias": 0,
                                                "aliases": [],
                                                "settable": 1,
                                                "attachable": 0,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "type": "symbol",
                                                "label": "To Normalized Expression",
                                                "displayorder": 10
                                            },
                                            "fromnormalized": {
                                                "attrOrProp": 2,
                                                "digest": "Converts a normalized parameter into its actual parameter value",
                                                "isalias": 0,
                                                "aliases": [],
                                                "settable": 1,
                                                "attachable": 0,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "type": "symbol",
                                                "label": "From Normalized Expression",
                                                "displayorder": 9
                                            },
                                            "order": {
                                                "attrOrProp": 2,
                                                "digest": "Order in which initial parameter values will be sent out on patcher load. The order can be numeric or symbolic ('first' and 'last')",
                                                "isalias": 0,
                                                "aliases": [],
                                                "settable": 1,
                                                "attachable": 0,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "type": "symbol",
                                                "defaultValue": "0",
                                                "label": "Restore Order",
                                                "displayorder": 12
                                            },
                                            "displayorder": {
                                                "attrOrProp": 2,
                                                "digest": "Order in which parameters will show up in a list of all parameters. The order can be numeric or symbolic ('first' and 'last')",
                                                "isalias": 0,
                                                "aliases": [],
                                                "settable": 1,
                                                "attachable": 0,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "type": "symbol",
                                                "defaultValue": "-",
                                                "label": "Display Order",
                                                "displayorder": 13
                                            },
                                            "sendinit": {
                                                "attrOrProp": 2,
                                                "digest": "Send initial value",
                                                "isalias": 0,
                                                "aliases": [],
                                                "settable": 1,
                                                "attachable": 0,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "type": "bool",
                                                "defaultValue": "true",
                                                "label": "Send Init",
                                                "displayorder": 4
                                            },
                                            "ctlin": {
                                                "attrOrProp": 2,
                                                "digest": "MIDI controller number to control this parameter.",
                                                "isalias": 0,
                                                "aliases": [],
                                                "settable": 1,
                                                "attachable": 0,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "type": "number",
                                                "defaultValue": "-1",
                                                "label": "MIDI Controller Number.",
                                                "displayorder": 16
                                            },
                                            "meta": {
                                                "attrOrProp": 2,
                                                "digest": "A JSON formatted string containing metadata for use by the exported code",
                                                "isalias": 0,
                                                "aliases": [],
                                                "settable": 1,
                                                "attachable": 0,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "type": "symbol",
                                                "defaultValue": "",
                                                "label": "Metadata",
                                                "displayorder": 17
                                            },
                                            "nopreset": {
                                                "attrOrProp": 2,
                                                "digest": "Do not add this value to the preset [DEPRECATED - USE @preset 0 instead].",
                                                "isalias": 0,
                                                "aliases": [],
                                                "settable": 1,
                                                "attachable": 0,
                                                "isparam": 0,
                                                "deprecated": 1,
                                                "touched": 0,
                                                "type": "bool",
                                                "defaultValue": "false"
                                            },
                                            "preset": {
                                                "attrOrProp": 2,
                                                "digest": "Add this value to the preset.",
                                                "isalias": 0,
                                                "aliases": [],
                                                "settable": 1,
                                                "attachable": 0,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "type": "bool",
                                                "defaultValue": "true",
                                                "label": "Include In Preset",
                                                "displayorder": 11
                                            }
                                        },
                                        "inputs": [
                                            {
                                                "name": "value",
                                                "type": "number",
                                                "digest": "Parameter value",
                                                "defaultarg": 2,
                                                "hot": 1,
                                                "docked": 0
                                            },
                                            {
                                                "name": "normalizedvalue",
                                                "type": "number",
                                                "digest": "Set value normalized. ",
                                                "docked": 0
                                            }
                                        ],
                                        "outputs": [
                                            {
                                                "name": "value",
                                                "type": "number",
                                                "digest": "Parameter value",
                                                "defaultarg": 2,
                                                "hot": 1,
                                                "docked": 0
                                            },
                                            {
                                                "name": "normalized",
                                                "type": "number",
                                                "digest": "Normalized parameter value.",
                                                "docked": 0
                                            }
                                        ],
                                        "helpname": "param",
                                        "aliasOf": "param",
                                        "classname": "param",
                                        "operator": 0,
                                        "versionId": -1661410411,
                                        "changesPatcherIO": 0
                                    },
                                    "text": "param mode",
                                    "varname": "mode"
                                }
                            },
                            {
                                "box": {
                                    "id": "obj-5",
                                    "maxclass": "newobj",
                                    "numinlets": 2,
                                    "numoutlets": 2,
                                    "outlettype": [ "", "" ],
                                    "patching_rect": [ 340.0, 60.0, 72.0, 23.0 ],
                                    "rnbo_classname": "param",
                                    "rnbo_extra_attributes": {
                                        "meta": "",
                                        "tonormalized": "",
                                        "ctlin": 3.0,
                                        "maximum": 100.0,
                                        "enum": "",
                                        "fromnormalized": "",
                                        "minimum": -100.0,
                                        "steps": 0.0,
                                        "unit": "%",
                                        "order": "3",
                                        "displayorder": "-",
                                        "preset": 1,
                                        "displayname": "Slope",
                                        "sendinit": 1,
                                        "exponent": 1.0
                                    },
                                    "rnbo_serial": 4,
                                    "rnbo_uniqueid": "slope",
                                    "rnboinfo": {
                                        "needsInstanceInfo": 1,
                                        "argnames": {
                                            "value": {
                                                "attrOrProp": 1,
                                                "digest": "Parameter value",
                                                "defaultarg": 2,
                                                "isalias": 0,
                                                "aliases": [],
                                                "settable": 1,
                                                "attachable": 0,
                                                "isparam": 1,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "inlet": 1,
                                                "type": "number",
                                                "defaultValue": "0"
                                            },
                                            "normalizedvalue": {
                                                "attrOrProp": 1,
                                                "digest": "Set value normalized. ",
                                                "isalias": 0,
                                                "aliases": [],
                                                "attachable": 0,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "inlet": 1,
                                                "type": "number"
                                            },
                                            "reset": {
                                                "attrOrProp": 1,
                                                "digest": "Reset param to initial value",
                                                "isalias": 0,
                                                "aliases": [],
                                                "attachable": 1,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "type": "bang"
                                            },
                                            "normalized": {
                                                "attrOrProp": 1,
                                                "digest": "Normalized parameter value.",
                                                "isalias": 0,
                                                "aliases": [],
                                                "attachable": 0,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "outlet": 1,
                                                "type": "number"
                                            },
                                            "name": {
                                                "attrOrProp": 2,
                                                "digest": "Name of the parameter",
                                                "defaultarg": 1,
                                                "isalias": 0,
                                                "aliases": [],
                                                "settable": 1,
                                                "attachable": 0,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "type": "symbol",
                                                "label": "Parameter Name",
                                                "mandatory": 1
                                            },
                                            "enum": {
                                                "attrOrProp": 2,
                                                "digest": "Use an enumerated output",
                                                "isalias": 0,
                                                "aliases": [],
                                                "settable": 1,
                                                "attachable": 0,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "type": "list",
                                                "label": "Enum Values",
                                                "displayorder": 6
                                            },
                                            "minimum": {
                                                "attrOrProp": 2,
                                                "digest": "Minimum value",
                                                "isalias": 0,
                                                "aliases": [ "min" ],
                                                "settable": 1,
                                                "attachable": 0,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "type": "number",
                                                "defaultValue": "0",
                                                "label": "Minimum",
                                                "displayorder": 1
                                            },
                                            "min": {
                                                "attrOrProp": 2,
                                                "digest": "Minimum value",
                                                "isalias": 1,
                                                "aliasOf": "minimum",
                                                "aliases": [],
                                                "settable": 1,
                                                "attachable": 0,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "type": "number",
                                                "defaultValue": "0",
                                                "label": "Minimum",
                                                "displayorder": 1
                                            },
                                            "maximum": {
                                                "attrOrProp": 2,
                                                "digest": "Maximum value",
                                                "isalias": 0,
                                                "aliases": [ "max" ],
                                                "settable": 1,
                                                "attachable": 0,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "type": "number",
                                                "defaultValue": "1",
                                                "label": "Maximum",
                                                "displayorder": 2
                                            },
                                            "max": {
                                                "attrOrProp": 2,
                                                "digest": "Maximum value",
                                                "isalias": 1,
                                                "aliasOf": "maximum",
                                                "aliases": [],
                                                "settable": 1,
                                                "attachable": 0,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "type": "number",
                                                "defaultValue": "1",
                                                "label": "Maximum",
                                                "displayorder": 2
                                            },
                                            "exponent": {
                                                "attrOrProp": 2,
                                                "digest": "Scale values exponentially",
                                                "isalias": 0,
                                                "aliases": [],
                                                "settable": 1,
                                                "attachable": 0,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "type": "number",
                                                "defaultValue": "1",
                                                "label": "Exponent",
                                                "displayorder": 7
                                            },
                                            "steps": {
                                                "attrOrProp": 2,
                                                "digest": "Divide the output into a number of discrete steps",
                                                "isalias": 0,
                                                "aliases": [],
                                                "settable": 1,
                                                "attachable": 0,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "type": "number",
                                                "defaultValue": "0",
                                                "label": "Steps",
                                                "displayorder": 8
                                            },
                                            "displayName": {
                                                "attrOrProp": 2,
                                                "digest": "DEPRECATED: Use the lower case 'displayname' instead",
                                                "isalias": 0,
                                                "aliases": [],
                                                "settable": 1,
                                                "attachable": 0,
                                                "isparam": 0,
                                                "deprecated": 1,
                                                "touched": 0,
                                                "type": "symbol",
                                                "label": "Display Name"
                                            },
                                            "displayname": {
                                                "attrOrProp": 2,
                                                "digest": "A more readable name for the parameter in an external RNBO target",
                                                "isalias": 0,
                                                "aliases": [],
                                                "settable": 1,
                                                "attachable": 0,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "type": "symbol",
                                                "defaultValue": "",
                                                "label": "Display Name",
                                                "displayorder": 14
                                            },
                                            "unit": {
                                                "attrOrProp": 2,
                                                "digest": "A symbol to describe the unit of the parameter in an external RNBO target",
                                                "isalias": 0,
                                                "aliases": [],
                                                "settable": 1,
                                                "attachable": 0,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "type": "symbol",
                                                "defaultValue": "",
                                                "label": "Unit",
                                                "displayorder": 15
                                            },
                                            "tonormalized": {
                                                "attrOrProp": 2,
                                                "digest": "Converts a real parameter value to its normalized form",
                                                "isalias": 0,
                                                "aliases": [],
                                                "settable": 1,
                                                "attachable": 0,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "type": "symbol",
                                                "label": "To Normalized Expression",
                                                "displayorder": 10
                                            },
                                            "fromnormalized": {
                                                "attrOrProp": 2,
                                                "digest": "Converts a normalized parameter into its actual parameter value",
                                                "isalias": 0,
                                                "aliases": [],
                                                "settable": 1,
                                                "attachable": 0,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "type": "symbol",
                                                "label": "From Normalized Expression",
                                                "displayorder": 9
                                            },
                                            "order": {
                                                "attrOrProp": 2,
                                                "digest": "Order in which initial parameter values will be sent out on patcher load. The order can be numeric or symbolic ('first' and 'last')",
                                                "isalias": 0,
                                                "aliases": [],
                                                "settable": 1,
                                                "attachable": 0,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "type": "symbol",
                                                "defaultValue": "0",
                                                "label": "Restore Order",
                                                "displayorder": 12
                                            },
                                            "displayorder": {
                                                "attrOrProp": 2,
                                                "digest": "Order in which parameters will show up in a list of all parameters. The order can be numeric or symbolic ('first' and 'last')",
                                                "isalias": 0,
                                                "aliases": [],
                                                "settable": 1,
                                                "attachable": 0,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "type": "symbol",
                                                "defaultValue": "-",
                                                "label": "Display Order",
                                                "displayorder": 13
                                            },
                                            "sendinit": {
                                                "attrOrProp": 2,
                                                "digest": "Send initial value",
                                                "isalias": 0,
                                                "aliases": [],
                                                "settable": 1,
                                                "attachable": 0,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "type": "bool",
                                                "defaultValue": "true",
                                                "label": "Send Init",
                                                "displayorder": 4
                                            },
                                            "ctlin": {
                                                "attrOrProp": 2,
                                                "digest": "MIDI controller number to control this parameter.",
                                                "isalias": 0,
                                                "aliases": [],
                                                "settable": 1,
                                                "attachable": 0,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "type": "number",
                                                "defaultValue": "-1",
                                                "label": "MIDI Controller Number.",
                                                "displayorder": 16
                                            },
                                            "meta": {
                                                "attrOrProp": 2,
                                                "digest": "A JSON formatted string containing metadata for use by the exported code",
                                                "isalias": 0,
                                                "aliases": [],
                                                "settable": 1,
                                                "attachable": 0,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "type": "symbol",
                                                "defaultValue": "",
                                                "label": "Metadata",
                                                "displayorder": 17
                                            },
                                            "nopreset": {
                                                "attrOrProp": 2,
                                                "digest": "Do not add this value to the preset [DEPRECATED - USE @preset 0 instead].",
                                                "isalias": 0,
                                                "aliases": [],
                                                "settable": 1,
                                                "attachable": 0,
                                                "isparam": 0,
                                                "deprecated": 1,
                                                "touched": 0,
                                                "type": "bool",
                                                "defaultValue": "false"
                                            },
                                            "preset": {
                                                "attrOrProp": 2,
                                                "digest": "Add this value to the preset.",
                                                "isalias": 0,
                                                "aliases": [],
                                                "settable": 1,
                                                "attachable": 0,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "type": "bool",
                                                "defaultValue": "true",
                                                "label": "Include In Preset",
                                                "displayorder": 11
                                            }
                                        },
                                        "inputs": [
                                            {
                                                "name": "value",
                                                "type": "number",
                                                "digest": "Parameter value",
                                                "defaultarg": 2,
                                                "hot": 1,
                                                "docked": 0
                                            },
                                            {
                                                "name": "normalizedvalue",
                                                "type": "number",
                                                "digest": "Set value normalized. ",
                                                "docked": 0
                                            }
                                        ],
                                        "outputs": [
                                            {
                                                "name": "value",
                                                "type": "number",
                                                "digest": "Parameter value",
                                                "defaultarg": 2,
                                                "hot": 1,
                                                "docked": 0
                                            },
                                            {
                                                "name": "normalized",
                                                "type": "number",
                                                "digest": "Normalized parameter value.",
                                                "docked": 0
                                            }
                                        ],
                                        "helpname": "param",
                                        "aliasOf": "param",
                                        "classname": "param",
                                        "operator": 0,
                                        "versionId": -1661410411,
                                        "changesPatcherIO": 0
                                    },
                                    "text": "param slope",
                                    "varname": "slope"
                                }
                            },
                            {
                                "box": {
                                    "id": "obj-13",
                                    "maxclass": "newobj",
                                    "numinlets": 2,
                                    "numoutlets": 2,
                                    "outlettype": [ "signal", "" ],
                                    "patching_rect": [ 340.0, 230.0, 69.0, 23.0 ],
                                    "rnbo_classname": "fade~",
                                    "rnbo_serial": 2,
                                    "rnbo_uniqueid": "fade~_obj-13",
                                    "rnboinfo": {
                                        "needsInstanceInfo": 1,
                                        "argnames": {
                                            "segments": {
                                                "attrOrProp": 1,
                                                "digest": "Target value or target value/ramp time pairs",
                                                "isalias": 0,
                                                "aliases": [ "dest" ],
                                                "settable": 1,
                                                "attachable": 0,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "inlet": 1,
                                                "type": "list",
                                                "defaultValue": ""
                                            },
                                            "dest": {
                                                "attrOrProp": 1,
                                                "digest": "Target value or target value/ramp time pairs",
                                                "isalias": 1,
                                                "aliasOf": "segments",
                                                "aliases": [],
                                                "settable": 1,
                                                "attachable": 0,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "inlet": 1,
                                                "type": "list",
                                                "defaultValue": ""
                                            },
                                            "time": {
                                                "attrOrProp": 1,
                                                "digest": "Ramp time",
                                                "defaultarg": 2,
                                                "isalias": 0,
                                                "aliases": [],
                                                "settable": 1,
                                                "attachable": 0,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "inlet": 1,
                                                "type": "number",
                                                "defaultValue": "0"
                                            },
                                            "keepramp": {
                                                "attrOrProp": 1,
                                                "digest": "Keep last ramp",
                                                "isalias": 0,
                                                "aliases": [],
                                                "settable": 1,
                                                "attachable": 1,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "type": "bool",
                                                "defaultValue": "false"
                                            },
                                            "out": {
                                                "attrOrProp": 1,
                                                "digest": "Ramp out",
                                                "isalias": 0,
                                                "aliases": [],
                                                "settable": 0,
                                                "attachable": 0,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "outlet": 1,
                                                "type": "signal"
                                            },
                                            "target": {
                                                "attrOrProp": 1,
                                                "digest": "Bang when ramp has finished",
                                                "isalias": 0,
                                                "aliases": [],
                                                "settable": 0,
                                                "attachable": 0,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "outlet": 1,
                                                "type": "bang"
                                            },
                                            "value": {
                                                "attrOrProp": 2,
                                                "digest": "Initial value.",
                                                "defaultarg": 1,
                                                "isalias": 0,
                                                "aliases": [],
                                                "settable": 1,
                                                "attachable": 0,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "type": "number",
                                                "defaultValue": "0"
                                            }
                                        },
                                        "inputs": [
                                            {
                                                "name": "segments",
                                                "type": "list",
                                                "digest": "Target value or target value/ramp time pairs",
                                                "hot": 1,
                                                "docked": 0
                                            },
                                            {
                                                "name": "time",
                                                "type": "number",
                                                "digest": "Ramp time",
                                                "defaultarg": 2,
                                                "docked": 0
                                            }
                                        ],
                                        "outputs": [
                                            {
                                                "name": "out",
                                                "type": "signal",
                                                "digest": "Ramp out",
                                                "docked": 0
                                            },
                                            {
                                                "name": "target",
                                                "type": "bang",
                                                "digest": "Bang when ramp has finished",
                                                "docked": 0
                                            }
                                        ],
                                        "helpname": "line~",
                                        "aliasOf": "line~",
                                        "classname": "fade~",
                                        "operator": 0,
                                        "versionId": 2134689829,
                                        "changesPatcherIO": 0
                                    },
                                    "text": "fade~ 0. 10"
                                }
                            },
                            {
                                "box": {
                                    "id": "obj-15",
                                    "maxclass": "newobj",
                                    "numinlets": 1,
                                    "numoutlets": 0,
                                    "patching_rect": [ 260.0, 740.0, 43.0, 23.0 ],
                                    "rnbo_classname": "out~",
                                    "rnbo_extra_attributes": {
                                        "meta": "",
                                        "comment": ""
                                    },
                                    "rnbo_serial": 1,
                                    "rnbo_uniqueid": "out~_obj-15",
                                    "rnboinfo": {
                                        "needsInstanceInfo": 1,
                                        "argnames": {
                                            "in1": {
                                                "attrOrProp": 1,
                                                "digest": "signal sent to outlet with index 3",
                                                "isalias": 0,
                                                "aliases": [],
                                                "settable": 0,
                                                "attachable": 0,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "inlet": 1,
                                                "type": "signal"
                                            },
                                            "index": {
                                                "attrOrProp": 2,
                                                "digest": "outlet number",
                                                "defaultarg": 1,
                                                "isalias": 0,
                                                "aliases": [],
                                                "settable": 1,
                                                "attachable": 0,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "type": "number",
                                                "mandatory": 1
                                            },
                                            "comment": {
                                                "attrOrProp": 2,
                                                "digest": "mouse over comment",
                                                "isalias": 0,
                                                "aliases": [],
                                                "settable": 1,
                                                "attachable": 0,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "type": "symbol"
                                            },
                                            "meta": {
                                                "attrOrProp": 2,
                                                "digest": "A JSON formatted string containing metadata for use by the exported code",
                                                "isalias": 0,
                                                "aliases": [],
                                                "settable": 1,
                                                "attachable": 0,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "type": "symbol",
                                                "defaultValue": "",
                                                "label": "Metadata",
                                                "displayorder": 3
                                            }
                                        },
                                        "inputs": [
                                            {
                                                "name": "in1",
                                                "type": "signal",
                                                "digest": "signal sent to outlet with index 3",
                                                "displayName": "",
                                                "hot": 1,
                                                "docked": 0
                                            }
                                        ],
                                        "outputs": [],
                                        "helpname": "out~",
                                        "aliasOf": "out~",
                                        "classname": "out~",
                                        "operator": 0,
                                        "versionId": 1989326771,
                                        "changesPatcherIO": 1
                                    },
                                    "text": "out~ 3"
                                }
                            },
                            {
                                "box": {
                                    "id": "obj-124",
                                    "maxclass": "newobj",
                                    "numinlets": 3,
                                    "numoutlets": 1,
                                    "outlettype": [ "signal" ],
                                    "patching_rect": [ 260.0, 680.0, 59.0, 23.0 ],
                                    "rnbo_classname": "clip~",
                                    "rnbo_serial": 1,
                                    "rnbo_uniqueid": "clip~_obj-124",
                                    "text": "clip~ 0. 1."
                                }
                            },
                            {
                                "box": {
                                    "id": "obj-90",
                                    "maxclass": "newobj",
                                    "numinlets": 2,
                                    "numoutlets": 1,
                                    "outlettype": [ "signal" ],
                                    "patching_rect": [ 280.0, 582.0, 40.0, 23.0 ],
                                    "rnbo_classname": "*~",
                                    "rnbo_serial": 3,
                                    "rnbo_uniqueid": "*~_obj-90",
                                    "text": "*~ 0.5"
                                }
                            },
                            {
                                "box": {
                                    "id": "obj-89",
                                    "maxclass": "newobj",
                                    "numinlets": 2,
                                    "numoutlets": 1,
                                    "outlettype": [ "signal" ],
                                    "patching_rect": [ 90.0, 270.0, 30.0, 23.0 ],
                                    "rnbo_classname": "-~",
                                    "rnbo_serial": 1,
                                    "rnbo_uniqueid": "-~_obj-89",
                                    "text": "-~ 1"
                                }
                            },
                            {
                                "box": {
                                    "id": "obj-88",
                                    "maxclass": "newobj",
                                    "numinlets": 2,
                                    "numoutlets": 1,
                                    "outlettype": [ "signal" ],
                                    "patching_rect": [ 90.0, 240.0, 31.0, 23.0 ],
                                    "rnbo_classname": "*~",
                                    "rnbo_serial": 4,
                                    "rnbo_uniqueid": "*~_obj-88",
                                    "text": "*~ 2"
                                }
                            },
                            {
                                "box": {
                                    "id": "obj-83",
                                    "linecount": 2,
                                    "maxclass": "newobj",
                                    "numinlets": 6,
                                    "numoutlets": 1,
                                    "outlettype": [ "" ],
                                    "patching_rect": [ 340.0, 150.0, 90.0, 37.0 ],
                                    "rnbo_classname": "scale",
                                    "rnbo_serial": 2,
                                    "rnbo_uniqueid": "scale_obj-83",
                                    "text": "scale -100. 100. -0.9 0.9 1."
                                }
                            },
                            {
                                "box": {
                                    "id": "obj-84",
                                    "maxclass": "flonum",
                                    "maximum": 1.0,
                                    "minimum": -1.0,
                                    "numinlets": 1,
                                    "numoutlets": 2,
                                    "outlettype": [ "", "bang" ],
                                    "parameter_enable": 0,
                                    "patching_rect": [ 340.0, 200.0, 50.0, 23.0 ],
                                    "rnbo_classname": "number",
                                    "rnbo_extra_attributes": {
                                        "maximum": 1.0,
                                        "initialFormat": "float",
                                        "minimum": -1.0,
                                        "order": "",
                                        "preset": 0
                                    },
                                    "rnbo_serial": 5,
                                    "rnbo_uniqueid": "number_obj-84"
                                }
                            },
                            {
                                "box": {
                                    "id": "obj-79",
                                    "maxclass": "newobj",
                                    "numinlets": 2,
                                    "numoutlets": 2,
                                    "outlettype": [ "signal", "" ],
                                    "patching_rect": [ 70.0, 180.0, 69.0, 23.0 ],
                                    "rnbo_classname": "fade~",
                                    "rnbo_serial": 3,
                                    "rnbo_uniqueid": "fade~_obj-79",
                                    "rnboinfo": {
                                        "needsInstanceInfo": 1,
                                        "argnames": {
                                            "segments": {
                                                "attrOrProp": 1,
                                                "digest": "Target value or target value/ramp time pairs",
                                                "isalias": 0,
                                                "aliases": [ "dest" ],
                                                "settable": 1,
                                                "attachable": 0,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "inlet": 1,
                                                "type": "list",
                                                "defaultValue": ""
                                            },
                                            "dest": {
                                                "attrOrProp": 1,
                                                "digest": "Target value or target value/ramp time pairs",
                                                "isalias": 1,
                                                "aliasOf": "segments",
                                                "aliases": [],
                                                "settable": 1,
                                                "attachable": 0,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "inlet": 1,
                                                "type": "list",
                                                "defaultValue": ""
                                            },
                                            "time": {
                                                "attrOrProp": 1,
                                                "digest": "Ramp time",
                                                "defaultarg": 2,
                                                "isalias": 0,
                                                "aliases": [],
                                                "settable": 1,
                                                "attachable": 0,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "inlet": 1,
                                                "type": "number",
                                                "defaultValue": "0"
                                            },
                                            "keepramp": {
                                                "attrOrProp": 1,
                                                "digest": "Keep last ramp",
                                                "isalias": 0,
                                                "aliases": [],
                                                "settable": 1,
                                                "attachable": 1,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "type": "bool",
                                                "defaultValue": "false"
                                            },
                                            "out": {
                                                "attrOrProp": 1,
                                                "digest": "Ramp out",
                                                "isalias": 0,
                                                "aliases": [],
                                                "settable": 0,
                                                "attachable": 0,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "outlet": 1,
                                                "type": "signal"
                                            },
                                            "target": {
                                                "attrOrProp": 1,
                                                "digest": "Bang when ramp has finished",
                                                "isalias": 0,
                                                "aliases": [],
                                                "settable": 0,
                                                "attachable": 0,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "outlet": 1,
                                                "type": "bang"
                                            },
                                            "value": {
                                                "attrOrProp": 2,
                                                "digest": "Initial value.",
                                                "defaultarg": 1,
                                                "isalias": 0,
                                                "aliases": [],
                                                "settable": 1,
                                                "attachable": 0,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "type": "number",
                                                "defaultValue": "0"
                                            }
                                        },
                                        "inputs": [
                                            {
                                                "name": "segments",
                                                "type": "list",
                                                "digest": "Target value or target value/ramp time pairs",
                                                "hot": 1,
                                                "docked": 0
                                            },
                                            {
                                                "name": "time",
                                                "type": "number",
                                                "digest": "Ramp time",
                                                "defaultarg": 2,
                                                "docked": 0
                                            }
                                        ],
                                        "outputs": [
                                            {
                                                "name": "out",
                                                "type": "signal",
                                                "digest": "Ramp out",
                                                "docked": 0
                                            },
                                            {
                                                "name": "target",
                                                "type": "bang",
                                                "digest": "Bang when ramp has finished",
                                                "docked": 0
                                            }
                                        ],
                                        "helpname": "line~",
                                        "aliasOf": "line~",
                                        "classname": "fade~",
                                        "operator": 0,
                                        "versionId": 2134689829,
                                        "changesPatcherIO": 0
                                    },
                                    "text": "fade~ 1. 10"
                                }
                            },
                            {
                                "box": {
                                    "id": "obj-75",
                                    "maxclass": "newobj",
                                    "numinlets": 2,
                                    "numoutlets": 1,
                                    "outlettype": [ "signal" ],
                                    "patching_rect": [ 380.0, 310.0, 33.0, 23.0 ],
                                    "rnbo_classname": "!-~",
                                    "rnbo_serial": 1,
                                    "rnbo_uniqueid": "!-~_obj-75",
                                    "text": "!-~ 1"
                                }
                            },
                            {
                                "box": {
                                    "id": "obj-76",
                                    "maxclass": "newobj",
                                    "numinlets": 2,
                                    "numoutlets": 1,
                                    "outlettype": [ "signal" ],
                                    "patching_rect": [ 340.0, 310.0, 31.0, 23.0 ],
                                    "rnbo_classname": "*~",
                                    "rnbo_serial": 5,
                                    "rnbo_uniqueid": "*~_obj-76",
                                    "text": "*~ 2"
                                }
                            },
                            {
                                "box": {
                                    "id": "obj-77",
                                    "maxclass": "newobj",
                                    "numinlets": 2,
                                    "numoutlets": 1,
                                    "outlettype": [ "signal" ],
                                    "patching_rect": [ 340.0, 360.0, 29.5, 23.0 ],
                                    "rnbo_classname": "/~",
                                    "rnbo_serial": 1,
                                    "rnbo_uniqueid": "/~_obj-77",
                                    "text": "/~"
                                }
                            },
                            {
                                "box": {
                                    "id": "obj-67",
                                    "maxclass": "newobj",
                                    "numinlets": 2,
                                    "numoutlets": 1,
                                    "outlettype": [ "signal" ],
                                    "patching_rect": [ 280.0, 550.0, 32.0, 23.0 ],
                                    "rnbo_classname": "+~",
                                    "rnbo_serial": 1,
                                    "rnbo_uniqueid": "+~_obj-67",
                                    "text": "+~ 1"
                                }
                            },
                            {
                                "box": {
                                    "id": "obj-69",
                                    "maxclass": "newobj",
                                    "numinlets": 1,
                                    "numoutlets": 1,
                                    "outlettype": [ "signal" ],
                                    "patching_rect": [ 300.0, 360.0, 33.0, 23.0 ],
                                    "rnbo_classname": "abs~",
                                    "rnbo_serial": 1,
                                    "rnbo_uniqueid": "abs~_obj-69",
                                    "text": "abs~"
                                }
                            },
                            {
                                "box": {
                                    "id": "obj-70",
                                    "maxclass": "newobj",
                                    "numinlets": 2,
                                    "numoutlets": 1,
                                    "outlettype": [ "signal" ],
                                    "patching_rect": [ 300.0, 410.0, 29.5, 23.0 ],
                                    "rnbo_classname": "*~",
                                    "rnbo_serial": 6,
                                    "rnbo_uniqueid": "*~_obj-70",
                                    "text": "*~"
                                }
                            },
                            {
                                "box": {
                                    "id": "obj-71",
                                    "maxclass": "newobj",
                                    "numinlets": 2,
                                    "numoutlets": 1,
                                    "outlettype": [ "signal" ],
                                    "patching_rect": [ 340.0, 410.0, 32.0, 23.0 ],
                                    "rnbo_classname": "+~",
                                    "rnbo_serial": 2,
                                    "rnbo_uniqueid": "+~_obj-71",
                                    "text": "+~ 1"
                                }
                            },
                            {
                                "box": {
                                    "id": "obj-72",
                                    "maxclass": "newobj",
                                    "numinlets": 2,
                                    "numoutlets": 1,
                                    "outlettype": [ "signal" ],
                                    "patching_rect": [ 300.0, 460.0, 32.0, 23.0 ],
                                    "rnbo_classname": "+~",
                                    "rnbo_serial": 3,
                                    "rnbo_uniqueid": "+~_obj-72",
                                    "text": "+~ 1"
                                }
                            },
                            {
                                "box": {
                                    "id": "obj-73",
                                    "maxclass": "newobj",
                                    "numinlets": 2,
                                    "numoutlets": 1,
                                    "outlettype": [ "signal" ],
                                    "patching_rect": [ 260.0, 510.0, 29.5, 23.0 ],
                                    "rnbo_classname": "/~",
                                    "rnbo_serial": 2,
                                    "rnbo_uniqueid": "/~_obj-73",
                                    "text": "/~"
                                }
                            },
                            {
                                "box": {
                                    "id": "obj-74",
                                    "maxclass": "newobj",
                                    "numinlets": 2,
                                    "numoutlets": 1,
                                    "outlettype": [ "signal" ],
                                    "patching_rect": [ 260.0, 460.0, 29.5, 23.0 ],
                                    "rnbo_classname": "*~",
                                    "rnbo_serial": 7,
                                    "rnbo_uniqueid": "*~_obj-74",
                                    "text": "*~"
                                }
                            },
                            {
                                "box": {
                                    "id": "obj-47",
                                    "maxclass": "flonum",
                                    "numinlets": 1,
                                    "numoutlets": 2,
                                    "outlettype": [ "", "bang" ],
                                    "parameter_enable": 0,
                                    "patching_rect": [ 70.0, 150.0, 50.0, 23.0 ],
                                    "rnbo_classname": "number",
                                    "rnbo_extra_attributes": {
                                        "maximum": "<none>",
                                        "initialFormat": "float",
                                        "minimum": "<none>",
                                        "order": "",
                                        "preset": 0
                                    },
                                    "rnbo_serial": 6,
                                    "rnbo_uniqueid": "number_obj-47"
                                }
                            },
                            {
                                "box": {
                                    "id": "obj-46",
                                    "maxclass": "newobj",
                                    "numinlets": 6,
                                    "numoutlets": 1,
                                    "outlettype": [ "" ],
                                    "patching_rect": [ 70.0, 120.0, 113.0, 23.0 ],
                                    "rnbo_classname": "scale",
                                    "rnbo_serial": 3,
                                    "rnbo_uniqueid": "scale_obj-46",
                                    "text": "scale 0. 100. 0. 1. 1."
                                }
                            },
                            {
                                "box": {
                                    "id": "obj-4",
                                    "maxclass": "newobj",
                                    "numinlets": 1,
                                    "numoutlets": 0,
                                    "patching_rect": [ 120.0, 740.0, 43.0, 23.0 ],
                                    "rnbo_classname": "out~",
                                    "rnbo_extra_attributes": {
                                        "meta": "",
                                        "comment": ""
                                    },
                                    "rnbo_serial": 2,
                                    "rnbo_uniqueid": "out~_obj-4",
                                    "rnboinfo": {
                                        "needsInstanceInfo": 1,
                                        "argnames": {
                                            "in1": {
                                                "attrOrProp": 1,
                                                "digest": "signal sent to outlet with index 2",
                                                "isalias": 0,
                                                "aliases": [],
                                                "settable": 0,
                                                "attachable": 0,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "inlet": 1,
                                                "type": "signal"
                                            },
                                            "index": {
                                                "attrOrProp": 2,
                                                "digest": "outlet number",
                                                "defaultarg": 1,
                                                "isalias": 0,
                                                "aliases": [],
                                                "settable": 1,
                                                "attachable": 0,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "type": "number",
                                                "mandatory": 1
                                            },
                                            "comment": {
                                                "attrOrProp": 2,
                                                "digest": "mouse over comment",
                                                "isalias": 0,
                                                "aliases": [],
                                                "settable": 1,
                                                "attachable": 0,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "type": "symbol"
                                            },
                                            "meta": {
                                                "attrOrProp": 2,
                                                "digest": "A JSON formatted string containing metadata for use by the exported code",
                                                "isalias": 0,
                                                "aliases": [],
                                                "settable": 1,
                                                "attachable": 0,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "type": "symbol",
                                                "defaultValue": "",
                                                "label": "Metadata",
                                                "displayorder": 3
                                            }
                                        },
                                        "inputs": [
                                            {
                                                "name": "in1",
                                                "type": "signal",
                                                "digest": "signal sent to outlet with index 2",
                                                "displayName": "",
                                                "hot": 1,
                                                "docked": 0
                                            }
                                        ],
                                        "outputs": [],
                                        "helpname": "out~",
                                        "aliasOf": "out~",
                                        "classname": "out~",
                                        "operator": 0,
                                        "versionId": 1989326771,
                                        "changesPatcherIO": 1
                                    },
                                    "text": "out~ 2"
                                }
                            },
                            {
                                "box": {
                                    "id": "obj-3",
                                    "maxclass": "newobj",
                                    "numinlets": 1,
                                    "numoutlets": 0,
                                    "patching_rect": [ 70.0, 740.0, 43.0, 23.0 ],
                                    "rnbo_classname": "out~",
                                    "rnbo_extra_attributes": {
                                        "meta": "",
                                        "comment": ""
                                    },
                                    "rnbo_serial": 3,
                                    "rnbo_uniqueid": "out~_obj-3",
                                    "rnboinfo": {
                                        "needsInstanceInfo": 1,
                                        "argnames": {
                                            "in1": {
                                                "attrOrProp": 1,
                                                "digest": "signal sent to outlet with index 1",
                                                "isalias": 0,
                                                "aliases": [],
                                                "settable": 0,
                                                "attachable": 0,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "inlet": 1,
                                                "type": "signal"
                                            },
                                            "index": {
                                                "attrOrProp": 2,
                                                "digest": "outlet number",
                                                "defaultarg": 1,
                                                "isalias": 0,
                                                "aliases": [],
                                                "settable": 1,
                                                "attachable": 0,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "type": "number",
                                                "mandatory": 1
                                            },
                                            "comment": {
                                                "attrOrProp": 2,
                                                "digest": "mouse over comment",
                                                "isalias": 0,
                                                "aliases": [],
                                                "settable": 1,
                                                "attachable": 0,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "type": "symbol"
                                            },
                                            "meta": {
                                                "attrOrProp": 2,
                                                "digest": "A JSON formatted string containing metadata for use by the exported code",
                                                "isalias": 0,
                                                "aliases": [],
                                                "settable": 1,
                                                "attachable": 0,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "type": "symbol",
                                                "defaultValue": "",
                                                "label": "Metadata",
                                                "displayorder": 3
                                            }
                                        },
                                        "inputs": [
                                            {
                                                "name": "in1",
                                                "type": "signal",
                                                "digest": "signal sent to outlet with index 1",
                                                "displayName": "",
                                                "hot": 1,
                                                "docked": 0
                                            }
                                        ],
                                        "outputs": [],
                                        "helpname": "out~",
                                        "aliasOf": "out~",
                                        "classname": "out~",
                                        "operator": 0,
                                        "versionId": 1989326771,
                                        "changesPatcherIO": 1
                                    },
                                    "text": "out~ 1"
                                }
                            },
                            {
                                "box": {
                                    "id": "obj-2",
                                    "maxclass": "newobj",
                                    "numinlets": 0,
                                    "numoutlets": 1,
                                    "outlettype": [ "signal" ],
                                    "patching_rect": [ 120.0, 620.0, 35.0, 23.0 ],
                                    "rnbo_classname": "in~",
                                    "rnbo_extra_attributes": {
                                        "meta": "",
                                        "comment": ""
                                    },
                                    "rnbo_serial": 1,
                                    "rnbo_uniqueid": "in~_obj-2",
                                    "rnboinfo": {
                                        "needsInstanceInfo": 1,
                                        "argnames": {
                                            "out1": {
                                                "attrOrProp": 1,
                                                "digest": "signal from inlet with index 2",
                                                "isalias": 0,
                                                "aliases": [],
                                                "settable": 0,
                                                "attachable": 0,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "outlet": 1,
                                                "type": "signal"
                                            },
                                            "index": {
                                                "attrOrProp": 2,
                                                "digest": "inlet number",
                                                "defaultarg": 1,
                                                "isalias": 0,
                                                "aliases": [],
                                                "settable": 1,
                                                "attachable": 0,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "type": "number",
                                                "mandatory": 1
                                            },
                                            "comment": {
                                                "attrOrProp": 2,
                                                "digest": "mouse over comment",
                                                "isalias": 0,
                                                "aliases": [],
                                                "settable": 1,
                                                "attachable": 0,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "type": "symbol"
                                            },
                                            "meta": {
                                                "attrOrProp": 2,
                                                "digest": "A JSON formatted string containing metadata for use by the exported code",
                                                "isalias": 0,
                                                "aliases": [],
                                                "settable": 1,
                                                "attachable": 0,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "type": "symbol",
                                                "defaultValue": "",
                                                "label": "Metadata",
                                                "displayorder": 3
                                            }
                                        },
                                        "inputs": [],
                                        "outputs": [
                                            {
                                                "name": "out1",
                                                "type": "signal",
                                                "digest": "signal from inlet with index 2",
                                                "displayName": "",
                                                "docked": 0
                                            }
                                        ],
                                        "helpname": "in~",
                                        "aliasOf": "in~",
                                        "classname": "in~",
                                        "operator": 0,
                                        "versionId": -1654556303,
                                        "changesPatcherIO": 1
                                    },
                                    "text": "in~ 2"
                                }
                            },
                            {
                                "box": {
                                    "id": "obj-1",
                                    "maxclass": "newobj",
                                    "numinlets": 0,
                                    "numoutlets": 1,
                                    "outlettype": [ "signal" ],
                                    "patching_rect": [ 70.0, 620.0, 35.0, 23.0 ],
                                    "rnbo_classname": "in~",
                                    "rnbo_extra_attributes": {
                                        "meta": "",
                                        "comment": ""
                                    },
                                    "rnbo_serial": 2,
                                    "rnbo_uniqueid": "in~_obj-1",
                                    "rnboinfo": {
                                        "needsInstanceInfo": 1,
                                        "argnames": {
                                            "out1": {
                                                "attrOrProp": 1,
                                                "digest": "signal from inlet with index 1",
                                                "isalias": 0,
                                                "aliases": [],
                                                "settable": 0,
                                                "attachable": 0,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "outlet": 1,
                                                "type": "signal"
                                            },
                                            "index": {
                                                "attrOrProp": 2,
                                                "digest": "inlet number",
                                                "defaultarg": 1,
                                                "isalias": 0,
                                                "aliases": [],
                                                "settable": 1,
                                                "attachable": 0,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "type": "number",
                                                "mandatory": 1
                                            },
                                            "comment": {
                                                "attrOrProp": 2,
                                                "digest": "mouse over comment",
                                                "isalias": 0,
                                                "aliases": [],
                                                "settable": 1,
                                                "attachable": 0,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "type": "symbol"
                                            },
                                            "meta": {
                                                "attrOrProp": 2,
                                                "digest": "A JSON formatted string containing metadata for use by the exported code",
                                                "isalias": 0,
                                                "aliases": [],
                                                "settable": 1,
                                                "attachable": 0,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "type": "symbol",
                                                "defaultValue": "",
                                                "label": "Metadata",
                                                "displayorder": 3
                                            }
                                        },
                                        "inputs": [],
                                        "outputs": [
                                            {
                                                "name": "out1",
                                                "type": "signal",
                                                "digest": "signal from inlet with index 1",
                                                "displayName": "",
                                                "docked": 0
                                            }
                                        ],
                                        "helpname": "in~",
                                        "aliasOf": "in~",
                                        "classname": "in~",
                                        "operator": 0,
                                        "versionId": -1654556303,
                                        "changesPatcherIO": 1
                                    },
                                    "text": "in~ 1"
                                }
                            },
                            {
                                "box": {
                                    "background": 1,
                                    "bgcolor": [ 0.125, 0.125, 0.125, 1.0 ],
                                    "fontface": 1,
                                    "fontsize": 10.0,
                                    "hint": "To see the properties of a parameter, unlock the patcher, select a param object and click the Inspector button in the patcher toolbar ",
                                    "id": "obj-25",
                                    "maxclass": "comment",
                                    "numinlets": 1,
                                    "numoutlets": 0,
                                    "patching_rect": [ 670.0, 740.0, 45.0, 18.0 ],
                                    "saved_attribute_attributes": {
                                        "bgcolor": {
                                            "expression": "themecolor.theme_bgcolor"
                                        },
                                        "textcolor": {
                                            "expression": "themecolor.theme_textcolor_inverse"
                                        }
                                    },
                                    "text": "Params",
                                    "textcolor": [ 0.9, 0.9, 0.9, 1.0 ]
                                }
                            },
                            {
                                "box": {
                                    "background": 1,
                                    "fontface": 1,
                                    "fontsize": 10.0,
                                    "id": "obj-116",
                                    "maxclass": "comment",
                                    "numinlets": 1,
                                    "numoutlets": 0,
                                    "patching_rect": [ 570.0, 740.0, 29.0, 18.0 ],
                                    "text": "Tips"
                                }
                            },
                            {
                                "box": {
                                    "background": 1,
                                    "bgcolor": [ 0.125, 0.125, 0.125, 1.0 ],
                                    "fontface": 1,
                                    "fontsize": 10.0,
                                    "hint": "To copy some elements of the patch without including comments, unlock the patcher window and hit cmd-alt-L (Mac) / ctrl-opt-L (PC) to lock the patcher's background, then make your selection.",
                                    "id": "obj-16",
                                    "maxclass": "comment",
                                    "numinlets": 1,
                                    "numoutlets": 0,
                                    "patching_rect": [ 634.0, 740.0, 33.0, 18.0 ],
                                    "saved_attribute_attributes": {
                                        "bgcolor": {
                                            "expression": "themecolor.theme_bgcolor"
                                        },
                                        "textcolor": {
                                            "expression": "themecolor.theme_textcolor_inverse"
                                        }
                                    },
                                    "text": "Copy",
                                    "textcolor": [ 0.9, 0.9, 0.9, 1.0 ]
                                }
                            },
                            {
                                "box": {
                                    "background": 1,
                                    "bgcolor": [ 0.125, 0.125, 0.125, 1.0 ],
                                    "fontface": 1,
                                    "fontsize": 10.0,
                                    "hint": "Alt-click (Mac) / opt-click (PC) on an object box while the patcher is unlocked to view an object's help file.",
                                    "id": "obj-21",
                                    "maxclass": "comment",
                                    "numinlets": 1,
                                    "numoutlets": 0,
                                    "patching_rect": [ 600.0, 740.0, 30.0, 18.0 ],
                                    "saved_attribute_attributes": {
                                        "bgcolor": {
                                            "expression": "themecolor.theme_bgcolor"
                                        },
                                        "textcolor": {
                                            "expression": "themecolor.theme_textcolor_inverse"
                                        }
                                    },
                                    "text": "Help",
                                    "textcolor": [ 0.9, 0.9, 0.9, 1.0 ]
                                }
                            },
                            {
                                "box": {
                                    "background": 1,
                                    "fontface": 0,
                                    "fontname": "Lato",
                                    "fontsize": 10.0,
                                    "id": "obj-97",
                                    "maxclass": "comment",
                                    "numinlets": 1,
                                    "numoutlets": 0,
                                    "patching_rect": [ 600.0, 760.0, 111.0, 18.0 ],
                                    "text": "manuel@cycling74.com"
                                }
                            },
                            {
                                "box": {
                                    "background": 1,
                                    "id": "obj-48",
                                    "linecount": 10,
                                    "maxclass": "comment",
                                    "numinlets": 1,
                                    "numoutlets": 0,
                                    "patching_rect": [ 600.0, 440.0, 203.0, 150.0 ],
                                    "text": "The Mode parameter scales the volume ramp in two fashions: \"pow\" mode sets a ramp of 0 to 1 range, and \"comp\" mode sets a ramp of -1 to 1 range. The waveshaping algorithm above is designed to respond to both range types: pow mode produces a simple exponential curving while comp mode produces a bipolar exponential curving."
                                }
                            },
                            {
                                "box": {
                                    "background": 1,
                                    "fontface": 0,
                                    "id": "obj-40",
                                    "linecount": 9,
                                    "maxclass": "comment",
                                    "numinlets": 1,
                                    "numoutlets": 0,
                                    "patching_rect": [ 600.0, 230.0, 201.0, 136.0 ],
                                    "text": "The waveshaping patching (objects in yellow) is a direct form of a waveshaping algorithm found in Max's Gen examples, whose original DSP code is:\nx = in1 ; \t\t// -1..1\ncurve = in2 ; \t// -1..1\nk = 2 * curve / (1 - curve);\nout1 = (1 + k) * x / (1 + k * abs(x));"
                                }
                            },
                            {
                                "box": {
                                    "background": 1,
                                    "id": "obj-38",
                                    "linecount": 3,
                                    "maxclass": "comment",
                                    "numinlets": 1,
                                    "numoutlets": 0,
                                    "patching_rect": [ 475.0, 210.0, 105.0, 50.0 ],
                                    "text": "Toggles between exponential and \"S\"-like curves"
                                }
                            },
                            {
                                "box": {
                                    "background": 1,
                                    "id": "obj-37",
                                    "linecount": 2,
                                    "maxclass": "comment",
                                    "numinlets": 1,
                                    "numoutlets": 0,
                                    "patching_rect": [ 340.0, 20.0, 80.0, 35.0 ],
                                    "text": "Sharpens the volume fade"
                                }
                            },
                            {
                                "box": {
                                    "background": 1,
                                    "id": "obj-36",
                                    "linecount": 2,
                                    "maxclass": "comment",
                                    "numinlets": 1,
                                    "numoutlets": 0,
                                    "patching_rect": [ 200.0, 20.0, 91.0, 35.0 ],
                                    "text": "Smoothens the volume fade"
                                }
                            },
                            {
                                "box": {
                                    "background": 1,
                                    "id": "obj-33",
                                    "linecount": 2,
                                    "maxclass": "comment",
                                    "numinlets": 1,
                                    "numoutlets": 0,
                                    "patching_rect": [ 70.0, 20.0, 83.0, 35.0 ],
                                    "text": "Adjusts the global volume"
                                }
                            },
                            {
                                "box": {
                                    "background": 1,
                                    "fontface": 1,
                                    "id": "obj-23",
                                    "maxclass": "comment",
                                    "numinlets": 1,
                                    "numoutlets": 0,
                                    "patching_rect": [ 210.0, 380.0, 80.0, 21.0 ],
                                    "text": "Waveshaping"
                                }
                            },
                            {
                                "box": {
                                    "background": 1,
                                    "id": "obj-20",
                                    "maxclass": "comment",
                                    "numinlets": 1,
                                    "numoutlets": 0,
                                    "patching_rect": [ 320.0, 90.0, 20.0, 21.0 ],
                                    "text": "%"
                                }
                            },
                            {
                                "box": {
                                    "background": 1,
                                    "id": "obj-17",
                                    "maxclass": "comment",
                                    "numinlets": 1,
                                    "numoutlets": 0,
                                    "patching_rect": [ 247.0, 765.0, 72.0, 21.0 ],
                                    "text": "Volum ramp",
                                    "textjustification": 1
                                }
                            },
                            {
                                "box": {
                                    "background": 1,
                                    "id": "obj-8",
                                    "maxclass": "comment",
                                    "numinlets": 1,
                                    "numoutlets": 0,
                                    "patching_rect": [ 180.0, 90.0, 20.0, 21.0 ],
                                    "text": "%"
                                }
                            },
                            {
                                "box": {
                                    "background": 1,
                                    "id": "obj-6",
                                    "linecount": 2,
                                    "maxclass": "comment",
                                    "numinlets": 1,
                                    "numoutlets": 0,
                                    "patching_rect": [ 326.0, 614.0, 57.0, 35.0 ],
                                    "text": "Clickless selector"
                                }
                            },
                            {
                                "box": {
                                    "background": 1,
                                    "fontface": 0,
                                    "id": "obj-12",
                                    "linecount": 2,
                                    "maxclass": "comment",
                                    "numinlets": 1,
                                    "numoutlets": 0,
                                    "patching_rect": [ 473.0, 404.0, 104.0, 35.0 ],
                                    "text": "Forward to rnbo~ rightmost outlet"
                                }
                            },
                            {
                                "box": {
                                    "background": 1,
                                    "fontface": 0,
                                    "id": "obj-64",
                                    "linecount": 2,
                                    "maxclass": "comment",
                                    "numinlets": 1,
                                    "numoutlets": 0,
                                    "patching_rect": [ 460.0, 110.0, 104.0, 35.0 ],
                                    "text": "Forward to rnbo~ rightmost outlet"
                                }
                            },
                            {
                                "box": {
                                    "background": 1,
                                    "id": "obj-60",
                                    "linecount": 4,
                                    "maxclass": "comment",
                                    "numinlets": 1,
                                    "numoutlets": 0,
                                    "patching_rect": [ 600.0, 370.0, 202.0, 64.0 ],
                                    "text": "The curve coefficient above is controlled with the Slope parameter, which acts as a slope modifier for the fade curve."
                                }
                            },
                            {
                                "box": {
                                    "background": 1,
                                    "id": "obj-54",
                                    "linecount": 4,
                                    "maxclass": "comment",
                                    "numinlets": 1,
                                    "numoutlets": 0,
                                    "patching_rect": [ 214.0, 546.0, 54.0, 64.0 ],
                                    "text": "Map to [0. 1.] in comp mode"
                                }
                            },
                            {
                                "box": {
                                    "background": 1,
                                    "id": "obj-52",
                                    "linecount": 3,
                                    "maxclass": "comment",
                                    "numinlets": 1,
                                    "numoutlets": 0,
                                    "patching_rect": [ 330.0, 667.0, 110.0, 50.0 ],
                                    "text": "Clamp amplitude between 0. and 1. (just in case)"
                                }
                            },
                            {
                                "box": {
                                    "background": 1,
                                    "id": "obj-51",
                                    "maxclass": "comment",
                                    "numinlets": 1,
                                    "numoutlets": 0,
                                    "patching_rect": [ 30.0, 680.0, 36.0, 21.0 ],
                                    "text": "Scale",
                                    "textjustification": 1
                                }
                            },
                            {
                                "box": {
                                    "background": 1,
                                    "id": "obj-49",
                                    "linecount": 4,
                                    "maxclass": "comment",
                                    "numinlets": 1,
                                    "numoutlets": 0,
                                    "patching_rect": [ 130.0, 230.0, 53.0, 64.0 ],
                                    "text": "Map to [-1. 1.] in comp mode"
                                }
                            },
                            {
                                "box": {
                                    "background": 1,
                                    "fontface": 1,
                                    "id": "obj-27",
                                    "maxclass": "comment",
                                    "numinlets": 1,
                                    "numoutlets": 0,
                                    "patching_rect": [ 392.0, 90.0, 40.0, 21.0 ],
                                    "text": "Slope"
                                }
                            },
                            {
                                "box": {
                                    "background": 1,
                                    "id": "obj-26",
                                    "maxclass": "comment",
                                    "numinlets": 1,
                                    "numoutlets": 0,
                                    "patching_rect": [ 50.0, 90.0, 20.0, 21.0 ],
                                    "text": "%"
                                }
                            },
                            {
                                "box": {
                                    "background": 1,
                                    "fontface": 1,
                                    "id": "obj-43",
                                    "maxclass": "comment",
                                    "numinlets": 1,
                                    "numoutlets": 0,
                                    "patching_rect": [ 122.0, 90.0, 49.0, 21.0 ],
                                    "text": "Volume"
                                }
                            },
                            {
                                "box": {
                                    "background": 1,
                                    "fontface": 1,
                                    "id": "obj-34",
                                    "maxclass": "comment",
                                    "numinlets": 1,
                                    "numoutlets": 0,
                                    "patching_rect": [ 252.0, 90.0, 50.0, 21.0 ],
                                    "text": "Smooth"
                                }
                            },
                            {
                                "box": {
                                    "background": 1,
                                    "id": "obj-35",
                                    "maxclass": "comment",
                                    "numinlets": 1,
                                    "numoutlets": 0,
                                    "patching_rect": [ 250.0, 180.0, 24.0, 21.0 ],
                                    "text": "ms"
                                }
                            },
                            {
                                "box": {
                                    "background": 1,
                                    "id": "obj-18",
                                    "linecount": 2,
                                    "maxclass": "comment",
                                    "numinlets": 1,
                                    "numoutlets": 0,
                                    "patching_rect": [ 508.0, 285.0, 60.0, 35.0 ],
                                    "text": "0 = pow, 1 = comp"
                                }
                            },
                            {
                                "box": {
                                    "background": 1,
                                    "fontface": 1,
                                    "id": "obj-19",
                                    "maxclass": "comment",
                                    "numinlets": 1,
                                    "numoutlets": 0,
                                    "patching_rect": [ 437.0, 290.0, 40.0, 21.0 ],
                                    "text": "Mode"
                                }
                            },
                            {
                                "box": {
                                    "background": 1,
                                    "fontface": 1,
                                    "id": "obj-11",
                                    "maxclass": "comment",
                                    "numinlets": 1,
                                    "numoutlets": 0,
                                    "patching_rect": [ 600.0, 130.0, 70.0, 21.0 ],
                                    "text": "Description"
                                }
                            },
                            {
                                "box": {
                                    "background": 1,
                                    "fontface": 0,
                                    "id": "obj-95",
                                    "linecount": 5,
                                    "maxclass": "comment",
                                    "numinlets": 1,
                                    "numoutlets": 0,
                                    "patching_rect": [ 600.0, 150.0, 203.0, 78.0 ],
                                    "text": "This patch scales the amplitude of the incoming signals, using a waveshaping function and signal smoothing to adjust the shape and response of the volume fade."
                                }
                            },
                            {
                                "box": {
                                    "background": 1,
                                    "fontface": 0,
                                    "fontname": "Lato Bold",
                                    "fontsize": 18.0,
                                    "id": "obj-96",
                                    "maxclass": "comment",
                                    "numinlets": 1,
                                    "numoutlets": 0,
                                    "patching_rect": [ 600.0, 75.0, 125.0, 28.0 ],
                                    "text": "RNBO Volume"
                                }
                            },
                            {
                                "box": {
                                    "background": 1,
                                    "fontface": 1,
                                    "id": "obj-28",
                                    "maxclass": "comment",
                                    "numinlets": 1,
                                    "numoutlets": 0,
                                    "patching_rect": [ 600.0, 100.0, 123.0, 21.0 ],
                                    "text": "Classic stereo volume"
                                }
                            },
                            {
                                "box": {
                                    "background": 1,
                                    "id": "obj-66",
                                    "maxclass": "comment",
                                    "numinlets": 1,
                                    "numoutlets": 0,
                                    "patching_rect": [ 70.0, 765.0, 93.0, 21.0 ],
                                    "text": "Audio out L/R",
                                    "textjustification": 1
                                }
                            },
                            {
                                "box": {
                                    "background": 1,
                                    "id": "obj-14",
                                    "maxclass": "comment",
                                    "numinlets": 1,
                                    "numoutlets": 0,
                                    "patching_rect": [ 70.0, 595.0, 74.0, 21.0 ],
                                    "text": "Audio in L/R",
                                    "textjustification": 1
                                }
                            },
                            {
                                "box": {
                                    "background": 1,
                                    "id": "obj-45",
                                    "maxclass": "comment",
                                    "numinlets": 1,
                                    "numoutlets": 0,
                                    "patching_rect": [ 120.0, 150.0, 38.0, 21.0 ],
                                    "text": "[0. 1.]"
                                }
                            },
                            {
                                "box": {
                                    "background": 1,
                                    "id": "obj-7",
                                    "maxclass": "comment",
                                    "numinlets": 1,
                                    "numoutlets": 0,
                                    "patching_rect": [ 390.0, 200.0, 60.0, 21.0 ],
                                    "text": "[-0.9. 0.9]"
                                }
                            }
                        ],
                        "lines": [
                            {
                                "patchline": {
                                    "destination": [ "obj-42", 0 ],
                                    "source": [ "obj-1", 0 ]
                                }
                            },
                            {
                                "patchline": {
                                    "destination": [ "obj-15", 0 ],
                                    "order": 0,
                                    "source": [ "obj-124", 0 ]
                                }
                            },
                            {
                                "patchline": {
                                    "destination": [ "obj-42", 1 ],
                                    "order": 2,
                                    "source": [ "obj-124", 0 ]
                                }
                            },
                            {
                                "patchline": {
                                    "destination": [ "obj-44", 1 ],
                                    "order": 1,
                                    "source": [ "obj-124", 0 ]
                                }
                            },
                            {
                                "patchline": {
                                    "destination": [ "obj-75", 0 ],
                                    "order": 0,
                                    "source": [ "obj-13", 0 ]
                                }
                            },
                            {
                                "patchline": {
                                    "destination": [ "obj-76", 0 ],
                                    "order": 1,
                                    "source": [ "obj-13", 0 ]
                                }
                            },
                            {
                                "patchline": {
                                    "destination": [ "obj-44", 0 ],
                                    "source": [ "obj-2", 0 ]
                                }
                            },
                            {
                                "patchline": {
                                    "destination": [ "obj-10", 0 ],
                                    "order": 0,
                                    "source": [ "obj-22", 0 ]
                                }
                            },
                            {
                                "patchline": {
                                    "destination": [ "obj-78", 0 ],
                                    "order": 1,
                                    "source": [ "obj-22", 0 ]
                                }
                            },
                            {
                                "patchline": {
                                    "destination": [ "obj-63", 0 ],
                                    "order": 0,
                                    "source": [ "obj-24", 0 ]
                                }
                            },
                            {
                                "patchline": {
                                    "destination": [ "obj-83", 0 ],
                                    "order": 1,
                                    "source": [ "obj-24", 0 ]
                                }
                            },
                            {
                                "patchline": {
                                    "destination": [ "obj-32", 0 ],
                                    "source": [ "obj-29", 0 ]
                                }
                            },
                            {
                                "patchline": {
                                    "destination": [ "obj-29", 0 ],
                                    "source": [ "obj-30", 0 ]
                                }
                            },
                            {
                                "patchline": {
                                    "destination": [ "obj-79", 1 ],
                                    "source": [ "obj-31", 0 ]
                                }
                            },
                            {
                                "patchline": {
                                    "destination": [ "obj-31", 0 ],
                                    "source": [ "obj-32", 0 ]
                                }
                            },
                            {
                                "patchline": {
                                    "destination": [ "obj-41", 0 ],
                                    "source": [ "obj-39", 0 ]
                                }
                            },
                            {
                                "patchline": {
                                    "destination": [ "obj-46", 0 ],
                                    "source": [ "obj-41", 0 ]
                                }
                            },
                            {
                                "patchline": {
                                    "destination": [ "obj-3", 0 ],
                                    "source": [ "obj-42", 0 ]
                                }
                            },
                            {
                                "patchline": {
                                    "destination": [ "obj-4", 0 ],
                                    "source": [ "obj-44", 0 ]
                                }
                            },
                            {
                                "patchline": {
                                    "destination": [ "obj-47", 0 ],
                                    "source": [ "obj-46", 0 ]
                                }
                            },
                            {
                                "patchline": {
                                    "destination": [ "obj-79", 0 ],
                                    "source": [ "obj-47", 0 ]
                                }
                            },
                            {
                                "patchline": {
                                    "destination": [ "obj-24", 0 ],
                                    "source": [ "obj-5", 0 ]
                                }
                            },
                            {
                                "patchline": {
                                    "destination": [ "obj-69", 0 ],
                                    "order": 0,
                                    "source": [ "obj-65", 0 ]
                                }
                            },
                            {
                                "patchline": {
                                    "destination": [ "obj-74", 0 ],
                                    "order": 1,
                                    "source": [ "obj-65", 0 ]
                                }
                            },
                            {
                                "patchline": {
                                    "destination": [ "obj-90", 0 ],
                                    "source": [ "obj-67", 0 ]
                                }
                            },
                            {
                                "patchline": {
                                    "destination": [ "obj-124", 0 ],
                                    "source": [ "obj-68", 0 ]
                                }
                            },
                            {
                                "patchline": {
                                    "destination": [ "obj-70", 0 ],
                                    "source": [ "obj-69", 0 ]
                                }
                            },
                            {
                                "patchline": {
                                    "destination": [ "obj-72", 0 ],
                                    "source": [ "obj-70", 0 ]
                                }
                            },
                            {
                                "patchline": {
                                    "destination": [ "obj-74", 1 ],
                                    "source": [ "obj-71", 0 ]
                                }
                            },
                            {
                                "patchline": {
                                    "destination": [ "obj-73", 1 ],
                                    "source": [ "obj-72", 0 ]
                                }
                            },
                            {
                                "patchline": {
                                    "destination": [ "obj-67", 0 ],
                                    "order": 0,
                                    "source": [ "obj-73", 0 ]
                                }
                            },
                            {
                                "patchline": {
                                    "destination": [ "obj-68", 0 ],
                                    "order": 1,
                                    "source": [ "obj-73", 0 ]
                                }
                            },
                            {
                                "patchline": {
                                    "destination": [ "obj-73", 0 ],
                                    "source": [ "obj-74", 0 ]
                                }
                            },
                            {
                                "patchline": {
                                    "destination": [ "obj-77", 1 ],
                                    "source": [ "obj-75", 0 ]
                                }
                            },
                            {
                                "patchline": {
                                    "destination": [ "obj-77", 0 ],
                                    "source": [ "obj-76", 0 ]
                                }
                            },
                            {
                                "patchline": {
                                    "destination": [ "obj-70", 1 ],
                                    "order": 1,
                                    "source": [ "obj-77", 0 ]
                                }
                            },
                            {
                                "patchline": {
                                    "destination": [ "obj-71", 0 ],
                                    "order": 0,
                                    "source": [ "obj-77", 0 ]
                                }
                            },
                            {
                                "patchline": {
                                    "destination": [ "obj-65", 2 ],
                                    "order": 1,
                                    "source": [ "obj-78", 0 ]
                                }
                            },
                            {
                                "patchline": {
                                    "destination": [ "obj-68", 2 ],
                                    "order": 0,
                                    "source": [ "obj-78", 0 ]
                                }
                            },
                            {
                                "patchline": {
                                    "destination": [ "obj-65", 0 ],
                                    "order": 1,
                                    "source": [ "obj-79", 0 ]
                                }
                            },
                            {
                                "patchline": {
                                    "destination": [ "obj-88", 0 ],
                                    "order": 0,
                                    "source": [ "obj-79", 0 ]
                                }
                            },
                            {
                                "patchline": {
                                    "destination": [ "obj-84", 0 ],
                                    "source": [ "obj-83", 0 ]
                                }
                            },
                            {
                                "patchline": {
                                    "destination": [ "obj-13", 0 ],
                                    "source": [ "obj-84", 0 ]
                                }
                            },
                            {
                                "patchline": {
                                    "destination": [ "obj-89", 0 ],
                                    "source": [ "obj-88", 0 ]
                                }
                            },
                            {
                                "patchline": {
                                    "destination": [ "obj-65", 1 ],
                                    "source": [ "obj-89", 0 ]
                                }
                            },
                            {
                                "patchline": {
                                    "destination": [ "obj-22", 0 ],
                                    "source": [ "obj-9", 0 ]
                                }
                            },
                            {
                                "patchline": {
                                    "destination": [ "obj-68", 1 ],
                                    "source": [ "obj-90", 0 ]
                                }
                            }
                        ],
                        "export_config": {
                            "max-export": {
                                "max-external-export": {
                                    "external_name": "rnbo.volume~",
                                    "description": "Classic stereo volume",
                                    "author": "Cycling74",
                                    "tags": "audio, effect, guitar",
                                    "mc": 1
                                }
                            },
                            "vst-au-export": {
                                "vst-au-export-ins": {
                                    "plugin_name": "Rnbo Volume",
                                    "plugin_manufacturer_name": "Cycling74",
                                    "plugin_type": "Effect"
                                }
                            },
                            "cpp-export": {
                                "cpp-code-export": {
                                    "export_name": "rnbo.volume.cpp"
                                }
                            },
                            "web-export": {
                                "json-web-export": {
                                    "file_name": "volume.json"
                                }
                            }
                        }
                    },
                    "patching_rect": [ 19.0, 62.0, 84.0, 24.0 ],
                    "rnboattrcache": {
                        "slope": {
                            "label": "slope",
                            "isEnum": 0,
                            "parsestring": ""
                        },
                        "smooth": {
                            "label": "smooth",
                            "isEnum": 0,
                            "parsestring": ""
                        },
                        "volume": {
                            "label": "volume",
                            "isEnum": 0,
                            "parsestring": ""
                        },
                        "mode": {
                            "label": "mode",
                            "isEnum": 1,
                            "parsestring": "\"pow\" \"comp\""
                        }
                    },
                    "rnboversion": "1.4.2",
                    "saved_attribute_attributes": {
                        "valueof": {
                            "parameter_invisible": 1,
                            "parameter_longname": "rnbo~[32]",
                            "parameter_modmode": 0,
                            "parameter_shortname": "rnbo~",
                            "parameter_type": 3
                        }
                    },
                    "saved_newobj_attribute_attributes": {
                        "color": {
                            "expression": "themecolor.theme_color"
                        }
                    },
                    "saved_object_attributes": {
                        "optimization": "O1",
                        "parameter_enable": 1,
                        "uuid": "74a09b97-f360-11ea-9b97-34363bd3ed8c"
                    },
                    "snapshot": {
                        "filetype": "C74Snapshot",
                        "version": 2,
                        "minorversion": 0,
                        "name": "snapshotlist",
                        "origin": "rnbo~",
                        "type": "list",
                        "subtype": "Undefined",
                        "embed": 1,
                        "snapshot": {
                            "slope": {
                                "value": 0.0
                            },
                            "smooth": {
                                "value": 0.0
                            },
                            "mode": {
                                "value": 0.0
                            },
                            "volume": {
                                "value": 0.0
                            },
                            "__presetid": "74a09b97-f360-11ea-9b97-34363bd3ed8c"
                        },
                        "snapshotlist": {
                            "current_snapshot": 0,
                            "entries": [
                                {
                                    "filetype": "C74Snapshot",
                                    "version": 2,
                                    "minorversion": 0,
                                    "name": "Default",
                                    "origin": "74a09b97-f360-11ea-9b97-34363bd3ed8c",
                                    "type": "rnbo",
                                    "subtype": "",
                                    "embed": 1,
                                    "snapshot": {
                                        "slope": {
                                            "value": 0.0
                                        },
                                        "smooth": {
                                            "value": 0.0
                                        },
                                        "mode": {
                                            "value": 0.0
                                        },
                                        "volume": {
                                            "value": 0.0
                                        },
                                        "__presetid": "74a09b97-f360-11ea-9b97-34363bd3ed8c"
                                    },
                                    "fileref": {
                                        "name": "Default",
                                        "filename": "Default_20260225_18.maxsnap",
                                        "filepath": "~/Documents/Max 9/Snapshots",
                                        "filepos": -1,
                                        "snapshotfileid": "8e1009854a23927c0d5ada7c701f99b3"
                                    }
                                },
                                {
                                    "filetype": "C74Snapshot",
                                    "version": 2,
                                    "minorversion": 0,
                                    "name": "Fast Attack",
                                    "origin": "untitled",
                                    "type": "rnbo",
                                    "subtype": "",
                                    "embed": 1,
                                    "snapshot": {
                                        "slope": {
                                            "value": 75
                                        },
                                        "smooth": {
                                            "value": 0
                                        },
                                        "mode": {
                                            "value": 0
                                        },
                                        "volume": {
                                            "value": 100
                                        },
                                        "__presetid": "untitled"
                                    },
                                    "fileref": {
                                        "name": "Default[1]",
                                        "filename": "Default[1].maxsnap",
                                        "filepath": "~/Documents/Max 8/Snapshots",
                                        "filepos": -1,
                                        "snapshotfileid": "cc286f993fff0145d560f913fc3cdcf4"
                                    }
                                },
                                {
                                    "filetype": "C74Snapshot",
                                    "version": 2,
                                    "minorversion": 0,
                                    "name": "Slow Attack",
                                    "origin": "untitled",
                                    "type": "rnbo",
                                    "subtype": "",
                                    "embed": 1,
                                    "snapshot": {
                                        "slope": {
                                            "value": -75
                                        },
                                        "smooth": {
                                            "value": 0
                                        },
                                        "mode": {
                                            "value": 0
                                        },
                                        "volume": {
                                            "value": 100
                                        },
                                        "__presetid": "untitled"
                                    },
                                    "fileref": {
                                        "name": "Fast Attack[1]",
                                        "filename": "Fast Attack[1]_20220715.maxsnap",
                                        "filepath": "~/Documents/Max 8/Snapshots",
                                        "filepos": -1,
                                        "snapshotfileid": "7d16b5090b188638d25b804d12b61c82"
                                    }
                                },
                                {
                                    "filetype": "C74Snapshot",
                                    "version": 2,
                                    "minorversion": 0,
                                    "name": "Slow Fade",
                                    "origin": "untitled",
                                    "type": "rnbo",
                                    "subtype": "",
                                    "embed": 1,
                                    "snapshot": {
                                        "slope": {
                                            "value": 0
                                        },
                                        "smooth": {
                                            "value": 100
                                        },
                                        "mode": {
                                            "value": 0
                                        },
                                        "volume": {
                                            "value": 100
                                        },
                                        "__presetid": "untitled"
                                    },
                                    "fileref": {
                                        "name": "Slow Attack[1]",
                                        "filename": "Slow Attack[1]_20220715.maxsnap",
                                        "filepath": "~/Documents/Max 8/Snapshots",
                                        "filepos": -1,
                                        "snapshotfileid": "b1a162a9cf81faafb0358ad0fde4a051"
                                    }
                                },
                                {
                                    "filetype": "C74Snapshot",
                                    "version": 2,
                                    "minorversion": 0,
                                    "name": "Smooth \"S\"",
                                    "origin": "untitled",
                                    "type": "rnbo",
                                    "subtype": "",
                                    "embed": 1,
                                    "snapshot": {
                                        "slope": {
                                            "value": 70
                                        },
                                        "smooth": {
                                            "value": 50
                                        },
                                        "mode": {
                                            "value": 1
                                        },
                                        "volume": {
                                            "value": 100
                                        },
                                        "__presetid": "untitled"
                                    },
                                    "fileref": {
                                        "name": "Smooth \"S\"",
                                        "filename": "Slow Fade[1]_20220715.maxsnap",
                                        "filepath": "~/Documents/Max 8/Snapshots",
                                        "filepos": -1,
                                        "snapshotfileid": "d19d356a867fb4d7b6b3115aae559ff3"
                                    }
                                },
                                {
                                    "filetype": "C74Snapshot",
                                    "version": 2,
                                    "minorversion": 0,
                                    "name": "Fast \"S\"",
                                    "origin": "untitled",
                                    "type": "rnbo",
                                    "subtype": "",
                                    "embed": 1,
                                    "snapshot": {
                                        "slope": {
                                            "value": -70
                                        },
                                        "smooth": {
                                            "value": 50
                                        },
                                        "mode": {
                                            "value": 1
                                        },
                                        "volume": {
                                            "value": 100
                                        },
                                        "__presetid": "untitled"
                                    },
                                    "fileref": {
                                        "name": "Fast \"S\"",
                                        "filename": "Smooth \"S\"[1]_20220715.maxsnap",
                                        "filepath": "~/Documents/Max 8/Snapshots",
                                        "filepos": -1,
                                        "snapshotfileid": "9ddb63fdf8fa30ceb723380a326595bd"
                                    }
                                }
                            ]
                        }
                    },
                    "text": "rnbo~",
                    "varname": "rnbo~[32]"
                }
            },
            {
                "box": {
                    "autosave": 1,
                    "color": [ 0.618934978328545, 0.744701397656435, 0.953750108255376, 1.0 ],
                    "fontface": 1,
                    "fontsize": 14.0,
                    "hint": "To make a preset, unlock the patcher and highlight the rnbo~ object, then click on the snapshot sidebar icon. From here, click on the + icon or the New... button to add a new snapshot and the play button to recall it. Just like standard Max snapshots , you can embed them in the patcher and rename them as you see fit.",
                    "id": "obj-40",
                    "inletInfo": {
                        "IOInfo": [
                            {
                                "type": "signal",
                                "index": 1,
                                "tag": "in1",
                                "comment": ""
                            },
                            {
                                "type": "signal",
                                "index": 2,
                                "tag": "in2",
                                "comment": ""
                            },
                            {
                                "type": "midi",
                                "index": -1,
                                "tag": "",
                                "comment": ""
                            }
                        ]
                    },
                    "maxclass": "newobj",
                    "numinlets": 3,
                    "numoutlets": 4,
                    "outletInfo": {
                        "IOInfo": [
                            {
                                "type": "signal",
                                "index": 1,
                                "tag": "out1",
                                "comment": ""
                            },
                            {
                                "type": "signal",
                                "index": 2,
                                "tag": "out2",
                                "comment": ""
                            },
                            {
                                "type": "signal",
                                "index": 3,
                                "tag": "out3",
                                "comment": ""
                            }
                        ]
                    },
                    "outlettype": [ "signal", "signal", "signal", "list" ],
                    "patcher": {
                        "fileversion": 1,
                        "appversion": {
                            "major": 9,
                            "minor": 1,
                            "revision": 2,
                            "architecture": "x64",
                            "modernui": 1
                        },
                        "classnamespace": "rnbo",
                        "rect": [ 33.0, 80.0, 506.0, 423.0 ],
                        "default_fontname": "Lato",
                        "gridonopen": 2,
                        "gridsize": [ 10.0, 10.0 ],
                        "gridsnaponopen": 2,
                        "objectsnaponopen": 0,
                        "subpatcher_template": "MP-Rnbo",
                        "integercoordinates": 1,
                        "title": "untitled",
                        "boxes": [
                            {
                                "box": {
                                    "bufsize": 128.0,
                                    "calccount": 128.0,
                                    "gridcolor": [ 0.505882352941176, 0.564705882352941, 0.666666666666667, 0.25 ],
                                    "id": "obj-10",
                                    "maxclass": "scope~",
                                    "numinlets": 2,
                                    "numoutlets": 0,
                                    "patching_rect": [ 380.0, 380.0, 60.0, 40.0 ],
                                    "range": [ -0.01, 1.009999990463257 ],
                                    "rnbo_classname": "scope~",
                                    "rnbo_extra_attributes": {
                                        "bufsize": 128.0,
                                        "calccount": 128.0
                                    },
                                    "rnbo_serial": 1,
                                    "rnbo_uniqueid": "scope~_obj-10"
                                }
                            },
                            {
                                "box": {
                                    "color": [ 0.618934978328545, 0.744701397656435, 0.953750108255376, 1.0 ],
                                    "id": "obj-23",
                                    "maxclass": "newobj",
                                    "numinlets": 3,
                                    "numoutlets": 2,
                                    "outlettype": [ "signal", "signal" ],
                                    "patcher": {
                                        "fileversion": 1,
                                        "appversion": {
                                            "major": 9,
                                            "minor": 1,
                                            "revision": 2,
                                            "architecture": "x64",
                                            "modernui": 1
                                        },
                                        "classnamespace": "rnbo",
                                        "rect": [ 59.0, 104.0, 460.0, 378.0 ],
                                        "default_fontname": "Lato",
                                        "gridonopen": 2,
                                        "gridsize": [ 10.0, 10.0 ],
                                        "gridsnaponopen": 2,
                                        "objectsnaponopen": 0,
                                        "subpatcher_template": "MP-Rnbo",
                                        "integercoordinates": 1,
                                        "title": "Lookahead~",
                                        "boxes": [
                                            {
                                                "box": {
                                                    "id": "obj-10",
                                                    "maxclass": "flonum",
                                                    "numinlets": 1,
                                                    "numoutlets": 2,
                                                    "outlettype": [ "", "bang" ],
                                                    "parameter_enable": 0,
                                                    "patching_rect": [ 270.0, 240.0, 50.0, 23.0 ],
                                                    "rnbo_classname": "number",
                                                    "rnbo_extra_attributes": {
                                                        "maximum": "<none>",
                                                        "initialFormat": "float",
                                                        "minimum": "<none>",
                                                        "order": "",
                                                        "preset": 0
                                                    },
                                                    "rnbo_serial": 1,
                                                    "rnbo_uniqueid": "number_obj-10"
                                                }
                                            },
                                            {
                                                "box": {
                                                    "id": "obj-6",
                                                    "maxclass": "flonum",
                                                    "numinlets": 1,
                                                    "numoutlets": 2,
                                                    "outlettype": [ "", "bang" ],
                                                    "parameter_enable": 0,
                                                    "patching_rect": [ 270.0, 120.0, 50.0, 23.0 ],
                                                    "rnbo_classname": "number",
                                                    "rnbo_extra_attributes": {
                                                        "maximum": "<none>",
                                                        "initialFormat": "float",
                                                        "minimum": "<none>",
                                                        "order": "",
                                                        "preset": 0
                                                    },
                                                    "rnbo_serial": 2,
                                                    "rnbo_uniqueid": "number_obj-6"
                                                }
                                            },
                                            {
                                                "box": {
                                                    "id": "obj-4",
                                                    "maxclass": "newobj",
                                                    "numinlets": 1,
                                                    "numoutlets": 0,
                                                    "patching_rect": [ 100.0, 300.0, 43.0, 23.0 ],
                                                    "rnbo_classname": "out~",
                                                    "rnbo_extra_attributes": {
                                                        "meta": "",
                                                        "comment": ""
                                                    },
                                                    "rnbo_serial": 1,
                                                    "rnbo_uniqueid": "out~_obj-4",
                                                    "rnboinfo": {
                                                        "needsInstanceInfo": 1,
                                                        "argnames": {
                                                            "in1": {
                                                                "attrOrProp": 1,
                                                                "digest": "signal sent to outlet with index 2",
                                                                "isalias": 0,
                                                                "aliases": [],
                                                                "settable": 0,
                                                                "attachable": 0,
                                                                "isparam": 0,
                                                                "deprecated": 0,
                                                                "touched": 0,
                                                                "inlet": 1,
                                                                "type": "signal"
                                                            },
                                                            "index": {
                                                                "attrOrProp": 2,
                                                                "digest": "outlet number",
                                                                "defaultarg": 1,
                                                                "isalias": 0,
                                                                "aliases": [],
                                                                "settable": 1,
                                                                "attachable": 0,
                                                                "isparam": 0,
                                                                "deprecated": 0,
                                                                "touched": 0,
                                                                "type": "number",
                                                                "mandatory": 1
                                                            },
                                                            "comment": {
                                                                "attrOrProp": 2,
                                                                "digest": "mouse over comment",
                                                                "isalias": 0,
                                                                "aliases": [],
                                                                "settable": 1,
                                                                "attachable": 0,
                                                                "isparam": 0,
                                                                "deprecated": 0,
                                                                "touched": 0,
                                                                "type": "symbol"
                                                            },
                                                            "meta": {
                                                                "attrOrProp": 2,
                                                                "digest": "A JSON formatted string containing metadata for use by the exported code",
                                                                "isalias": 0,
                                                                "aliases": [],
                                                                "settable": 1,
                                                                "attachable": 0,
                                                                "isparam": 0,
                                                                "deprecated": 0,
                                                                "touched": 0,
                                                                "type": "symbol",
                                                                "defaultValue": "",
                                                                "label": "Metadata",
                                                                "displayorder": 3
                                                            }
                                                        },
                                                        "inputs": [
                                                            {
                                                                "name": "in1",
                                                                "type": "signal",
                                                                "digest": "signal sent to outlet with index 2",
                                                                "displayName": "",
                                                                "hot": 1,
                                                                "docked": 0
                                                            }
                                                        ],
                                                        "outputs": [],
                                                        "helpname": "out~",
                                                        "aliasOf": "out~",
                                                        "classname": "out~",
                                                        "operator": 0,
                                                        "versionId": 1989326771,
                                                        "changesPatcherIO": 1
                                                    },
                                                    "text": "out~ 2"
                                                }
                                            },
                                            {
                                                "box": {
                                                    "id": "obj-3",
                                                    "maxclass": "newobj",
                                                    "numinlets": 1,
                                                    "numoutlets": 0,
                                                    "patching_rect": [ 50.0, 300.0, 43.0, 23.0 ],
                                                    "rnbo_classname": "out~",
                                                    "rnbo_extra_attributes": {
                                                        "meta": "",
                                                        "comment": ""
                                                    },
                                                    "rnbo_serial": 2,
                                                    "rnbo_uniqueid": "out~_obj-3",
                                                    "rnboinfo": {
                                                        "needsInstanceInfo": 1,
                                                        "argnames": {
                                                            "in1": {
                                                                "attrOrProp": 1,
                                                                "digest": "signal sent to outlet with index 1",
                                                                "isalias": 0,
                                                                "aliases": [],
                                                                "settable": 0,
                                                                "attachable": 0,
                                                                "isparam": 0,
                                                                "deprecated": 0,
                                                                "touched": 0,
                                                                "inlet": 1,
                                                                "type": "signal"
                                                            },
                                                            "index": {
                                                                "attrOrProp": 2,
                                                                "digest": "outlet number",
                                                                "defaultarg": 1,
                                                                "isalias": 0,
                                                                "aliases": [],
                                                                "settable": 1,
                                                                "attachable": 0,
                                                                "isparam": 0,
                                                                "deprecated": 0,
                                                                "touched": 0,
                                                                "type": "number",
                                                                "mandatory": 1
                                                            },
                                                            "comment": {
                                                                "attrOrProp": 2,
                                                                "digest": "mouse over comment",
                                                                "isalias": 0,
                                                                "aliases": [],
                                                                "settable": 1,
                                                                "attachable": 0,
                                                                "isparam": 0,
                                                                "deprecated": 0,
                                                                "touched": 0,
                                                                "type": "symbol"
                                                            },
                                                            "meta": {
                                                                "attrOrProp": 2,
                                                                "digest": "A JSON formatted string containing metadata for use by the exported code",
                                                                "isalias": 0,
                                                                "aliases": [],
                                                                "settable": 1,
                                                                "attachable": 0,
                                                                "isparam": 0,
                                                                "deprecated": 0,
                                                                "touched": 0,
                                                                "type": "symbol",
                                                                "defaultValue": "",
                                                                "label": "Metadata",
                                                                "displayorder": 3
                                                            }
                                                        },
                                                        "inputs": [
                                                            {
                                                                "name": "in1",
                                                                "type": "signal",
                                                                "digest": "signal sent to outlet with index 1",
                                                                "displayName": "",
                                                                "hot": 1,
                                                                "docked": 0
                                                            }
                                                        ],
                                                        "outputs": [],
                                                        "helpname": "out~",
                                                        "aliasOf": "out~",
                                                        "classname": "out~",
                                                        "operator": 0,
                                                        "versionId": 1989326771,
                                                        "changesPatcherIO": 1
                                                    },
                                                    "text": "out~ 1"
                                                }
                                            },
                                            {
                                                "box": {
                                                    "id": "obj-2",
                                                    "linecount": 2,
                                                    "maxclass": "newobj",
                                                    "numinlets": 2,
                                                    "numoutlets": 1,
                                                    "outlettype": [ "signal" ],
                                                    "patching_rect": [ 100.0, 180.0, 110.0, 37.0 ],
                                                    "rnbo_classname": "delay~",
                                                    "rnbo_extra_attributes": {
                                                        "ramp": 50.0,
                                                        "interp": "linear",
                                                        "maxsize": "samplerate"
                                                    },
                                                    "rnbo_serial": 1,
                                                    "rnbo_uniqueid": "delay~_obj-2",
                                                    "text": "delay~ @maxdelayms 100"
                                                }
                                            },
                                            {
                                                "box": {
                                                    "id": "obj-1",
                                                    "maxclass": "newobj",
                                                    "numinlets": 0,
                                                    "numoutlets": 1,
                                                    "outlettype": [ "signal" ],
                                                    "patching_rect": [ 100.0, 120.0, 35.0, 23.0 ],
                                                    "rnbo_classname": "in~",
                                                    "rnbo_extra_attributes": {
                                                        "meta": "",
                                                        "comment": ""
                                                    },
                                                    "rnbo_serial": 1,
                                                    "rnbo_uniqueid": "in~_obj-1",
                                                    "rnboinfo": {
                                                        "needsInstanceInfo": 1,
                                                        "argnames": {
                                                            "out1": {
                                                                "attrOrProp": 1,
                                                                "digest": "signal from inlet with index 2",
                                                                "isalias": 0,
                                                                "aliases": [],
                                                                "settable": 0,
                                                                "attachable": 0,
                                                                "isparam": 0,
                                                                "deprecated": 0,
                                                                "touched": 0,
                                                                "outlet": 1,
                                                                "type": "signal"
                                                            },
                                                            "index": {
                                                                "attrOrProp": 2,
                                                                "digest": "inlet number",
                                                                "defaultarg": 1,
                                                                "isalias": 0,
                                                                "aliases": [],
                                                                "settable": 1,
                                                                "attachable": 0,
                                                                "isparam": 0,
                                                                "deprecated": 0,
                                                                "touched": 0,
                                                                "type": "number",
                                                                "mandatory": 1
                                                            },
                                                            "comment": {
                                                                "attrOrProp": 2,
                                                                "digest": "mouse over comment",
                                                                "isalias": 0,
                                                                "aliases": [],
                                                                "settable": 1,
                                                                "attachable": 0,
                                                                "isparam": 0,
                                                                "deprecated": 0,
                                                                "touched": 0,
                                                                "type": "symbol"
                                                            },
                                                            "meta": {
                                                                "attrOrProp": 2,
                                                                "digest": "A JSON formatted string containing metadata for use by the exported code",
                                                                "isalias": 0,
                                                                "aliases": [],
                                                                "settable": 1,
                                                                "attachable": 0,
                                                                "isparam": 0,
                                                                "deprecated": 0,
                                                                "touched": 0,
                                                                "type": "symbol",
                                                                "defaultValue": "",
                                                                "label": "Metadata",
                                                                "displayorder": 3
                                                            }
                                                        },
                                                        "inputs": [],
                                                        "outputs": [
                                                            {
                                                                "name": "out1",
                                                                "type": "signal",
                                                                "digest": "signal from inlet with index 2",
                                                                "displayName": "",
                                                                "docked": 0
                                                            }
                                                        ],
                                                        "helpname": "in~",
                                                        "aliasOf": "in~",
                                                        "classname": "in~",
                                                        "operator": 0,
                                                        "versionId": -1654556303,
                                                        "changesPatcherIO": 1
                                                    },
                                                    "text": "in~ 2"
                                                }
                                            },
                                            {
                                                "box": {
                                                    "id": "obj-18",
                                                    "maxclass": "newobj",
                                                    "numinlets": 1,
                                                    "numoutlets": 1,
                                                    "outlettype": [ "" ],
                                                    "patching_rect": [ 270.0, 210.0, 68.0, 23.0 ],
                                                    "rnbo_classname": "mstosamps",
                                                    "rnbo_extra_attributes": {
                                                        "hot": 0
                                                    },
                                                    "rnbo_serial": 1,
                                                    "rnbo_uniqueid": "mstosamps_obj-18",
                                                    "text": "mstosamps"
                                                }
                                            },
                                            {
                                                "box": {
                                                    "id": "obj-12",
                                                    "linecount": 2,
                                                    "maxclass": "newobj",
                                                    "numinlets": 2,
                                                    "numoutlets": 1,
                                                    "outlettype": [ "signal" ],
                                                    "patching_rect": [ 50.0, 230.0, 110.0, 37.0 ],
                                                    "rnbo_classname": "delay~",
                                                    "rnbo_extra_attributes": {
                                                        "ramp": 50.0,
                                                        "interp": "linear",
                                                        "maxsize": "samplerate"
                                                    },
                                                    "rnbo_serial": 2,
                                                    "rnbo_uniqueid": "delay~_obj-12",
                                                    "text": "delay~ @maxdelayms 100"
                                                }
                                            },
                                            {
                                                "box": {
                                                    "id": "obj-31",
                                                    "maxclass": "flonum",
                                                    "numinlets": 1,
                                                    "numoutlets": 2,
                                                    "outlettype": [ "", "bang" ],
                                                    "parameter_enable": 0,
                                                    "patching_rect": [ 270.0, 180.0, 50.0, 23.0 ],
                                                    "rnbo_classname": "number",
                                                    "rnbo_extra_attributes": {
                                                        "maximum": "<none>",
                                                        "initialFormat": "float",
                                                        "minimum": "<none>",
                                                        "order": "",
                                                        "preset": 0
                                                    },
                                                    "rnbo_serial": 3,
                                                    "rnbo_uniqueid": "number_obj-31"
                                                }
                                            },
                                            {
                                                "box": {
                                                    "id": "obj-32",
                                                    "maxclass": "newobj",
                                                    "numinlets": 6,
                                                    "numoutlets": 1,
                                                    "outlettype": [ "" ],
                                                    "patching_rect": [ 270.0, 150.0, 155.0, 23.0 ],
                                                    "rnbo_classname": "scale",
                                                    "rnbo_serial": 1,
                                                    "rnbo_uniqueid": "scale_obj-32",
                                                    "text": "scale 0. 100. 25. 100. 1.585"
                                                }
                                            },
                                            {
                                                "box": {
                                                    "background": 1,
                                                    "id": "obj-35",
                                                    "maxclass": "comment",
                                                    "numinlets": 1,
                                                    "numoutlets": 0,
                                                    "patching_rect": [ 320.0, 180.0, 24.0, 21.0 ],
                                                    "text": "ms"
                                                }
                                            },
                                            {
                                                "box": {
                                                    "id": "obj-21",
                                                    "maxclass": "newobj",
                                                    "numinlets": 0,
                                                    "numoutlets": 1,
                                                    "outlettype": [ "signal" ],
                                                    "patching_rect": [ 50.0, 120.0, 35.0, 23.0 ],
                                                    "rnbo_classname": "in~",
                                                    "rnbo_extra_attributes": {
                                                        "meta": "",
                                                        "comment": ""
                                                    },
                                                    "rnbo_serial": 2,
                                                    "rnbo_uniqueid": "in~_obj-21",
                                                    "rnboinfo": {
                                                        "needsInstanceInfo": 1,
                                                        "argnames": {
                                                            "out1": {
                                                                "attrOrProp": 1,
                                                                "digest": "signal from inlet with index 1",
                                                                "isalias": 0,
                                                                "aliases": [],
                                                                "settable": 0,
                                                                "attachable": 0,
                                                                "isparam": 0,
                                                                "deprecated": 0,
                                                                "touched": 0,
                                                                "outlet": 1,
                                                                "type": "signal"
                                                            },
                                                            "index": {
                                                                "attrOrProp": 2,
                                                                "digest": "inlet number",
                                                                "defaultarg": 1,
                                                                "isalias": 0,
                                                                "aliases": [],
                                                                "settable": 1,
                                                                "attachable": 0,
                                                                "isparam": 0,
                                                                "deprecated": 0,
                                                                "touched": 0,
                                                                "type": "number",
                                                                "mandatory": 1
                                                            },
                                                            "comment": {
                                                                "attrOrProp": 2,
                                                                "digest": "mouse over comment",
                                                                "isalias": 0,
                                                                "aliases": [],
                                                                "settable": 1,
                                                                "attachable": 0,
                                                                "isparam": 0,
                                                                "deprecated": 0,
                                                                "touched": 0,
                                                                "type": "symbol"
                                                            },
                                                            "meta": {
                                                                "attrOrProp": 2,
                                                                "digest": "A JSON formatted string containing metadata for use by the exported code",
                                                                "isalias": 0,
                                                                "aliases": [],
                                                                "settable": 1,
                                                                "attachable": 0,
                                                                "isparam": 0,
                                                                "deprecated": 0,
                                                                "touched": 0,
                                                                "type": "symbol",
                                                                "defaultValue": "",
                                                                "label": "Metadata",
                                                                "displayorder": 3
                                                            }
                                                        },
                                                        "inputs": [],
                                                        "outputs": [
                                                            {
                                                                "name": "out1",
                                                                "type": "signal",
                                                                "digest": "signal from inlet with index 1",
                                                                "displayName": "",
                                                                "docked": 0
                                                            }
                                                        ],
                                                        "helpname": "in~",
                                                        "aliasOf": "in~",
                                                        "classname": "in~",
                                                        "operator": 0,
                                                        "versionId": -1654556303,
                                                        "changesPatcherIO": 1
                                                    },
                                                    "text": "in~ 1"
                                                }
                                            },
                                            {
                                                "box": {
                                                    "background": 1,
                                                    "id": "obj-5",
                                                    "maxclass": "comment",
                                                    "numinlets": 1,
                                                    "numoutlets": 0,
                                                    "patching_rect": [ 120.0, 160.0, 71.0, 21.0 ],
                                                    "text": "Signal delay"
                                                }
                                            },
                                            {
                                                "box": {
                                                    "background": 1,
                                                    "fontface": 1,
                                                    "fontsize": 14.0,
                                                    "id": "obj-19",
                                                    "maxclass": "comment",
                                                    "numinlets": 1,
                                                    "numoutlets": 0,
                                                    "patching_rect": [ 50.0, 30.0, 77.0, 23.0 ],
                                                    "text": "Lookahead"
                                                }
                                            },
                                            {
                                                "box": {
                                                    "background": 1,
                                                    "fontface": 0,
                                                    "id": "obj-20",
                                                    "linecount": 2,
                                                    "maxclass": "comment",
                                                    "numinlets": 1,
                                                    "numoutlets": 0,
                                                    "patching_rect": [ 50.0, 50.0, 340.0, 35.0 ],
                                                    "text": "Delay the input sound in order to handle transient information better and maintain a smooth attack."
                                                }
                                            },
                                            {
                                                "box": {
                                                    "background": 1,
                                                    "id": "obj-17",
                                                    "maxclass": "comment",
                                                    "numinlets": 1,
                                                    "numoutlets": 0,
                                                    "patching_rect": [ 300.0, 90.0, 66.0, 21.0 ],
                                                    "text": "Lookahead"
                                                }
                                            },
                                            {
                                                "box": {
                                                    "background": 1,
                                                    "id": "obj-15",
                                                    "linecount": 2,
                                                    "maxclass": "comment",
                                                    "numinlets": 1,
                                                    "numoutlets": 0,
                                                    "patching_rect": [ 162.0, 231.0, 70.0, 35.0 ],
                                                    "text": "Max delay: 100 ms"
                                                }
                                            },
                                            {
                                                "box": {
                                                    "background": 1,
                                                    "id": "obj-13",
                                                    "maxclass": "comment",
                                                    "numinlets": 1,
                                                    "numoutlets": 0,
                                                    "patching_rect": [ 340.0, 210.0, 51.0, 21.0 ],
                                                    "text": "Convert"
                                                }
                                            },
                                            {
                                                "box": {
                                                    "background": 1,
                                                    "id": "obj-11",
                                                    "maxclass": "comment",
                                                    "numinlets": 1,
                                                    "numoutlets": 0,
                                                    "patching_rect": [ 320.0, 240.0, 51.0, 21.0 ],
                                                    "text": "samples"
                                                }
                                            },
                                            {
                                                "box": {
                                                    "background": 1,
                                                    "id": "obj-8",
                                                    "maxclass": "comment",
                                                    "numinlets": 1,
                                                    "numoutlets": 0,
                                                    "patching_rect": [ 360.0, 130.0, 32.0, 21.0 ],
                                                    "text": "Map"
                                                }
                                            },
                                            {
                                                "box": {
                                                    "background": 1,
                                                    "id": "obj-7",
                                                    "maxclass": "comment",
                                                    "numinlets": 1,
                                                    "numoutlets": 0,
                                                    "patching_rect": [ 320.0, 120.0, 20.0, 21.0 ],
                                                    "text": "%"
                                                }
                                            },
                                            {
                                                "box": {
                                                    "background": 1,
                                                    "id": "obj-14",
                                                    "maxclass": "comment",
                                                    "numinlets": 1,
                                                    "numoutlets": 0,
                                                    "patching_rect": [ 50.0, 97.0, 74.0, 21.0 ],
                                                    "text": "Audio in L/R",
                                                    "textjustification": 1
                                                }
                                            },
                                            {
                                                "box": {
                                                    "id": "obj-22",
                                                    "maxclass": "newobj",
                                                    "numinlets": 0,
                                                    "numoutlets": 1,
                                                    "outlettype": [ "" ],
                                                    "patching_rect": [ 270.0, 90.0, 28.0, 23.0 ],
                                                    "rnbo_classname": "in",
                                                    "rnbo_extra_attributes": {
                                                        "meta": "",
                                                        "comment": ""
                                                    },
                                                    "rnbo_serial": 1,
                                                    "rnbo_uniqueid": "in_obj-22",
                                                    "rnboinfo": {
                                                        "needsInstanceInfo": 1,
                                                        "argnames": {
                                                            "index": {
                                                                "attrOrProp": 2,
                                                                "digest": "inlet number",
                                                                "defaultarg": 1,
                                                                "isalias": 0,
                                                                "aliases": [],
                                                                "settable": 1,
                                                                "attachable": 0,
                                                                "isparam": 0,
                                                                "deprecated": 0,
                                                                "touched": 0,
                                                                "type": "number",
                                                                "mandatory": 1
                                                            },
                                                            "comment": {
                                                                "attrOrProp": 2,
                                                                "digest": "mouse over comment",
                                                                "isalias": 0,
                                                                "aliases": [],
                                                                "settable": 1,
                                                                "attachable": 0,
                                                                "isparam": 0,
                                                                "deprecated": 0,
                                                                "touched": 0,
                                                                "type": "symbol"
                                                            },
                                                            "meta": {
                                                                "attrOrProp": 2,
                                                                "digest": "A JSON formatted string containing metadata for use by the exported code",
                                                                "isalias": 0,
                                                                "aliases": [],
                                                                "settable": 1,
                                                                "attachable": 0,
                                                                "isparam": 0,
                                                                "deprecated": 0,
                                                                "touched": 0,
                                                                "type": "symbol",
                                                                "defaultValue": "",
                                                                "label": "Metadata",
                                                                "displayorder": 3
                                                            }
                                                        },
                                                        "inputs": [],
                                                        "outputs": [
                                                            {
                                                                "name": "out1",
                                                                "type": [ "bang", "number", "list" ],
                                                                "digest": "value from inlet with index 3",
                                                                "displayName": "",
                                                                "docked": 0
                                                            }
                                                        ],
                                                        "helpname": "in",
                                                        "aliasOf": "in",
                                                        "classname": "in",
                                                        "operator": 0,
                                                        "versionId": 475235762,
                                                        "changesPatcherIO": 1
                                                    },
                                                    "text": "in 3"
                                                }
                                            },
                                            {
                                                "box": {
                                                    "background": 1,
                                                    "id": "obj-66",
                                                    "maxclass": "comment",
                                                    "numinlets": 1,
                                                    "numoutlets": 0,
                                                    "patching_rect": [ 50.0, 330.0, 83.0, 21.0 ],
                                                    "text": "Audio out L/R",
                                                    "textjustification": 1
                                                }
                                            }
                                        ],
                                        "lines": [
                                            {
                                                "patchline": {
                                                    "destination": [ "obj-2", 0 ],
                                                    "source": [ "obj-1", 0 ]
                                                }
                                            },
                                            {
                                                "patchline": {
                                                    "destination": [ "obj-12", 1 ],
                                                    "order": 1,
                                                    "source": [ "obj-10", 0 ]
                                                }
                                            },
                                            {
                                                "patchline": {
                                                    "destination": [ "obj-2", 1 ],
                                                    "order": 0,
                                                    "source": [ "obj-10", 0 ]
                                                }
                                            },
                                            {
                                                "patchline": {
                                                    "destination": [ "obj-3", 0 ],
                                                    "source": [ "obj-12", 0 ]
                                                }
                                            },
                                            {
                                                "patchline": {
                                                    "destination": [ "obj-10", 0 ],
                                                    "source": [ "obj-18", 0 ]
                                                }
                                            },
                                            {
                                                "patchline": {
                                                    "destination": [ "obj-4", 0 ],
                                                    "source": [ "obj-2", 0 ]
                                                }
                                            },
                                            {
                                                "patchline": {
                                                    "destination": [ "obj-12", 0 ],
                                                    "source": [ "obj-21", 0 ]
                                                }
                                            },
                                            {
                                                "patchline": {
                                                    "destination": [ "obj-6", 0 ],
                                                    "source": [ "obj-22", 0 ]
                                                }
                                            },
                                            {
                                                "patchline": {
                                                    "destination": [ "obj-18", 0 ],
                                                    "source": [ "obj-31", 0 ]
                                                }
                                            },
                                            {
                                                "patchline": {
                                                    "destination": [ "obj-31", 0 ],
                                                    "source": [ "obj-32", 0 ]
                                                }
                                            },
                                            {
                                                "patchline": {
                                                    "destination": [ "obj-32", 0 ],
                                                    "source": [ "obj-6", 0 ]
                                                }
                                            }
                                        ]
                                    },
                                    "patching_rect": [ 70.0, 250.0, 119.0, 23.0 ],
                                    "rnbo_classname": "p",
                                    "rnbo_extra_attributes": {
                                        "voicecontrol": "midi",
                                        "notecontroller": 0,
                                        "args": [],
                                        "exposevoiceparams": 0,
                                        "receivemode": "local",
                                        "polyphony": -1.0,
                                        "uidstyle": "auto"
                                    },
                                    "rnbo_serial": 1,
                                    "rnbo_uniqueid": "Lookahead~",
                                    "rnboinfo": {
                                        "needsInstanceInfo": 1,
                                        "argnames": {
                                            "target": {
                                                "attrOrProp": 1,
                                                "digest": "target",
                                                "isalias": 0,
                                                "aliases": [],
                                                "settable": 0,
                                                "attachable": 1,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "type": "number",
                                                "defaultValue": "0"
                                            },
                                            "mute": {
                                                "attrOrProp": 1,
                                                "digest": "mute",
                                                "isalias": 0,
                                                "aliases": [],
                                                "attachable": 1,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "type": "number"
                                            },
                                            "in1": {
                                                "attrOrProp": 1,
                                                "digest": "in1",
                                                "isalias": 0,
                                                "aliases": [],
                                                "attachable": 0,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "inlet": 1,
                                                "type": "signal"
                                            },
                                            "in2": {
                                                "attrOrProp": 1,
                                                "digest": "in2",
                                                "isalias": 0,
                                                "aliases": [],
                                                "attachable": 0,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "inlet": 1,
                                                "type": "signal"
                                            },
                                            "__probingout1": {
                                                "attrOrProp": 1,
                                                "digest": "__probingout1",
                                                "isalias": 0,
                                                "aliases": [],
                                                "attachable": 0,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "type": "signal"
                                            },
                                            "out1": {
                                                "attrOrProp": 1,
                                                "digest": "out1",
                                                "isalias": 0,
                                                "aliases": [],
                                                "attachable": 0,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "outlet": 1,
                                                "type": "signal"
                                            },
                                            "out2": {
                                                "attrOrProp": 1,
                                                "digest": "out2",
                                                "isalias": 0,
                                                "aliases": [],
                                                "attachable": 0,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "outlet": 1,
                                                "type": "signal"
                                            },
                                            "polyphony": {
                                                "attrOrProp": 2,
                                                "digest": "Polyphony of the subpatcher.",
                                                "isalias": 0,
                                                "aliases": [],
                                                "settable": 1,
                                                "attachable": 0,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "type": "number",
                                                "defaultValue": "-1"
                                            },
                                            "exposevoiceparams": {
                                                "attrOrProp": 2,
                                                "digest": "Expose per voice versions of the contained parameters (only valid in polyphonic subpatchers).",
                                                "isalias": 0,
                                                "aliases": [],
                                                "settable": 1,
                                                "attachable": 0,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "type": "bool",
                                                "defaultValue": "false"
                                            },
                                            "title": {
                                                "attrOrProp": 2,
                                                "digest": "Title of the subpatcher",
                                                "defaultarg": 1,
                                                "isalias": 0,
                                                "aliases": [],
                                                "settable": 1,
                                                "attachable": 0,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "type": "symbol",
                                                "doNotShowInMaxInspector": 1
                                            },
                                            "file": {
                                                "attrOrProp": 2,
                                                "digest": "rnbo file to load",
                                                "isalias": 0,
                                                "aliases": [],
                                                "settable": 1,
                                                "attachable": 0,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "type": "symbol",
                                                "doNotShowInMaxInspector": 1
                                            },
                                            "voicecontrol": {
                                                "attrOrProp": 2,
                                                "digest": "Chooses the way that polyphonic voices are controlled. 'simple' (or 'midi') will automatically allocate voices for \tincoming MIDI notes. Setting it to 'user' (or 'none') will switch off MIDI \tvoice allocation and start with all voices unmuted.",
                                                "isalias": 0,
                                                "aliases": [],
                                                "settable": 1,
                                                "attachable": 0,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "enum": [ "simple", "user" ],
                                                "type": "enum",
                                                "defaultValue": "simple"
                                            },
                                            "notecontroller": {
                                                "attrOrProp": 2,
                                                "digest": "DEPRECATED. Use voicecontrol instead.",
                                                "isalias": 0,
                                                "aliases": [],
                                                "settable": 1,
                                                "attachable": 0,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "type": "symbol",
                                                "doNotShowInMaxInspector": 1
                                            },
                                            "receivemode": {
                                                "attrOrProp": 2,
                                                "digest": "Do receive~ objects get the signal from a send~ inside the patcher directly (without latency), or compensated (with latency, aligned with all other voices).",
                                                "isalias": 0,
                                                "aliases": [],
                                                "settable": 1,
                                                "attachable": 0,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "enum": [ "local", "compensated" ],
                                                "type": "enum",
                                                "defaultValue": "local"
                                            },
                                            "args": {
                                                "attrOrProp": 2,
                                                "digest": "Replacement args for the subpatcher, everything named #1, #2 etc. will be replaced with the according argument.",
                                                "isalias": 0,
                                                "aliases": [],
                                                "settable": 1,
                                                "attachable": 0,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "type": "symbol",
                                                "doNotShowInMaxInspector": 1
                                            },
                                            "uidstyle": {
                                                "attrOrProp": 2,
                                                "digest": "Behavior of #0 unique ID. auto (default) means abstractions get a local UID, local: start a new local UID, parent: use the one from the parent patcher",
                                                "isalias": 0,
                                                "aliases": [],
                                                "settable": 1,
                                                "attachable": 0,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "enum": [ "auto", "local", "parent", "global" ],
                                                "type": "enum",
                                                "defaultValue": "auto"
                                            }
                                        },
                                        "inputs": [
                                            {
                                                "name": "in1",
                                                "type": "signal",
                                                "digest": "in1",
                                                "displayName": "",
                                                "hot": 1,
                                                "docked": 0
                                            },
                                            {
                                                "name": "in2",
                                                "type": "signal",
                                                "digest": "in2",
                                                "displayName": "",
                                                "hot": 1,
                                                "docked": 0
                                            },
                                            {
                                                "name": "in3",
                                                "type": [ "bang", "number", "list" ],
                                                "digest": "in3",
                                                "displayName": "",
                                                "hot": 1,
                                                "docked": 0
                                            }
                                        ],
                                        "outputs": [
                                            {
                                                "name": "out1",
                                                "type": "signal",
                                                "digest": "out1",
                                                "displayName": "",
                                                "docked": 0
                                            },
                                            {
                                                "name": "out2",
                                                "type": "signal",
                                                "digest": "out2",
                                                "displayName": "",
                                                "docked": 0
                                            }
                                        ],
                                        "helpname": "patcher",
                                        "aliasOf": "rnbo",
                                        "classname": "p",
                                        "operator": 0,
                                        "versionId": 426236520,
                                        "changesPatcherIO": 0
                                    },
                                    "saved_attribute_attributes": {
                                        "color": {
                                            "expression": "themecolor.theme_color"
                                        }
                                    },
                                    "saved_newobj_attribute_attributes": {
                                        "color": {
                                            "expression": "themecolor.theme_color"
                                        }
                                    },
                                    "text": "p @title Lookahead~",
                                    "varname": "Lookahead~"
                                }
                            },
                            {
                                "box": {
                                    "id": "obj-6",
                                    "maxclass": "newobj",
                                    "numinlets": 2,
                                    "numoutlets": 2,
                                    "outlettype": [ "", "" ],
                                    "patching_rect": [ 170.0, 190.0, 99.0, 23.0 ],
                                    "rnbo_classname": "param",
                                    "rnbo_extra_attributes": {
                                        "meta": "",
                                        "tonormalized": "",
                                        "ctlin": 1.0,
                                        "maximum": 100.0,
                                        "enum": "",
                                        "fromnormalized": "",
                                        "minimum": 0.0,
                                        "steps": 0.0,
                                        "unit": "%",
                                        "order": "1",
                                        "displayorder": "-",
                                        "preset": 1,
                                        "displayname": "Lookahead",
                                        "sendinit": 1,
                                        "exponent": 1.0
                                    },
                                    "rnbo_serial": 1,
                                    "rnbo_uniqueid": "lookahead",
                                    "rnboinfo": {
                                        "needsInstanceInfo": 1,
                                        "argnames": {
                                            "value": {
                                                "attrOrProp": 1,
                                                "digest": "Parameter value",
                                                "defaultarg": 2,
                                                "isalias": 0,
                                                "aliases": [],
                                                "settable": 1,
                                                "attachable": 0,
                                                "isparam": 1,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "inlet": 1,
                                                "type": "number",
                                                "defaultValue": "50"
                                            },
                                            "normalizedvalue": {
                                                "attrOrProp": 1,
                                                "digest": "Set value normalized. ",
                                                "isalias": 0,
                                                "aliases": [],
                                                "attachable": 0,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "inlet": 1,
                                                "type": "number"
                                            },
                                            "reset": {
                                                "attrOrProp": 1,
                                                "digest": "Reset param to initial value",
                                                "isalias": 0,
                                                "aliases": [],
                                                "attachable": 1,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "type": "bang"
                                            },
                                            "normalized": {
                                                "attrOrProp": 1,
                                                "digest": "Normalized parameter value.",
                                                "isalias": 0,
                                                "aliases": [],
                                                "attachable": 0,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "outlet": 1,
                                                "type": "number"
                                            },
                                            "name": {
                                                "attrOrProp": 2,
                                                "digest": "Name of the parameter",
                                                "defaultarg": 1,
                                                "isalias": 0,
                                                "aliases": [],
                                                "settable": 1,
                                                "attachable": 0,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "type": "symbol",
                                                "label": "Parameter Name",
                                                "mandatory": 1
                                            },
                                            "enum": {
                                                "attrOrProp": 2,
                                                "digest": "Use an enumerated output",
                                                "isalias": 0,
                                                "aliases": [],
                                                "settable": 1,
                                                "attachable": 0,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "type": "list",
                                                "label": "Enum Values",
                                                "displayorder": 6
                                            },
                                            "minimum": {
                                                "attrOrProp": 2,
                                                "digest": "Minimum value",
                                                "isalias": 0,
                                                "aliases": [ "min" ],
                                                "settable": 1,
                                                "attachable": 0,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "type": "number",
                                                "defaultValue": "0",
                                                "label": "Minimum",
                                                "displayorder": 1
                                            },
                                            "min": {
                                                "attrOrProp": 2,
                                                "digest": "Minimum value",
                                                "isalias": 1,
                                                "aliasOf": "minimum",
                                                "aliases": [],
                                                "settable": 1,
                                                "attachable": 0,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "type": "number",
                                                "defaultValue": "0",
                                                "label": "Minimum",
                                                "displayorder": 1
                                            },
                                            "maximum": {
                                                "attrOrProp": 2,
                                                "digest": "Maximum value",
                                                "isalias": 0,
                                                "aliases": [ "max" ],
                                                "settable": 1,
                                                "attachable": 0,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "type": "number",
                                                "defaultValue": "1",
                                                "label": "Maximum",
                                                "displayorder": 2
                                            },
                                            "max": {
                                                "attrOrProp": 2,
                                                "digest": "Maximum value",
                                                "isalias": 1,
                                                "aliasOf": "maximum",
                                                "aliases": [],
                                                "settable": 1,
                                                "attachable": 0,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "type": "number",
                                                "defaultValue": "1",
                                                "label": "Maximum",
                                                "displayorder": 2
                                            },
                                            "exponent": {
                                                "attrOrProp": 2,
                                                "digest": "Scale values exponentially",
                                                "isalias": 0,
                                                "aliases": [],
                                                "settable": 1,
                                                "attachable": 0,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "type": "number",
                                                "defaultValue": "1",
                                                "label": "Exponent",
                                                "displayorder": 7
                                            },
                                            "steps": {
                                                "attrOrProp": 2,
                                                "digest": "Divide the output into a number of discrete steps",
                                                "isalias": 0,
                                                "aliases": [],
                                                "settable": 1,
                                                "attachable": 0,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "type": "number",
                                                "defaultValue": "0",
                                                "label": "Steps",
                                                "displayorder": 8
                                            },
                                            "displayName": {
                                                "attrOrProp": 2,
                                                "digest": "DEPRECATED: Use the lower case 'displayname' instead",
                                                "isalias": 0,
                                                "aliases": [],
                                                "settable": 1,
                                                "attachable": 0,
                                                "isparam": 0,
                                                "deprecated": 1,
                                                "touched": 0,
                                                "type": "symbol",
                                                "label": "Display Name"
                                            },
                                            "displayname": {
                                                "attrOrProp": 2,
                                                "digest": "A more readable name for the parameter in an external RNBO target",
                                                "isalias": 0,
                                                "aliases": [],
                                                "settable": 1,
                                                "attachable": 0,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "type": "symbol",
                                                "defaultValue": "",
                                                "label": "Display Name",
                                                "displayorder": 14
                                            },
                                            "unit": {
                                                "attrOrProp": 2,
                                                "digest": "A symbol to describe the unit of the parameter in an external RNBO target",
                                                "isalias": 0,
                                                "aliases": [],
                                                "settable": 1,
                                                "attachable": 0,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "type": "symbol",
                                                "defaultValue": "",
                                                "label": "Unit",
                                                "displayorder": 15
                                            },
                                            "tonormalized": {
                                                "attrOrProp": 2,
                                                "digest": "Converts a real parameter value to its normalized form",
                                                "isalias": 0,
                                                "aliases": [],
                                                "settable": 1,
                                                "attachable": 0,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "type": "symbol",
                                                "label": "To Normalized Expression",
                                                "displayorder": 10
                                            },
                                            "fromnormalized": {
                                                "attrOrProp": 2,
                                                "digest": "Converts a normalized parameter into its actual parameter value",
                                                "isalias": 0,
                                                "aliases": [],
                                                "settable": 1,
                                                "attachable": 0,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "type": "symbol",
                                                "label": "From Normalized Expression",
                                                "displayorder": 9
                                            },
                                            "order": {
                                                "attrOrProp": 2,
                                                "digest": "Order in which initial parameter values will be sent out on patcher load. The order can be numeric or symbolic ('first' and 'last')",
                                                "isalias": 0,
                                                "aliases": [],
                                                "settable": 1,
                                                "attachable": 0,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "type": "symbol",
                                                "defaultValue": "0",
                                                "label": "Restore Order",
                                                "displayorder": 12
                                            },
                                            "displayorder": {
                                                "attrOrProp": 2,
                                                "digest": "Order in which parameters will show up in a list of all parameters. The order can be numeric or symbolic ('first' and 'last')",
                                                "isalias": 0,
                                                "aliases": [],
                                                "settable": 1,
                                                "attachable": 0,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "type": "symbol",
                                                "defaultValue": "-",
                                                "label": "Display Order",
                                                "displayorder": 13
                                            },
                                            "sendinit": {
                                                "attrOrProp": 2,
                                                "digest": "Send initial value",
                                                "isalias": 0,
                                                "aliases": [],
                                                "settable": 1,
                                                "attachable": 0,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "type": "bool",
                                                "defaultValue": "true",
                                                "label": "Send Init",
                                                "displayorder": 4
                                            },
                                            "ctlin": {
                                                "attrOrProp": 2,
                                                "digest": "MIDI controller number to control this parameter.",
                                                "isalias": 0,
                                                "aliases": [],
                                                "settable": 1,
                                                "attachable": 0,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "type": "number",
                                                "defaultValue": "-1",
                                                "label": "MIDI Controller Number.",
                                                "displayorder": 16
                                            },
                                            "meta": {
                                                "attrOrProp": 2,
                                                "digest": "A JSON formatted string containing metadata for use by the exported code",
                                                "isalias": 0,
                                                "aliases": [],
                                                "settable": 1,
                                                "attachable": 0,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "type": "symbol",
                                                "defaultValue": "",
                                                "label": "Metadata",
                                                "displayorder": 17
                                            },
                                            "nopreset": {
                                                "attrOrProp": 2,
                                                "digest": "Do not add this value to the preset [DEPRECATED - USE @preset 0 instead].",
                                                "isalias": 0,
                                                "aliases": [],
                                                "settable": 1,
                                                "attachable": 0,
                                                "isparam": 0,
                                                "deprecated": 1,
                                                "touched": 0,
                                                "type": "bool",
                                                "defaultValue": "false"
                                            },
                                            "preset": {
                                                "attrOrProp": 2,
                                                "digest": "Add this value to the preset.",
                                                "isalias": 0,
                                                "aliases": [],
                                                "settable": 1,
                                                "attachable": 0,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "type": "bool",
                                                "defaultValue": "true",
                                                "label": "Include In Preset",
                                                "displayorder": 11
                                            }
                                        },
                                        "inputs": [
                                            {
                                                "name": "value",
                                                "type": "number",
                                                "digest": "Parameter value",
                                                "defaultarg": 2,
                                                "hot": 1,
                                                "docked": 0
                                            },
                                            {
                                                "name": "normalizedvalue",
                                                "type": "number",
                                                "digest": "Set value normalized. ",
                                                "docked": 0
                                            }
                                        ],
                                        "outputs": [
                                            {
                                                "name": "value",
                                                "type": "number",
                                                "digest": "Parameter value",
                                                "defaultarg": 2,
                                                "hot": 1,
                                                "docked": 0
                                            },
                                            {
                                                "name": "normalized",
                                                "type": "number",
                                                "digest": "Normalized parameter value.",
                                                "docked": 0
                                            }
                                        ],
                                        "helpname": "param",
                                        "aliasOf": "param",
                                        "classname": "param",
                                        "operator": 0,
                                        "versionId": -1661410411,
                                        "changesPatcherIO": 0
                                    },
                                    "text": "param lookahead",
                                    "varname": "lookahead"
                                }
                            },
                            {
                                "box": {
                                    "id": "obj-19",
                                    "maxclass": "newobj",
                                    "numinlets": 2,
                                    "numoutlets": 2,
                                    "outlettype": [ "", "" ],
                                    "patching_rect": [ 370.0, 220.0, 68.0, 23.0 ],
                                    "rnbo_classname": "param",
                                    "rnbo_extra_attributes": {
                                        "meta": "",
                                        "tonormalized": "",
                                        "ctlin": 3.0,
                                        "maximum": 100.0,
                                        "enum": "",
                                        "fromnormalized": "",
                                        "minimum": 0.0,
                                        "steps": 0.0,
                                        "unit": "%",
                                        "order": "3",
                                        "displayorder": "-",
                                        "preset": 1,
                                        "displayname": "Time",
                                        "sendinit": 1,
                                        "exponent": 1.0
                                    },
                                    "rnbo_serial": 2,
                                    "rnbo_uniqueid": "time",
                                    "rnboinfo": {
                                        "needsInstanceInfo": 1,
                                        "argnames": {
                                            "value": {
                                                "attrOrProp": 1,
                                                "digest": "Parameter value",
                                                "defaultarg": 2,
                                                "isalias": 0,
                                                "aliases": [],
                                                "settable": 1,
                                                "attachable": 0,
                                                "isparam": 1,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "inlet": 1,
                                                "type": "number",
                                                "defaultValue": "50"
                                            },
                                            "normalizedvalue": {
                                                "attrOrProp": 1,
                                                "digest": "Set value normalized. ",
                                                "isalias": 0,
                                                "aliases": [],
                                                "attachable": 0,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "inlet": 1,
                                                "type": "number"
                                            },
                                            "reset": {
                                                "attrOrProp": 1,
                                                "digest": "Reset param to initial value",
                                                "isalias": 0,
                                                "aliases": [],
                                                "attachable": 1,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "type": "bang"
                                            },
                                            "normalized": {
                                                "attrOrProp": 1,
                                                "digest": "Normalized parameter value.",
                                                "isalias": 0,
                                                "aliases": [],
                                                "attachable": 0,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "outlet": 1,
                                                "type": "number"
                                            },
                                            "name": {
                                                "attrOrProp": 2,
                                                "digest": "Name of the parameter",
                                                "defaultarg": 1,
                                                "isalias": 0,
                                                "aliases": [],
                                                "settable": 1,
                                                "attachable": 0,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "type": "symbol",
                                                "label": "Parameter Name",
                                                "mandatory": 1
                                            },
                                            "enum": {
                                                "attrOrProp": 2,
                                                "digest": "Use an enumerated output",
                                                "isalias": 0,
                                                "aliases": [],
                                                "settable": 1,
                                                "attachable": 0,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "type": "list",
                                                "label": "Enum Values",
                                                "displayorder": 6
                                            },
                                            "minimum": {
                                                "attrOrProp": 2,
                                                "digest": "Minimum value",
                                                "isalias": 0,
                                                "aliases": [ "min" ],
                                                "settable": 1,
                                                "attachable": 0,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "type": "number",
                                                "defaultValue": "0",
                                                "label": "Minimum",
                                                "displayorder": 1
                                            },
                                            "min": {
                                                "attrOrProp": 2,
                                                "digest": "Minimum value",
                                                "isalias": 1,
                                                "aliasOf": "minimum",
                                                "aliases": [],
                                                "settable": 1,
                                                "attachable": 0,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "type": "number",
                                                "defaultValue": "0",
                                                "label": "Minimum",
                                                "displayorder": 1
                                            },
                                            "maximum": {
                                                "attrOrProp": 2,
                                                "digest": "Maximum value",
                                                "isalias": 0,
                                                "aliases": [ "max" ],
                                                "settable": 1,
                                                "attachable": 0,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "type": "number",
                                                "defaultValue": "1",
                                                "label": "Maximum",
                                                "displayorder": 2
                                            },
                                            "max": {
                                                "attrOrProp": 2,
                                                "digest": "Maximum value",
                                                "isalias": 1,
                                                "aliasOf": "maximum",
                                                "aliases": [],
                                                "settable": 1,
                                                "attachable": 0,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "type": "number",
                                                "defaultValue": "1",
                                                "label": "Maximum",
                                                "displayorder": 2
                                            },
                                            "exponent": {
                                                "attrOrProp": 2,
                                                "digest": "Scale values exponentially",
                                                "isalias": 0,
                                                "aliases": [],
                                                "settable": 1,
                                                "attachable": 0,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "type": "number",
                                                "defaultValue": "1",
                                                "label": "Exponent",
                                                "displayorder": 7
                                            },
                                            "steps": {
                                                "attrOrProp": 2,
                                                "digest": "Divide the output into a number of discrete steps",
                                                "isalias": 0,
                                                "aliases": [],
                                                "settable": 1,
                                                "attachable": 0,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "type": "number",
                                                "defaultValue": "0",
                                                "label": "Steps",
                                                "displayorder": 8
                                            },
                                            "displayName": {
                                                "attrOrProp": 2,
                                                "digest": "DEPRECATED: Use the lower case 'displayname' instead",
                                                "isalias": 0,
                                                "aliases": [],
                                                "settable": 1,
                                                "attachable": 0,
                                                "isparam": 0,
                                                "deprecated": 1,
                                                "touched": 0,
                                                "type": "symbol",
                                                "label": "Display Name"
                                            },
                                            "displayname": {
                                                "attrOrProp": 2,
                                                "digest": "A more readable name for the parameter in an external RNBO target",
                                                "isalias": 0,
                                                "aliases": [],
                                                "settable": 1,
                                                "attachable": 0,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "type": "symbol",
                                                "defaultValue": "",
                                                "label": "Display Name",
                                                "displayorder": 14
                                            },
                                            "unit": {
                                                "attrOrProp": 2,
                                                "digest": "A symbol to describe the unit of the parameter in an external RNBO target",
                                                "isalias": 0,
                                                "aliases": [],
                                                "settable": 1,
                                                "attachable": 0,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "type": "symbol",
                                                "defaultValue": "",
                                                "label": "Unit",
                                                "displayorder": 15
                                            },
                                            "tonormalized": {
                                                "attrOrProp": 2,
                                                "digest": "Converts a real parameter value to its normalized form",
                                                "isalias": 0,
                                                "aliases": [],
                                                "settable": 1,
                                                "attachable": 0,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "type": "symbol",
                                                "label": "To Normalized Expression",
                                                "displayorder": 10
                                            },
                                            "fromnormalized": {
                                                "attrOrProp": 2,
                                                "digest": "Converts a normalized parameter into its actual parameter value",
                                                "isalias": 0,
                                                "aliases": [],
                                                "settable": 1,
                                                "attachable": 0,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "type": "symbol",
                                                "label": "From Normalized Expression",
                                                "displayorder": 9
                                            },
                                            "order": {
                                                "attrOrProp": 2,
                                                "digest": "Order in which initial parameter values will be sent out on patcher load. The order can be numeric or symbolic ('first' and 'last')",
                                                "isalias": 0,
                                                "aliases": [],
                                                "settable": 1,
                                                "attachable": 0,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "type": "symbol",
                                                "defaultValue": "0",
                                                "label": "Restore Order",
                                                "displayorder": 12
                                            },
                                            "displayorder": {
                                                "attrOrProp": 2,
                                                "digest": "Order in which parameters will show up in a list of all parameters. The order can be numeric or symbolic ('first' and 'last')",
                                                "isalias": 0,
                                                "aliases": [],
                                                "settable": 1,
                                                "attachable": 0,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "type": "symbol",
                                                "defaultValue": "-",
                                                "label": "Display Order",
                                                "displayorder": 13
                                            },
                                            "sendinit": {
                                                "attrOrProp": 2,
                                                "digest": "Send initial value",
                                                "isalias": 0,
                                                "aliases": [],
                                                "settable": 1,
                                                "attachable": 0,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "type": "bool",
                                                "defaultValue": "true",
                                                "label": "Send Init",
                                                "displayorder": 4
                                            },
                                            "ctlin": {
                                                "attrOrProp": 2,
                                                "digest": "MIDI controller number to control this parameter.",
                                                "isalias": 0,
                                                "aliases": [],
                                                "settable": 1,
                                                "attachable": 0,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "type": "number",
                                                "defaultValue": "-1",
                                                "label": "MIDI Controller Number.",
                                                "displayorder": 16
                                            },
                                            "meta": {
                                                "attrOrProp": 2,
                                                "digest": "A JSON formatted string containing metadata for use by the exported code",
                                                "isalias": 0,
                                                "aliases": [],
                                                "settable": 1,
                                                "attachable": 0,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "type": "symbol",
                                                "defaultValue": "",
                                                "label": "Metadata",
                                                "displayorder": 17
                                            },
                                            "nopreset": {
                                                "attrOrProp": 2,
                                                "digest": "Do not add this value to the preset [DEPRECATED - USE @preset 0 instead].",
                                                "isalias": 0,
                                                "aliases": [],
                                                "settable": 1,
                                                "attachable": 0,
                                                "isparam": 0,
                                                "deprecated": 1,
                                                "touched": 0,
                                                "type": "bool",
                                                "defaultValue": "false"
                                            },
                                            "preset": {
                                                "attrOrProp": 2,
                                                "digest": "Add this value to the preset.",
                                                "isalias": 0,
                                                "aliases": [],
                                                "settable": 1,
                                                "attachable": 0,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "type": "bool",
                                                "defaultValue": "true",
                                                "label": "Include In Preset",
                                                "displayorder": 11
                                            }
                                        },
                                        "inputs": [
                                            {
                                                "name": "value",
                                                "type": "number",
                                                "digest": "Parameter value",
                                                "defaultarg": 2,
                                                "hot": 1,
                                                "docked": 0
                                            },
                                            {
                                                "name": "normalizedvalue",
                                                "type": "number",
                                                "digest": "Set value normalized. ",
                                                "docked": 0
                                            }
                                        ],
                                        "outputs": [
                                            {
                                                "name": "value",
                                                "type": "number",
                                                "digest": "Parameter value",
                                                "defaultarg": 2,
                                                "hot": 1,
                                                "docked": 0
                                            },
                                            {
                                                "name": "normalized",
                                                "type": "number",
                                                "digest": "Normalized parameter value.",
                                                "docked": 0
                                            }
                                        ],
                                        "helpname": "param",
                                        "aliasOf": "param",
                                        "classname": "param",
                                        "operator": 0,
                                        "versionId": -1661410411,
                                        "changesPatcherIO": 0
                                    },
                                    "text": "param time",
                                    "varname": "time"
                                }
                            },
                            {
                                "box": {
                                    "fontface": 1,
                                    "id": "obj-119",
                                    "maxclass": "flonum",
                                    "maximum": 100.0,
                                    "minimum": 0.0,
                                    "numinlets": 1,
                                    "numoutlets": 2,
                                    "outlettype": [ "", "bang" ],
                                    "parameter_enable": 0,
                                    "patching_rect": [ 370.0, 250.0, 50.0, 23.0 ],
                                    "rnbo_classname": "number",
                                    "rnbo_extra_attributes": {
                                        "maximum": 100.0,
                                        "initialFormat": "float",
                                        "minimum": 0.0,
                                        "order": "",
                                        "preset": 0
                                    },
                                    "rnbo_serial": 1,
                                    "rnbo_uniqueid": "number_obj-119",
                                    "saved_attribute_attributes": {
                                        "textcolor": {
                                            "expression": "themecolor.theme_selectioncolor"
                                        }
                                    },
                                    "textcolor": [ 0.922234290352602, 0.71007200526417, 0.329758341965716, 1.0 ]
                                }
                            },
                            {
                                "box": {
                                    "color": [ 0.618934978328545, 0.744701397656435, 0.953750108255376, 1.0 ],
                                    "id": "obj-100",
                                    "linecount": 2,
                                    "maxclass": "newobj",
                                    "numinlets": 3,
                                    "numoutlets": 1,
                                    "outlettype": [ "signal" ],
                                    "patcher": {
                                        "fileversion": 1,
                                        "appversion": {
                                            "major": 9,
                                            "minor": 1,
                                            "revision": 2,
                                            "architecture": "x64",
                                            "modernui": 1
                                        },
                                        "classnamespace": "rnbo",
                                        "rect": [ 34.0, 100.0, 593.0, 768.0 ],
                                        "default_fontname": "Lato",
                                        "gridonopen": 2,
                                        "gridsize": [ 10.0, 10.0 ],
                                        "gridsnaponopen": 2,
                                        "objectsnaponopen": 0,
                                        "subpatcher_template": "MP-Rnbo",
                                        "integercoordinates": 1,
                                        "title": "VolumeRamp~",
                                        "boxes": [
                                            {
                                                "box": {
                                                    "id": "obj-124",
                                                    "maxclass": "newobj",
                                                    "numinlets": 3,
                                                    "numoutlets": 1,
                                                    "outlettype": [ "signal" ],
                                                    "patching_rect": [ 240.0, 640.0, 59.0, 23.0 ],
                                                    "rnbo_classname": "clip~",
                                                    "rnbo_serial": 1,
                                                    "rnbo_uniqueid": "clip~_obj-124",
                                                    "text": "clip~ 0. 1."
                                                }
                                            },
                                            {
                                                "box": {
                                                    "id": "obj-84",
                                                    "maxclass": "flonum",
                                                    "numinlets": 1,
                                                    "numoutlets": 2,
                                                    "outlettype": [ "", "bang" ],
                                                    "parameter_enable": 0,
                                                    "patching_rect": [ 320.0, 130.0, 50.0, 23.0 ],
                                                    "rnbo_classname": "number",
                                                    "rnbo_extra_attributes": {
                                                        "maximum": "<none>",
                                                        "initialFormat": "float",
                                                        "minimum": "<none>",
                                                        "order": "",
                                                        "preset": 0
                                                    },
                                                    "rnbo_serial": 1,
                                                    "rnbo_uniqueid": "number_obj-84"
                                                }
                                            },
                                            {
                                                "box": {
                                                    "id": "obj-83",
                                                    "maxclass": "newobj",
                                                    "numinlets": 6,
                                                    "numoutlets": 1,
                                                    "outlettype": [ "" ],
                                                    "patching_rect": [ 320.0, 160.0, 120.0, 23.0 ],
                                                    "rnbo_classname": "scale",
                                                    "rnbo_serial": 1,
                                                    "rnbo_uniqueid": "scale_obj-83",
                                                    "text": "scale 0. 100. 0. 0.5 1."
                                                }
                                            },
                                            {
                                                "box": {
                                                    "id": "obj-22",
                                                    "maxclass": "flonum",
                                                    "maximum": 1.0,
                                                    "minimum": -1.0,
                                                    "numinlets": 1,
                                                    "numoutlets": 2,
                                                    "outlettype": [ "", "bang" ],
                                                    "parameter_enable": 0,
                                                    "patching_rect": [ 320.0, 190.0, 50.0, 23.0 ],
                                                    "rnbo_classname": "number",
                                                    "rnbo_extra_attributes": {
                                                        "maximum": 1.0,
                                                        "initialFormat": "float",
                                                        "minimum": -1.0,
                                                        "order": "",
                                                        "preset": 0
                                                    },
                                                    "rnbo_serial": 2,
                                                    "rnbo_uniqueid": "number_obj-22"
                                                }
                                            },
                                            {
                                                "box": {
                                                    "id": "obj-120",
                                                    "linecount": 2,
                                                    "maxclass": "newobj",
                                                    "numinlets": 6,
                                                    "numoutlets": 1,
                                                    "outlettype": [ "" ],
                                                    "patching_rect": [ 180.0, 140.0, 110.0, 37.0 ],
                                                    "rnbo_classname": "scale",
                                                    "rnbo_serial": 2,
                                                    "rnbo_uniqueid": "scale_obj-120",
                                                    "text": "scale 0. 100. 150. 1500. 1.9475"
                                                }
                                            },
                                            {
                                                "box": {
                                                    "id": "obj-121",
                                                    "maxclass": "flonum",
                                                    "numinlets": 1,
                                                    "numoutlets": 2,
                                                    "outlettype": [ "", "bang" ],
                                                    "parameter_enable": 0,
                                                    "patching_rect": [ 180.0, 190.0, 50.0, 23.0 ],
                                                    "rnbo_classname": "number",
                                                    "rnbo_extra_attributes": {
                                                        "maximum": "<none>",
                                                        "initialFormat": "float",
                                                        "minimum": "<none>",
                                                        "order": "",
                                                        "preset": 0
                                                    },
                                                    "rnbo_serial": 3,
                                                    "rnbo_uniqueid": "number_obj-121"
                                                }
                                            },
                                            {
                                                "box": {
                                                    "bufsize": 128.0,
                                                    "calccount": 128.0,
                                                    "gridcolor": [ 0.505882352941176, 0.564705882352941, 0.666666666666667, 0.25 ],
                                                    "id": "obj-11",
                                                    "maxclass": "scope~",
                                                    "numinlets": 2,
                                                    "numoutlets": 0,
                                                    "patching_rect": [ 150.0, 640.0, 60.0, 40.0 ],
                                                    "range": [ -0.01, 1.009999990463257 ],
                                                    "rnbo_classname": "scope~",
                                                    "rnbo_extra_attributes": {
                                                        "bufsize": 128.0,
                                                        "calccount": 128.0
                                                    },
                                                    "rnbo_serial": 1,
                                                    "rnbo_uniqueid": "scope~_obj-11"
                                                }
                                            },
                                            {
                                                "box": {
                                                    "id": "obj-10",
                                                    "maxclass": "newobj",
                                                    "numinlets": 0,
                                                    "numoutlets": 1,
                                                    "outlettype": [ "" ],
                                                    "patching_rect": [ 180.0, 81.0, 28.0, 23.0 ],
                                                    "rnbo_classname": "in",
                                                    "rnbo_extra_attributes": {
                                                        "meta": "",
                                                        "comment": ""
                                                    },
                                                    "rnbo_serial": 1,
                                                    "rnbo_uniqueid": "in_obj-10",
                                                    "rnboinfo": {
                                                        "needsInstanceInfo": 1,
                                                        "argnames": {
                                                            "index": {
                                                                "attrOrProp": 2,
                                                                "digest": "inlet number",
                                                                "defaultarg": 1,
                                                                "isalias": 0,
                                                                "aliases": [],
                                                                "settable": 1,
                                                                "attachable": 0,
                                                                "isparam": 0,
                                                                "deprecated": 0,
                                                                "touched": 0,
                                                                "type": "number",
                                                                "mandatory": 1
                                                            },
                                                            "comment": {
                                                                "attrOrProp": 2,
                                                                "digest": "mouse over comment",
                                                                "isalias": 0,
                                                                "aliases": [],
                                                                "settable": 1,
                                                                "attachable": 0,
                                                                "isparam": 0,
                                                                "deprecated": 0,
                                                                "touched": 0,
                                                                "type": "symbol"
                                                            },
                                                            "meta": {
                                                                "attrOrProp": 2,
                                                                "digest": "A JSON formatted string containing metadata for use by the exported code",
                                                                "isalias": 0,
                                                                "aliases": [],
                                                                "settable": 1,
                                                                "attachable": 0,
                                                                "isparam": 0,
                                                                "deprecated": 0,
                                                                "touched": 0,
                                                                "type": "symbol",
                                                                "defaultValue": "",
                                                                "label": "Metadata",
                                                                "displayorder": 3
                                                            }
                                                        },
                                                        "inputs": [],
                                                        "outputs": [
                                                            {
                                                                "name": "out1",
                                                                "type": [ "bang", "number", "list" ],
                                                                "digest": "value from inlet with index 2",
                                                                "displayName": "",
                                                                "docked": 0
                                                            }
                                                        ],
                                                        "helpname": "in",
                                                        "aliasOf": "in",
                                                        "classname": "in",
                                                        "operator": 0,
                                                        "versionId": 475235762,
                                                        "changesPatcherIO": 1
                                                    },
                                                    "text": "in 2"
                                                }
                                            },
                                            {
                                                "box": {
                                                    "id": "obj-8",
                                                    "maxclass": "flonum",
                                                    "numinlets": 1,
                                                    "numoutlets": 2,
                                                    "outlettype": [ "", "bang" ],
                                                    "parameter_enable": 0,
                                                    "patching_rect": [ 180.0, 110.0, 50.0, 23.0 ],
                                                    "rnbo_classname": "number",
                                                    "rnbo_extra_attributes": {
                                                        "maximum": "<none>",
                                                        "initialFormat": "float",
                                                        "minimum": "<none>",
                                                        "order": "",
                                                        "preset": 0
                                                    },
                                                    "rnbo_serial": 4,
                                                    "rnbo_uniqueid": "number_obj-8"
                                                }
                                            },
                                            {
                                                "box": {
                                                    "id": "obj-3",
                                                    "maxclass": "button",
                                                    "numinlets": 1,
                                                    "numoutlets": 1,
                                                    "outlettype": [ "bang" ],
                                                    "parameter_enable": 0,
                                                    "patching_rect": [ 90.0, 190.5, 24.0, 24.0 ],
                                                    "rnbo_classname": "button",
                                                    "rnbo_serial": 1,
                                                    "rnbo_uniqueid": "button_obj-3"
                                                }
                                            },
                                            {
                                                "box": {
                                                    "id": "obj-13",
                                                    "maxclass": "newobj",
                                                    "numinlets": 2,
                                                    "numoutlets": 2,
                                                    "outlettype": [ "signal", "" ],
                                                    "patching_rect": [ 320.0, 220.0, 139.0, 23.0 ],
                                                    "rnbo_classname": "fade~",
                                                    "rnbo_serial": 1,
                                                    "rnbo_uniqueid": "fade~_obj-13",
                                                    "rnboinfo": {
                                                        "needsInstanceInfo": 1,
                                                        "argnames": {
                                                            "segments": {
                                                                "attrOrProp": 1,
                                                                "digest": "Target value or target value/ramp time pairs",
                                                                "isalias": 0,
                                                                "aliases": [ "dest" ],
                                                                "settable": 1,
                                                                "attachable": 0,
                                                                "isparam": 0,
                                                                "deprecated": 0,
                                                                "touched": 0,
                                                                "inlet": 1,
                                                                "type": "list",
                                                                "defaultValue": ""
                                                            },
                                                            "dest": {
                                                                "attrOrProp": 1,
                                                                "digest": "Target value or target value/ramp time pairs",
                                                                "isalias": 1,
                                                                "aliasOf": "segments",
                                                                "aliases": [],
                                                                "settable": 1,
                                                                "attachable": 0,
                                                                "isparam": 0,
                                                                "deprecated": 0,
                                                                "touched": 0,
                                                                "inlet": 1,
                                                                "type": "list",
                                                                "defaultValue": ""
                                                            },
                                                            "time": {
                                                                "attrOrProp": 1,
                                                                "digest": "Ramp time",
                                                                "defaultarg": 2,
                                                                "isalias": 0,
                                                                "aliases": [],
                                                                "settable": 1,
                                                                "attachable": 0,
                                                                "isparam": 0,
                                                                "deprecated": 0,
                                                                "touched": 0,
                                                                "inlet": 1,
                                                                "type": "number",
                                                                "defaultValue": "0"
                                                            },
                                                            "keepramp": {
                                                                "attrOrProp": 1,
                                                                "digest": "Keep last ramp",
                                                                "isalias": 0,
                                                                "aliases": [],
                                                                "settable": 1,
                                                                "attachable": 1,
                                                                "isparam": 0,
                                                                "deprecated": 0,
                                                                "touched": 0,
                                                                "type": "bool",
                                                                "defaultValue": "false"
                                                            },
                                                            "out": {
                                                                "attrOrProp": 1,
                                                                "digest": "Ramp out",
                                                                "isalias": 0,
                                                                "aliases": [],
                                                                "settable": 0,
                                                                "attachable": 0,
                                                                "isparam": 0,
                                                                "deprecated": 0,
                                                                "touched": 0,
                                                                "outlet": 1,
                                                                "type": "signal"
                                                            },
                                                            "target": {
                                                                "attrOrProp": 1,
                                                                "digest": "Bang when ramp has finished",
                                                                "isalias": 0,
                                                                "aliases": [],
                                                                "settable": 0,
                                                                "attachable": 0,
                                                                "isparam": 0,
                                                                "deprecated": 0,
                                                                "touched": 0,
                                                                "outlet": 1,
                                                                "type": "bang"
                                                            },
                                                            "value": {
                                                                "attrOrProp": 2,
                                                                "digest": "Initial value.",
                                                                "defaultarg": 1,
                                                                "isalias": 0,
                                                                "aliases": [],
                                                                "settable": 1,
                                                                "attachable": 0,
                                                                "isparam": 0,
                                                                "deprecated": 0,
                                                                "touched": 0,
                                                                "type": "number",
                                                                "defaultValue": "0"
                                                            }
                                                        },
                                                        "inputs": [
                                                            {
                                                                "name": "segments",
                                                                "type": "list",
                                                                "digest": "Target value or target value/ramp time pairs",
                                                                "hot": 1,
                                                                "docked": 0
                                                            },
                                                            {
                                                                "name": "time",
                                                                "type": "number",
                                                                "digest": "Ramp time",
                                                                "defaultarg": 2,
                                                                "docked": 0
                                                            }
                                                        ],
                                                        "outputs": [
                                                            {
                                                                "name": "out",
                                                                "type": "signal",
                                                                "digest": "Ramp out",
                                                                "docked": 0
                                                            },
                                                            {
                                                                "name": "target",
                                                                "type": "bang",
                                                                "digest": "Bang when ramp has finished",
                                                                "docked": 0
                                                            }
                                                        ],
                                                        "helpname": "line~",
                                                        "aliasOf": "line~",
                                                        "classname": "fade~",
                                                        "operator": 0,
                                                        "versionId": 2134689829,
                                                        "changesPatcherIO": 0
                                                    },
                                                    "text": "fade~ 0. 10"
                                                }
                                            },
                                            {
                                                "box": {
                                                    "id": "obj-90",
                                                    "maxclass": "newobj",
                                                    "numinlets": 2,
                                                    "numoutlets": 1,
                                                    "outlettype": [ "signal" ],
                                                    "patching_rect": [ 240.0, 583.0, 40.0, 23.0 ],
                                                    "rnbo_classname": "*~",
                                                    "rnbo_serial": 1,
                                                    "rnbo_uniqueid": "*~_obj-90",
                                                    "text": "*~ 0.5"
                                                }
                                            },
                                            {
                                                "box": {
                                                    "id": "obj-75",
                                                    "maxclass": "newobj",
                                                    "numinlets": 2,
                                                    "numoutlets": 1,
                                                    "outlettype": [ "signal" ],
                                                    "patching_rect": [ 360.0, 291.0, 33.0, 23.0 ],
                                                    "rnbo_classname": "!-~",
                                                    "rnbo_serial": 1,
                                                    "rnbo_uniqueid": "!-~_obj-75",
                                                    "text": "!-~ 1"
                                                }
                                            },
                                            {
                                                "box": {
                                                    "id": "obj-85",
                                                    "maxclass": "newobj",
                                                    "numinlets": 2,
                                                    "numoutlets": 1,
                                                    "outlettype": [ "signal" ],
                                                    "patching_rect": [ 320.0, 291.0, 31.0, 23.0 ],
                                                    "rnbo_classname": "*~",
                                                    "rnbo_serial": 2,
                                                    "rnbo_uniqueid": "*~_obj-85",
                                                    "text": "*~ 2"
                                                }
                                            },
                                            {
                                                "box": {
                                                    "id": "obj-86",
                                                    "maxclass": "newobj",
                                                    "numinlets": 2,
                                                    "numoutlets": 1,
                                                    "outlettype": [ "signal" ],
                                                    "patching_rect": [ 320.0, 351.0, 29.5, 23.0 ],
                                                    "rnbo_classname": "/~",
                                                    "rnbo_serial": 1,
                                                    "rnbo_uniqueid": "/~_obj-86",
                                                    "text": "/~"
                                                }
                                            },
                                            {
                                                "box": {
                                                    "id": "obj-67",
                                                    "maxclass": "newobj",
                                                    "numinlets": 2,
                                                    "numoutlets": 1,
                                                    "outlettype": [ "signal" ],
                                                    "patching_rect": [ 240.0, 551.0, 32.0, 23.0 ],
                                                    "rnbo_classname": "+~",
                                                    "rnbo_serial": 1,
                                                    "rnbo_uniqueid": "+~_obj-67",
                                                    "text": "+~ 1"
                                                }
                                            },
                                            {
                                                "box": {
                                                    "id": "obj-69",
                                                    "maxclass": "newobj",
                                                    "numinlets": 1,
                                                    "numoutlets": 1,
                                                    "outlettype": [ "signal" ],
                                                    "patching_rect": [ 280.0, 351.0, 33.0, 23.0 ],
                                                    "rnbo_classname": "abs~",
                                                    "rnbo_serial": 1,
                                                    "rnbo_uniqueid": "abs~_obj-69",
                                                    "text": "abs~"
                                                }
                                            },
                                            {
                                                "box": {
                                                    "id": "obj-87",
                                                    "maxclass": "newobj",
                                                    "numinlets": 2,
                                                    "numoutlets": 1,
                                                    "outlettype": [ "signal" ],
                                                    "patching_rect": [ 280.0, 401.0, 29.5, 23.0 ],
                                                    "rnbo_classname": "*~",
                                                    "rnbo_serial": 3,
                                                    "rnbo_uniqueid": "*~_obj-87",
                                                    "text": "*~"
                                                }
                                            },
                                            {
                                                "box": {
                                                    "id": "obj-88",
                                                    "maxclass": "newobj",
                                                    "numinlets": 2,
                                                    "numoutlets": 1,
                                                    "outlettype": [ "signal" ],
                                                    "patching_rect": [ 320.0, 401.0, 32.0, 23.0 ],
                                                    "rnbo_classname": "+~",
                                                    "rnbo_serial": 2,
                                                    "rnbo_uniqueid": "+~_obj-88",
                                                    "text": "+~ 1"
                                                }
                                            },
                                            {
                                                "box": {
                                                    "id": "obj-89",
                                                    "maxclass": "newobj",
                                                    "numinlets": 2,
                                                    "numoutlets": 1,
                                                    "outlettype": [ "signal" ],
                                                    "patching_rect": [ 280.0, 451.0, 32.0, 23.0 ],
                                                    "rnbo_classname": "+~",
                                                    "rnbo_serial": 3,
                                                    "rnbo_uniqueid": "+~_obj-89",
                                                    "text": "+~ 1"
                                                }
                                            },
                                            {
                                                "box": {
                                                    "id": "obj-91",
                                                    "maxclass": "newobj",
                                                    "numinlets": 2,
                                                    "numoutlets": 1,
                                                    "outlettype": [ "signal" ],
                                                    "patching_rect": [ 240.0, 501.0, 29.5, 23.0 ],
                                                    "rnbo_classname": "/~",
                                                    "rnbo_serial": 2,
                                                    "rnbo_uniqueid": "/~_obj-91",
                                                    "text": "/~"
                                                }
                                            },
                                            {
                                                "box": {
                                                    "id": "obj-92",
                                                    "maxclass": "newobj",
                                                    "numinlets": 2,
                                                    "numoutlets": 1,
                                                    "outlettype": [ "signal" ],
                                                    "patching_rect": [ 240.0, 451.0, 29.5, 23.0 ],
                                                    "rnbo_classname": "*~",
                                                    "rnbo_serial": 4,
                                                    "rnbo_uniqueid": "*~_obj-92",
                                                    "text": "*~"
                                                }
                                            },
                                            {
                                                "box": {
                                                    "id": "obj-60",
                                                    "maxclass": "newobj",
                                                    "numinlets": 2,
                                                    "numoutlets": 2,
                                                    "outlettype": [ "signal", "signal" ],
                                                    "patching_rect": [ 90.0, 290.0, 118.0, 23.0 ],
                                                    "rnbo_classname": "cycle~",
                                                    "rnbo_extra_attributes": {
                                                        "interp": "linear",
                                                        "buffername": "RNBODefaultSinus"
                                                    },
                                                    "rnbo_serial": 1,
                                                    "rnbo_uniqueid": "cycle~_obj-60",
                                                    "text": "cycle~ @index phase"
                                                }
                                            },
                                            {
                                                "box": {
                                                    "id": "obj-36",
                                                    "maxclass": "newobj",
                                                    "numinlets": 4,
                                                    "numoutlets": 1,
                                                    "outlettype": [ "" ],
                                                    "patching_rect": [ 90.0, 221.0, 109.0, 23.0 ],
                                                    "rnbo_classname": "pack",
                                                    "rnbo_extra_attributes": {
                                                        "list": "",
                                                        "length": 0.0
                                                    },
                                                    "rnbo_serial": 1,
                                                    "rnbo_uniqueid": "pack_obj-36",
                                                    "rnboinfo": {
                                                        "needsInstanceInfo": 1,
                                                        "argnames": {
                                                            "out": {
                                                                "attrOrProp": 1,
                                                                "digest": "out",
                                                                "isalias": 0,
                                                                "aliases": [],
                                                                "attachable": 0,
                                                                "isparam": 0,
                                                                "deprecated": 0,
                                                                "touched": 0,
                                                                "outlet": 1,
                                                                "type": "list"
                                                            },
                                                            "in1": {
                                                                "attrOrProp": 1,
                                                                "digest": "number to be list element 1",
                                                                "defaultarg": 1,
                                                                "isalias": 0,
                                                                "aliases": [],
                                                                "attachable": 0,
                                                                "isparam": 0,
                                                                "deprecated": 0,
                                                                "touched": 0,
                                                                "inlet": 1,
                                                                "type": "number"
                                                            },
                                                            "in2": {
                                                                "attrOrProp": 1,
                                                                "digest": "number to be list element 2",
                                                                "defaultarg": 2,
                                                                "isalias": 0,
                                                                "aliases": [],
                                                                "attachable": 0,
                                                                "isparam": 0,
                                                                "deprecated": 0,
                                                                "touched": 0,
                                                                "inlet": 1,
                                                                "type": "number"
                                                            },
                                                            "in3": {
                                                                "attrOrProp": 1,
                                                                "digest": "number to be list element 3",
                                                                "defaultarg": 3,
                                                                "isalias": 0,
                                                                "aliases": [],
                                                                "attachable": 0,
                                                                "isparam": 0,
                                                                "deprecated": 0,
                                                                "touched": 0,
                                                                "inlet": 1,
                                                                "type": "number"
                                                            },
                                                            "in4": {
                                                                "attrOrProp": 1,
                                                                "digest": "number to be list element 4",
                                                                "defaultarg": 4,
                                                                "isalias": 0,
                                                                "aliases": [],
                                                                "attachable": 0,
                                                                "isparam": 0,
                                                                "deprecated": 0,
                                                                "touched": 0,
                                                                "inlet": 1,
                                                                "type": "number"
                                                            },
                                                            "length": {
                                                                "attrOrProp": 2,
                                                                "digest": "how many things to pack",
                                                                "isalias": 0,
                                                                "aliases": [],
                                                                "settable": 1,
                                                                "attachable": 0,
                                                                "isparam": 0,
                                                                "deprecated": 0,
                                                                "touched": 0,
                                                                "type": "number"
                                                            },
                                                            "list": {
                                                                "attrOrProp": 2,
                                                                "digest": "the list to initialize the {@objectname} object with",
                                                                "isalias": 0,
                                                                "aliases": [],
                                                                "settable": 1,
                                                                "attachable": 0,
                                                                "isparam": 0,
                                                                "deprecated": 0,
                                                                "touched": 0,
                                                                "type": "list"
                                                            }
                                                        },
                                                        "inputs": [
                                                            {
                                                                "name": "in1",
                                                                "type": [ "number", "bang" ],
                                                                "digest": "number to be list element 1",
                                                                "defaultarg": 1,
                                                                "hot": 1,
                                                                "docked": 0
                                                            },
                                                            {
                                                                "name": "in2",
                                                                "type": "number",
                                                                "digest": "number to be list element 2",
                                                                "defaultarg": 2,
                                                                "docked": 0
                                                            },
                                                            {
                                                                "name": "in3",
                                                                "type": "number",
                                                                "digest": "number to be list element 3",
                                                                "defaultarg": 3,
                                                                "docked": 0
                                                            },
                                                            {
                                                                "name": "in4",
                                                                "type": "number",
                                                                "digest": "number to be list element 4",
                                                                "defaultarg": 4,
                                                                "docked": 0
                                                            }
                                                        ],
                                                        "outputs": [
                                                            {
                                                                "name": "out",
                                                                "type": "list",
                                                                "digest": "out",
                                                                "docked": 0
                                                            }
                                                        ],
                                                        "helpname": "pack",
                                                        "aliasOf": "pack",
                                                        "classname": "pack",
                                                        "operator": 0,
                                                        "versionId": 1331432417,
                                                        "changesPatcherIO": 0
                                                    },
                                                    "text": "pack 0.5 5. 1. 500."
                                                }
                                            },
                                            {
                                                "box": {
                                                    "id": "obj-21",
                                                    "maxclass": "newobj",
                                                    "numinlets": 2,
                                                    "numoutlets": 2,
                                                    "outlettype": [ "signal", "" ],
                                                    "patching_rect": [ 90.0, 251.0, 139.0, 23.0 ],
                                                    "rnbo_classname": "fade~",
                                                    "rnbo_serial": 2,
                                                    "rnbo_uniqueid": "fade~_obj-21",
                                                    "rnboinfo": {
                                                        "needsInstanceInfo": 1,
                                                        "argnames": {
                                                            "segments": {
                                                                "attrOrProp": 1,
                                                                "digest": "Target value or target value/ramp time pairs",
                                                                "isalias": 0,
                                                                "aliases": [ "dest" ],
                                                                "settable": 1,
                                                                "attachable": 0,
                                                                "isparam": 0,
                                                                "deprecated": 0,
                                                                "touched": 0,
                                                                "inlet": 1,
                                                                "type": "list",
                                                                "defaultValue": ""
                                                            },
                                                            "dest": {
                                                                "attrOrProp": 1,
                                                                "digest": "Target value or target value/ramp time pairs",
                                                                "isalias": 1,
                                                                "aliasOf": "segments",
                                                                "aliases": [],
                                                                "settable": 1,
                                                                "attachable": 0,
                                                                "isparam": 0,
                                                                "deprecated": 0,
                                                                "touched": 0,
                                                                "inlet": 1,
                                                                "type": "list",
                                                                "defaultValue": ""
                                                            },
                                                            "time": {
                                                                "attrOrProp": 1,
                                                                "digest": "Ramp time",
                                                                "defaultarg": 2,
                                                                "isalias": 0,
                                                                "aliases": [],
                                                                "settable": 1,
                                                                "attachable": 0,
                                                                "isparam": 0,
                                                                "deprecated": 0,
                                                                "touched": 0,
                                                                "inlet": 1,
                                                                "type": "number",
                                                                "defaultValue": "0"
                                                            },
                                                            "keepramp": {
                                                                "attrOrProp": 1,
                                                                "digest": "Keep last ramp",
                                                                "isalias": 0,
                                                                "aliases": [],
                                                                "settable": 1,
                                                                "attachable": 1,
                                                                "isparam": 0,
                                                                "deprecated": 0,
                                                                "touched": 0,
                                                                "type": "bool",
                                                                "defaultValue": "false"
                                                            },
                                                            "out": {
                                                                "attrOrProp": 1,
                                                                "digest": "Ramp out",
                                                                "isalias": 0,
                                                                "aliases": [],
                                                                "settable": 0,
                                                                "attachable": 0,
                                                                "isparam": 0,
                                                                "deprecated": 0,
                                                                "touched": 0,
                                                                "outlet": 1,
                                                                "type": "signal"
                                                            },
                                                            "target": {
                                                                "attrOrProp": 1,
                                                                "digest": "Bang when ramp has finished",
                                                                "isalias": 0,
                                                                "aliases": [],
                                                                "settable": 0,
                                                                "attachable": 0,
                                                                "isparam": 0,
                                                                "deprecated": 0,
                                                                "touched": 0,
                                                                "outlet": 1,
                                                                "type": "bang"
                                                            },
                                                            "value": {
                                                                "attrOrProp": 2,
                                                                "digest": "Initial value.",
                                                                "defaultarg": 1,
                                                                "isalias": 0,
                                                                "aliases": [],
                                                                "settable": 1,
                                                                "attachable": 0,
                                                                "isparam": 0,
                                                                "deprecated": 0,
                                                                "touched": 0,
                                                                "type": "number",
                                                                "defaultValue": "0"
                                                            }
                                                        },
                                                        "inputs": [
                                                            {
                                                                "name": "segments",
                                                                "type": "list",
                                                                "digest": "Target value or target value/ramp time pairs",
                                                                "hot": 1,
                                                                "docked": 0
                                                            },
                                                            {
                                                                "name": "time",
                                                                "type": "number",
                                                                "digest": "Ramp time",
                                                                "defaultarg": 2,
                                                                "docked": 0
                                                            }
                                                        ],
                                                        "outputs": [
                                                            {
                                                                "name": "out",
                                                                "type": "signal",
                                                                "digest": "Ramp out",
                                                                "docked": 0
                                                            },
                                                            {
                                                                "name": "target",
                                                                "type": "bang",
                                                                "digest": "Bang when ramp has finished",
                                                                "docked": 0
                                                            }
                                                        ],
                                                        "helpname": "line~",
                                                        "aliasOf": "line~",
                                                        "classname": "fade~",
                                                        "operator": 0,
                                                        "versionId": 2134689829,
                                                        "changesPatcherIO": 0
                                                    },
                                                    "text": "fade~ 0. 10"
                                                }
                                            },
                                            {
                                                "box": {
                                                    "id": "obj-94",
                                                    "maxclass": "newobj",
                                                    "numinlets": 0,
                                                    "numoutlets": 1,
                                                    "outlettype": [ "" ],
                                                    "patching_rect": [ 90.0, 160.0, 28.0, 23.0 ],
                                                    "rnbo_classname": "in",
                                                    "rnbo_extra_attributes": {
                                                        "meta": "",
                                                        "comment": ""
                                                    },
                                                    "rnbo_serial": 2,
                                                    "rnbo_uniqueid": "u738009653",
                                                    "rnboinfo": {
                                                        "needsInstanceInfo": 1,
                                                        "argnames": {
                                                            "index": {
                                                                "attrOrProp": 2,
                                                                "digest": "inlet number",
                                                                "defaultarg": 1,
                                                                "isalias": 0,
                                                                "aliases": [],
                                                                "settable": 1,
                                                                "attachable": 0,
                                                                "isparam": 0,
                                                                "deprecated": 0,
                                                                "touched": 0,
                                                                "type": "number",
                                                                "mandatory": 1
                                                            },
                                                            "comment": {
                                                                "attrOrProp": 2,
                                                                "digest": "mouse over comment",
                                                                "isalias": 0,
                                                                "aliases": [],
                                                                "settable": 1,
                                                                "attachable": 0,
                                                                "isparam": 0,
                                                                "deprecated": 0,
                                                                "touched": 0,
                                                                "type": "symbol"
                                                            },
                                                            "meta": {
                                                                "attrOrProp": 2,
                                                                "digest": "A JSON formatted string containing metadata for use by the exported code",
                                                                "isalias": 0,
                                                                "aliases": [],
                                                                "settable": 1,
                                                                "attachable": 0,
                                                                "isparam": 0,
                                                                "deprecated": 0,
                                                                "touched": 0,
                                                                "type": "symbol",
                                                                "defaultValue": "",
                                                                "label": "Metadata",
                                                                "displayorder": 3
                                                            }
                                                        },
                                                        "inputs": [],
                                                        "outputs": [
                                                            {
                                                                "name": "out1",
                                                                "type": [ "bang", "number", "list" ],
                                                                "digest": "value from inlet with index 1",
                                                                "displayName": "",
                                                                "docked": 0
                                                            }
                                                        ],
                                                        "helpname": "in",
                                                        "aliasOf": "in",
                                                        "classname": "in",
                                                        "operator": 0,
                                                        "versionId": 475235762,
                                                        "changesPatcherIO": 1
                                                    },
                                                    "text": "in 1",
                                                    "varname": "u738009653"
                                                }
                                            },
                                            {
                                                "box": {
                                                    "background": 1,
                                                    "id": "obj-14",
                                                    "linecount": 6,
                                                    "maxclass": "comment",
                                                    "numinlets": 1,
                                                    "numoutlets": 0,
                                                    "patching_rect": [ 50.0, 450.0, 133.0, 93.0 ],
                                                    "text": "Ramp: go to <phase 0.5> (amp = 0.) within <fall> time (5 ms), then go to <phase 1.> (amp = 1.) within <rise> time (default: 500 ms)"
                                                }
                                            },
                                            {
                                                "box": {
                                                    "background": 1,
                                                    "fontsize": 8.0,
                                                    "id": "obj-6",
                                                    "maxclass": "comment",
                                                    "numinlets": 1,
                                                    "numoutlets": 0,
                                                    "patching_rect": [ 150.0, 429.0, 19.0, 16.0 ],
                                                    "text": "-1."
                                                }
                                            },
                                            {
                                                "box": {
                                                    "bufsize": 128.0,
                                                    "calccount": 128.0,
                                                    "gridcolor": [ 0.505882352941176, 0.564705882352941, 0.666666666666667, 0.25 ],
                                                    "id": "obj-1",
                                                    "maxclass": "scope~",
                                                    "numinlets": 2,
                                                    "numoutlets": 0,
                                                    "patching_rect": [ 90.0, 401.0, 60.0, 40.0 ],
                                                    "range": [ -1.01, 1.01 ],
                                                    "rnbo_classname": "scope~",
                                                    "rnbo_extra_attributes": {
                                                        "bufsize": 128.0,
                                                        "calccount": 128.0
                                                    },
                                                    "rnbo_serial": 2,
                                                    "rnbo_uniqueid": "scope~_obj-1"
                                                }
                                            },
                                            {
                                                "box": {
                                                    "background": 1,
                                                    "id": "obj-43",
                                                    "maxclass": "comment",
                                                    "numinlets": 1,
                                                    "numoutlets": 0,
                                                    "patching_rect": [ 398.0, 292.0, 55.0, 21.0 ],
                                                    "saved_attribute_attributes": {
                                                        "textcolor": {
                                                            "expression": "themecolor.live_freeze_color"
                                                        }
                                                    },
                                                    "text": "1 - curve",
                                                    "textcolor": [ 0.262745098039216, 0.568627450980392, 0.901960784313726, 1.0 ]
                                                }
                                            },
                                            {
                                                "box": {
                                                    "background": 1,
                                                    "id": "obj-42",
                                                    "maxclass": "comment",
                                                    "numinlets": 1,
                                                    "numoutlets": 0,
                                                    "patching_rect": [ 260.0, 292.0, 56.0, 21.0 ],
                                                    "saved_attribute_attributes": {
                                                        "textcolor": {
                                                            "expression": "themecolor.live_freeze_color"
                                                        }
                                                    },
                                                    "text": "2 * curve",
                                                    "textcolor": [ 0.262745098039216, 0.568627450980392, 0.901960784313726, 1.0 ]
                                                }
                                            },
                                            {
                                                "box": {
                                                    "background": 1,
                                                    "id": "obj-41",
                                                    "maxclass": "comment",
                                                    "numinlets": 1,
                                                    "numoutlets": 0,
                                                    "patching_rect": [ 132.5, 334.0, 113.0, 21.0 ],
                                                    "saved_attribute_attributes": {
                                                        "textcolor": {
                                                            "expression": "themecolor.live_freeze_color"
                                                        }
                                                    },
                                                    "text": "x = in1 ; \t\t// -1..1",
                                                    "textcolor": [ 0.262745098039216, 0.568627450980392, 0.901960784313726, 1.0 ]
                                                }
                                            },
                                            {
                                                "box": {
                                                    "background": 1,
                                                    "id": "obj-40",
                                                    "linecount": 4,
                                                    "maxclass": "comment",
                                                    "numinlets": 1,
                                                    "numoutlets": 0,
                                                    "patching_rect": [ 370.0, 400.0, 190.0, 64.0 ],
                                                    "saved_attribute_attributes": {
                                                        "textcolor": {
                                                            "expression": "themecolor.live_freeze_color"
                                                        }
                                                    },
                                                    "text": "x = in1 ; \t\t// 0..1\ncurve = in2 ; \t// -1..1\nk = 2 * curve / (1 - curve);\nout1 = (1 + k) * x / (1 + k * abs(x));",
                                                    "textcolor": [ 0.262745098039216, 0.568627450980392, 0.901960784313726, 1.0 ]
                                                }
                                            },
                                            {
                                                "box": {
                                                    "background": 1,
                                                    "id": "obj-39",
                                                    "maxclass": "comment",
                                                    "numinlets": 1,
                                                    "numoutlets": 0,
                                                    "patching_rect": [ 290.0, 473.0, 83.0, 21.0 ],
                                                    "saved_attribute_attributes": {
                                                        "textcolor": {
                                                            "expression": "themecolor.live_freeze_color"
                                                        }
                                                    },
                                                    "text": "(1 + k * abs(x))",
                                                    "textcolor": [ 0.262745098039216, 0.568627450980392, 0.901960784313726, 1.0 ]
                                                }
                                            },
                                            {
                                                "box": {
                                                    "background": 1,
                                                    "id": "obj-38",
                                                    "maxclass": "comment",
                                                    "numinlets": 1,
                                                    "numoutlets": 0,
                                                    "patching_rect": [ 188.0, 473.0, 58.0, 21.0 ],
                                                    "saved_attribute_attributes": {
                                                        "textcolor": {
                                                            "expression": "themecolor.live_freeze_color"
                                                        }
                                                    },
                                                    "text": "(1 + k) * x",
                                                    "textcolor": [ 0.262745098039216, 0.568627450980392, 0.901960784313726, 1.0 ]
                                                }
                                            },
                                            {
                                                "box": {
                                                    "background": 1,
                                                    "id": "obj-37",
                                                    "linecount": 2,
                                                    "maxclass": "comment",
                                                    "numinlets": 1,
                                                    "numoutlets": 0,
                                                    "patching_rect": [ 251.0, 250.0, 89.0, 35.0 ],
                                                    "saved_attribute_attributes": {
                                                        "textcolor": {
                                                            "expression": "themecolor.live_freeze_color"
                                                        }
                                                    },
                                                    "text": "curve = in2 ; \t// 0..1",
                                                    "textcolor": [ 0.262745098039216, 0.568627450980392, 0.901960784313726, 1.0 ]
                                                }
                                            },
                                            {
                                                "box": {
                                                    "background": 1,
                                                    "id": "obj-20",
                                                    "maxclass": "comment",
                                                    "numinlets": 1,
                                                    "numoutlets": 0,
                                                    "patching_rect": [ 332.0, 373.0, 20.0, 21.0 ],
                                                    "text": "k",
                                                    "textcolor": [ 0.343034118413925, 0.506230533123016, 0.86220508813858, 1.0 ]
                                                }
                                            },
                                            {
                                                "box": {
                                                    "background": 1,
                                                    "id": "obj-7",
                                                    "maxclass": "comment",
                                                    "numinlets": 1,
                                                    "numoutlets": 0,
                                                    "patching_rect": [ 354.5, 245.0, 70.0, 21.0 ],
                                                    "text": "10 ms ramp"
                                                }
                                            },
                                            {
                                                "box": {
                                                    "background": 1,
                                                    "id": "obj-31",
                                                    "maxclass": "comment",
                                                    "numinlets": 1,
                                                    "numoutlets": 0,
                                                    "patching_rect": [ 390.0, 140.0, 32.0, 21.0 ],
                                                    "text": "Map"
                                                }
                                            },
                                            {
                                                "box": {
                                                    "background": 1,
                                                    "id": "obj-30",
                                                    "maxclass": "comment",
                                                    "numinlets": 1,
                                                    "numoutlets": 0,
                                                    "patching_rect": [ 60.0, 40.0, 411.0, 21.0 ],
                                                    "text": "Use a time-controlled non-linear function to produce a smooth volume curve"
                                                }
                                            },
                                            {
                                                "box": {
                                                    "background": 1,
                                                    "fontface": 1,
                                                    "fontsize": 14.0,
                                                    "id": "obj-29",
                                                    "maxclass": "comment",
                                                    "numinlets": 1,
                                                    "numoutlets": 0,
                                                    "patching_rect": [ 60.0, 20.0, 91.0, 23.0 ],
                                                    "text": "Volume ramp"
                                                }
                                            },
                                            {
                                                "box": {
                                                    "background": 1,
                                                    "id": "obj-28",
                                                    "maxclass": "comment",
                                                    "numinlets": 1,
                                                    "numoutlets": 0,
                                                    "patching_rect": [ 110.0, 440.0, 22.0, 21.0 ],
                                                    "text": "^^"
                                                }
                                            },
                                            {
                                                "box": {
                                                    "background": 1,
                                                    "fontsize": 8.0,
                                                    "id": "obj-27",
                                                    "maxclass": "comment",
                                                    "numinlets": 1,
                                                    "numoutlets": 0,
                                                    "patching_rect": [ 210.0, 669.0, 19.0, 16.0 ],
                                                    "text": "0."
                                                }
                                            },
                                            {
                                                "box": {
                                                    "background": 1,
                                                    "fontsize": 8.0,
                                                    "id": "obj-26",
                                                    "maxclass": "comment",
                                                    "numinlets": 1,
                                                    "numoutlets": 0,
                                                    "patching_rect": [ 210.0, 636.0, 19.0, 16.0 ],
                                                    "text": "1."
                                                }
                                            },
                                            {
                                                "box": {
                                                    "background": 1,
                                                    "id": "obj-25",
                                                    "maxclass": "comment",
                                                    "numinlets": 1,
                                                    "numoutlets": 0,
                                                    "patching_rect": [ 252.0, 520.0, 33.0, 21.0 ],
                                                    "saved_attribute_attributes": {
                                                        "textcolor": {
                                                            "expression": "themecolor.live_freeze_color"
                                                        }
                                                    },
                                                    "text": "out1",
                                                    "textcolor": [ 0.262745098039216, 0.568627450980392, 0.901960784313726, 1.0 ]
                                                }
                                            },
                                            {
                                                "box": {
                                                    "background": 1,
                                                    "id": "obj-52",
                                                    "linecount": 2,
                                                    "maxclass": "comment",
                                                    "numinlets": 1,
                                                    "numoutlets": 0,
                                                    "patching_rect": [ 308.5, 634.0, 150.0, 35.0 ],
                                                    "text": "Clamp amplitude between 0. and 1. (just in case)"
                                                }
                                            },
                                            {
                                                "box": {
                                                    "background": 1,
                                                    "id": "obj-17",
                                                    "maxclass": "comment",
                                                    "numinlets": 1,
                                                    "numoutlets": 0,
                                                    "patching_rect": [ 370.0, 130.0, 20.0, 21.0 ],
                                                    "text": "%"
                                                }
                                            },
                                            {
                                                "box": {
                                                    "background": 1,
                                                    "fontsize": 8.0,
                                                    "id": "obj-4",
                                                    "maxclass": "comment",
                                                    "numinlets": 1,
                                                    "numoutlets": 0,
                                                    "patching_rect": [ 149.0, 397.0, 20.0, 16.0 ],
                                                    "text": "+1."
                                                }
                                            },
                                            {
                                                "box": {
                                                    "background": 1,
                                                    "id": "obj-23",
                                                    "maxclass": "comment",
                                                    "numinlets": 1,
                                                    "numoutlets": 0,
                                                    "patching_rect": [ 370.0, 190.0, 45.0, 21.0 ],
                                                    "text": "[0. 0.5]"
                                                }
                                            },
                                            {
                                                "box": {
                                                    "background": 1,
                                                    "id": "obj-125",
                                                    "maxclass": "comment",
                                                    "numinlets": 1,
                                                    "numoutlets": 0,
                                                    "patching_rect": [ 230.0, 190.0, 24.0, 21.0 ],
                                                    "text": "ms"
                                                }
                                            },
                                            {
                                                "box": {
                                                    "background": 1,
                                                    "id": "obj-5",
                                                    "maxclass": "comment",
                                                    "numinlets": 1,
                                                    "numoutlets": 0,
                                                    "patching_rect": [ 30.0, 250.0, 57.0, 21.0 ],
                                                    "text": "Envelope"
                                                }
                                            },
                                            {
                                                "box": {
                                                    "background": 1,
                                                    "id": "obj-2",
                                                    "linecount": 2,
                                                    "maxclass": "comment",
                                                    "numinlets": 1,
                                                    "numoutlets": 0,
                                                    "patching_rect": [ 290.0, 560.0, 110.0, 35.0 ],
                                                    "text": "Map [-1. 1.] range to [0. 1.] range"
                                                }
                                            },
                                            {
                                                "box": {
                                                    "background": 1,
                                                    "id": "obj-19",
                                                    "maxclass": "comment",
                                                    "numinlets": 1,
                                                    "numoutlets": 0,
                                                    "patching_rect": [ 290.0, 690.0, 96.0, 21.0 ],
                                                    "text": "Amplitude [0. 1.]"
                                                }
                                            },
                                            {
                                                "box": {
                                                    "background": 1,
                                                    "id": "obj-18",
                                                    "maxclass": "comment",
                                                    "numinlets": 1,
                                                    "numoutlets": 0,
                                                    "patching_rect": [ 350.0, 101.0, 38.0, 21.0 ],
                                                    "text": "Slope"
                                                }
                                            },
                                            {
                                                "box": {
                                                    "background": 1,
                                                    "id": "obj-16",
                                                    "linecount": 2,
                                                    "maxclass": "comment",
                                                    "numinlets": 1,
                                                    "numoutlets": 0,
                                                    "patching_rect": [ 23.0, 284.0, 70.0, 35.0 ],
                                                    "text": "Cosine waveform"
                                                }
                                            },
                                            {
                                                "box": {
                                                    "background": 1,
                                                    "id": "obj-15",
                                                    "linecount": 2,
                                                    "maxclass": "comment",
                                                    "numinlets": 1,
                                                    "numoutlets": 0,
                                                    "patching_rect": [ 41.0, 185.0, 47.0, 35.0 ],
                                                    "text": "Trigger ramp"
                                                }
                                            },
                                            {
                                                "box": {
                                                    "background": 1,
                                                    "id": "obj-12",
                                                    "maxclass": "comment",
                                                    "numinlets": 1,
                                                    "numoutlets": 0,
                                                    "patching_rect": [ 210.0, 81.0, 33.0, 21.0 ],
                                                    "text": "Fade"
                                                }
                                            },
                                            {
                                                "box": {
                                                    "background": 1,
                                                    "id": "obj-9",
                                                    "maxclass": "comment",
                                                    "numinlets": 1,
                                                    "numoutlets": 0,
                                                    "patching_rect": [ 230.0, 110.0, 20.0, 21.0 ],
                                                    "text": "%"
                                                }
                                            },
                                            {
                                                "box": {
                                                    "id": "obj-98",
                                                    "maxclass": "newobj",
                                                    "numinlets": 0,
                                                    "numoutlets": 1,
                                                    "outlettype": [ "" ],
                                                    "patching_rect": [ 320.0, 101.0, 28.0, 23.0 ],
                                                    "rnbo_classname": "in",
                                                    "rnbo_extra_attributes": {
                                                        "meta": "",
                                                        "comment": ""
                                                    },
                                                    "rnbo_serial": 3,
                                                    "rnbo_uniqueid": "in_obj-98",
                                                    "rnboinfo": {
                                                        "needsInstanceInfo": 1,
                                                        "argnames": {
                                                            "index": {
                                                                "attrOrProp": 2,
                                                                "digest": "inlet number",
                                                                "defaultarg": 1,
                                                                "isalias": 0,
                                                                "aliases": [],
                                                                "settable": 1,
                                                                "attachable": 0,
                                                                "isparam": 0,
                                                                "deprecated": 0,
                                                                "touched": 0,
                                                                "type": "number",
                                                                "mandatory": 1
                                                            },
                                                            "comment": {
                                                                "attrOrProp": 2,
                                                                "digest": "mouse over comment",
                                                                "isalias": 0,
                                                                "aliases": [],
                                                                "settable": 1,
                                                                "attachable": 0,
                                                                "isparam": 0,
                                                                "deprecated": 0,
                                                                "touched": 0,
                                                                "type": "symbol"
                                                            },
                                                            "meta": {
                                                                "attrOrProp": 2,
                                                                "digest": "A JSON formatted string containing metadata for use by the exported code",
                                                                "isalias": 0,
                                                                "aliases": [],
                                                                "settable": 1,
                                                                "attachable": 0,
                                                                "isparam": 0,
                                                                "deprecated": 0,
                                                                "touched": 0,
                                                                "type": "symbol",
                                                                "defaultValue": "",
                                                                "label": "Metadata",
                                                                "displayorder": 3
                                                            }
                                                        },
                                                        "inputs": [],
                                                        "outputs": [
                                                            {
                                                                "name": "out1",
                                                                "type": [ "bang", "number", "list" ],
                                                                "digest": "value from inlet with index 3",
                                                                "displayName": "",
                                                                "docked": 0
                                                            }
                                                        ],
                                                        "helpname": "in",
                                                        "aliasOf": "in",
                                                        "classname": "in",
                                                        "operator": 0,
                                                        "versionId": 475235762,
                                                        "changesPatcherIO": 1
                                                    },
                                                    "text": "in 3"
                                                }
                                            },
                                            {
                                                "box": {
                                                    "background": 1,
                                                    "id": "obj-93",
                                                    "linecount": 3,
                                                    "maxclass": "comment",
                                                    "numinlets": 1,
                                                    "numoutlets": 0,
                                                    "patching_rect": [ 370.0, 351.0, 190.0, 50.0 ],
                                                    "text": "Direct form of a waveshaping algorithm found in Max's Gen examples. Original DSP code is:"
                                                }
                                            },
                                            {
                                                "box": {
                                                    "id": "obj-99",
                                                    "maxclass": "newobj",
                                                    "numinlets": 1,
                                                    "numoutlets": 0,
                                                    "patching_rect": [ 240.0, 690.0, 43.0, 23.0 ],
                                                    "rnbo_classname": "out~",
                                                    "rnbo_extra_attributes": {
                                                        "meta": "",
                                                        "comment": ""
                                                    },
                                                    "rnbo_serial": 1,
                                                    "rnbo_uniqueid": "u880009665",
                                                    "rnboinfo": {
                                                        "needsInstanceInfo": 1,
                                                        "argnames": {
                                                            "in1": {
                                                                "attrOrProp": 1,
                                                                "digest": "signal sent to outlet with index 1",
                                                                "isalias": 0,
                                                                "aliases": [],
                                                                "settable": 0,
                                                                "attachable": 0,
                                                                "isparam": 0,
                                                                "deprecated": 0,
                                                                "touched": 0,
                                                                "inlet": 1,
                                                                "type": "signal"
                                                            },
                                                            "index": {
                                                                "attrOrProp": 2,
                                                                "digest": "outlet number",
                                                                "defaultarg": 1,
                                                                "isalias": 0,
                                                                "aliases": [],
                                                                "settable": 1,
                                                                "attachable": 0,
                                                                "isparam": 0,
                                                                "deprecated": 0,
                                                                "touched": 0,
                                                                "type": "number",
                                                                "mandatory": 1
                                                            },
                                                            "comment": {
                                                                "attrOrProp": 2,
                                                                "digest": "mouse over comment",
                                                                "isalias": 0,
                                                                "aliases": [],
                                                                "settable": 1,
                                                                "attachable": 0,
                                                                "isparam": 0,
                                                                "deprecated": 0,
                                                                "touched": 0,
                                                                "type": "symbol"
                                                            },
                                                            "meta": {
                                                                "attrOrProp": 2,
                                                                "digest": "A JSON formatted string containing metadata for use by the exported code",
                                                                "isalias": 0,
                                                                "aliases": [],
                                                                "settable": 1,
                                                                "attachable": 0,
                                                                "isparam": 0,
                                                                "deprecated": 0,
                                                                "touched": 0,
                                                                "type": "symbol",
                                                                "defaultValue": "",
                                                                "label": "Metadata",
                                                                "displayorder": 3
                                                            }
                                                        },
                                                        "inputs": [
                                                            {
                                                                "name": "in1",
                                                                "type": "signal",
                                                                "digest": "signal sent to outlet with index 1",
                                                                "displayName": "",
                                                                "hot": 1,
                                                                "docked": 0
                                                            }
                                                        ],
                                                        "outputs": [],
                                                        "helpname": "out~",
                                                        "aliasOf": "out~",
                                                        "classname": "out~",
                                                        "operator": 0,
                                                        "versionId": 1989326771,
                                                        "changesPatcherIO": 1
                                                    },
                                                    "text": "out~ 1",
                                                    "varname": "u880009665"
                                                }
                                            }
                                        ],
                                        "lines": [
                                            {
                                                "patchline": {
                                                    "destination": [ "obj-8", 0 ],
                                                    "source": [ "obj-10", 0 ]
                                                }
                                            },
                                            {
                                                "patchline": {
                                                    "destination": [ "obj-121", 0 ],
                                                    "source": [ "obj-120", 0 ]
                                                }
                                            },
                                            {
                                                "patchline": {
                                                    "destination": [ "obj-36", 3 ],
                                                    "source": [ "obj-121", 0 ]
                                                }
                                            },
                                            {
                                                "patchline": {
                                                    "destination": [ "obj-99", 0 ],
                                                    "source": [ "obj-124", 0 ]
                                                }
                                            },
                                            {
                                                "patchline": {
                                                    "destination": [ "obj-75", 0 ],
                                                    "order": 0,
                                                    "source": [ "obj-13", 0 ]
                                                }
                                            },
                                            {
                                                "patchline": {
                                                    "destination": [ "obj-85", 0 ],
                                                    "order": 1,
                                                    "source": [ "obj-13", 0 ]
                                                }
                                            },
                                            {
                                                "patchline": {
                                                    "destination": [ "obj-60", 0 ],
                                                    "source": [ "obj-21", 0 ]
                                                }
                                            },
                                            {
                                                "patchline": {
                                                    "destination": [ "obj-13", 0 ],
                                                    "source": [ "obj-22", 0 ]
                                                }
                                            },
                                            {
                                                "patchline": {
                                                    "destination": [ "obj-36", 0 ],
                                                    "source": [ "obj-3", 0 ]
                                                }
                                            },
                                            {
                                                "patchline": {
                                                    "destination": [ "obj-21", 0 ],
                                                    "source": [ "obj-36", 0 ]
                                                }
                                            },
                                            {
                                                "patchline": {
                                                    "destination": [ "obj-1", 0 ],
                                                    "order": 2,
                                                    "source": [ "obj-60", 0 ]
                                                }
                                            },
                                            {
                                                "patchline": {
                                                    "destination": [ "obj-69", 0 ],
                                                    "order": 0,
                                                    "source": [ "obj-60", 0 ]
                                                }
                                            },
                                            {
                                                "patchline": {
                                                    "destination": [ "obj-92", 0 ],
                                                    "order": 1,
                                                    "source": [ "obj-60", 0 ]
                                                }
                                            },
                                            {
                                                "patchline": {
                                                    "destination": [ "obj-90", 0 ],
                                                    "source": [ "obj-67", 0 ]
                                                }
                                            },
                                            {
                                                "patchline": {
                                                    "destination": [ "obj-87", 0 ],
                                                    "source": [ "obj-69", 0 ]
                                                }
                                            },
                                            {
                                                "patchline": {
                                                    "destination": [ "obj-86", 1 ],
                                                    "source": [ "obj-75", 0 ]
                                                }
                                            },
                                            {
                                                "patchline": {
                                                    "destination": [ "obj-120", 0 ],
                                                    "source": [ "obj-8", 0 ]
                                                }
                                            },
                                            {
                                                "patchline": {
                                                    "destination": [ "obj-22", 0 ],
                                                    "source": [ "obj-83", 0 ]
                                                }
                                            },
                                            {
                                                "patchline": {
                                                    "destination": [ "obj-83", 0 ],
                                                    "source": [ "obj-84", 0 ]
                                                }
                                            },
                                            {
                                                "patchline": {
                                                    "destination": [ "obj-86", 0 ],
                                                    "source": [ "obj-85", 0 ]
                                                }
                                            },
                                            {
                                                "patchline": {
                                                    "destination": [ "obj-87", 1 ],
                                                    "order": 1,
                                                    "source": [ "obj-86", 0 ]
                                                }
                                            },
                                            {
                                                "patchline": {
                                                    "destination": [ "obj-88", 0 ],
                                                    "order": 0,
                                                    "source": [ "obj-86", 0 ]
                                                }
                                            },
                                            {
                                                "patchline": {
                                                    "destination": [ "obj-89", 0 ],
                                                    "source": [ "obj-87", 0 ]
                                                }
                                            },
                                            {
                                                "patchline": {
                                                    "destination": [ "obj-92", 1 ],
                                                    "source": [ "obj-88", 0 ]
                                                }
                                            },
                                            {
                                                "patchline": {
                                                    "destination": [ "obj-91", 1 ],
                                                    "source": [ "obj-89", 0 ]
                                                }
                                            },
                                            {
                                                "patchline": {
                                                    "destination": [ "obj-11", 0 ],
                                                    "order": 1,
                                                    "source": [ "obj-90", 0 ]
                                                }
                                            },
                                            {
                                                "patchline": {
                                                    "destination": [ "obj-124", 0 ],
                                                    "order": 0,
                                                    "source": [ "obj-90", 0 ]
                                                }
                                            },
                                            {
                                                "patchline": {
                                                    "destination": [ "obj-67", 0 ],
                                                    "source": [ "obj-91", 0 ]
                                                }
                                            },
                                            {
                                                "patchline": {
                                                    "destination": [ "obj-91", 0 ],
                                                    "source": [ "obj-92", 0 ]
                                                }
                                            },
                                            {
                                                "patchline": {
                                                    "destination": [ "obj-3", 0 ],
                                                    "source": [ "obj-94", 0 ]
                                                }
                                            },
                                            {
                                                "patchline": {
                                                    "destination": [ "obj-84", 0 ],
                                                    "source": [ "obj-98", 0 ]
                                                }
                                            }
                                        ]
                                    },
                                    "patching_rect": [ 320.0, 300.0, 119.0, 37.0 ],
                                    "rnbo_classname": "p",
                                    "rnbo_extra_attributes": {
                                        "voicecontrol": "midi",
                                        "notecontroller": 0,
                                        "args": [],
                                        "exposevoiceparams": 0,
                                        "receivemode": "local",
                                        "polyphony": -1.0,
                                        "uidstyle": "auto"
                                    },
                                    "rnbo_serial": 2,
                                    "rnbo_uniqueid": "VolumeRamp~",
                                    "rnboinfo": {
                                        "needsInstanceInfo": 1,
                                        "argnames": {
                                            "target": {
                                                "attrOrProp": 1,
                                                "digest": "target",
                                                "isalias": 0,
                                                "aliases": [],
                                                "settable": 0,
                                                "attachable": 1,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "type": "number",
                                                "defaultValue": "0"
                                            },
                                            "mute": {
                                                "attrOrProp": 1,
                                                "digest": "mute",
                                                "isalias": 0,
                                                "aliases": [],
                                                "attachable": 1,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "type": "number"
                                            },
                                            "__probingout1": {
                                                "attrOrProp": 1,
                                                "digest": "__probingout1",
                                                "isalias": 0,
                                                "aliases": [],
                                                "attachable": 0,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "type": "signal"
                                            },
                                            "out1": {
                                                "attrOrProp": 1,
                                                "digest": "out1",
                                                "isalias": 0,
                                                "aliases": [],
                                                "attachable": 0,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "outlet": 1,
                                                "type": "signal"
                                            },
                                            "polyphony": {
                                                "attrOrProp": 2,
                                                "digest": "Polyphony of the subpatcher.",
                                                "isalias": 0,
                                                "aliases": [],
                                                "settable": 1,
                                                "attachable": 0,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "type": "number",
                                                "defaultValue": "-1"
                                            },
                                            "exposevoiceparams": {
                                                "attrOrProp": 2,
                                                "digest": "Expose per voice versions of the contained parameters (only valid in polyphonic subpatchers).",
                                                "isalias": 0,
                                                "aliases": [],
                                                "settable": 1,
                                                "attachable": 0,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "type": "bool",
                                                "defaultValue": "false"
                                            },
                                            "title": {
                                                "attrOrProp": 2,
                                                "digest": "Title of the subpatcher",
                                                "defaultarg": 1,
                                                "isalias": 0,
                                                "aliases": [],
                                                "settable": 1,
                                                "attachable": 0,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "type": "symbol",
                                                "doNotShowInMaxInspector": 1
                                            },
                                            "file": {
                                                "attrOrProp": 2,
                                                "digest": "rnbo file to load",
                                                "isalias": 0,
                                                "aliases": [],
                                                "settable": 1,
                                                "attachable": 0,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "type": "symbol",
                                                "doNotShowInMaxInspector": 1
                                            },
                                            "voicecontrol": {
                                                "attrOrProp": 2,
                                                "digest": "Chooses the way that polyphonic voices are controlled. 'simple' (or 'midi') will automatically allocate voices for \tincoming MIDI notes. Setting it to 'user' (or 'none') will switch off MIDI \tvoice allocation and start with all voices unmuted.",
                                                "isalias": 0,
                                                "aliases": [],
                                                "settable": 1,
                                                "attachable": 0,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "enum": [ "simple", "user" ],
                                                "type": "enum",
                                                "defaultValue": "simple"
                                            },
                                            "notecontroller": {
                                                "attrOrProp": 2,
                                                "digest": "DEPRECATED. Use voicecontrol instead.",
                                                "isalias": 0,
                                                "aliases": [],
                                                "settable": 1,
                                                "attachable": 0,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "type": "symbol",
                                                "doNotShowInMaxInspector": 1
                                            },
                                            "receivemode": {
                                                "attrOrProp": 2,
                                                "digest": "Do receive~ objects get the signal from a send~ inside the patcher directly (without latency), or compensated (with latency, aligned with all other voices).",
                                                "isalias": 0,
                                                "aliases": [],
                                                "settable": 1,
                                                "attachable": 0,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "enum": [ "local", "compensated" ],
                                                "type": "enum",
                                                "defaultValue": "local"
                                            },
                                            "args": {
                                                "attrOrProp": 2,
                                                "digest": "Replacement args for the subpatcher, everything named #1, #2 etc. will be replaced with the according argument.",
                                                "isalias": 0,
                                                "aliases": [],
                                                "settable": 1,
                                                "attachable": 0,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "type": "symbol",
                                                "doNotShowInMaxInspector": 1
                                            },
                                            "uidstyle": {
                                                "attrOrProp": 2,
                                                "digest": "Behavior of #0 unique ID. auto (default) means abstractions get a local UID, local: start a new local UID, parent: use the one from the parent patcher",
                                                "isalias": 0,
                                                "aliases": [],
                                                "settable": 1,
                                                "attachable": 0,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "enum": [ "auto", "local", "parent", "global" ],
                                                "type": "enum",
                                                "defaultValue": "auto"
                                            }
                                        },
                                        "inputs": [
                                            {
                                                "name": "in1",
                                                "type": [ "bang", "number", "list" ],
                                                "digest": "in1",
                                                "displayName": "",
                                                "hot": 1,
                                                "docked": 0
                                            },
                                            {
                                                "name": "in2",
                                                "type": [ "bang", "number", "list" ],
                                                "digest": "in2",
                                                "displayName": "",
                                                "hot": 1,
                                                "docked": 0
                                            },
                                            {
                                                "name": "in3",
                                                "type": [ "bang", "number", "list" ],
                                                "digest": "in3",
                                                "displayName": "",
                                                "hot": 1,
                                                "docked": 0
                                            }
                                        ],
                                        "outputs": [
                                            {
                                                "name": "out1",
                                                "type": "signal",
                                                "digest": "out1",
                                                "displayName": "",
                                                "docked": 0
                                            }
                                        ],
                                        "helpname": "patcher",
                                        "aliasOf": "rnbo",
                                        "classname": "p",
                                        "operator": 0,
                                        "versionId": 426236520,
                                        "changesPatcherIO": 0
                                    },
                                    "saved_attribute_attributes": {
                                        "color": {
                                            "expression": "themecolor.theme_color"
                                        }
                                    },
                                    "saved_newobj_attribute_attributes": {
                                        "color": {
                                            "expression": "themecolor.theme_color"
                                        }
                                    },
                                    "text": "p @title VolumeRamp~",
                                    "varname": "VolumeRamp~"
                                }
                            },
                            {
                                "box": {
                                    "fontface": 1,
                                    "id": "obj-24",
                                    "maxclass": "flonum",
                                    "maximum": 100.0,
                                    "minimum": 0.0,
                                    "numinlets": 1,
                                    "numoutlets": 2,
                                    "outlettype": [ "", "bang" ],
                                    "parameter_enable": 0,
                                    "patching_rect": [ 480.0, 300.0, 50.0, 23.0 ],
                                    "rnbo_classname": "number",
                                    "rnbo_extra_attributes": {
                                        "maximum": 100.0,
                                        "initialFormat": "float",
                                        "minimum": 0.0,
                                        "order": "",
                                        "preset": 0
                                    },
                                    "rnbo_serial": 2,
                                    "rnbo_uniqueid": "number_obj-24",
                                    "saved_attribute_attributes": {
                                        "textcolor": {
                                            "expression": "themecolor.theme_selectioncolor"
                                        }
                                    },
                                    "textcolor": [ 0.922234290352602, 0.71007200526417, 0.329758341965716, 1.0 ]
                                }
                            },
                            {
                                "box": {
                                    "id": "obj-5",
                                    "maxclass": "newobj",
                                    "numinlets": 2,
                                    "numoutlets": 2,
                                    "outlettype": [ "", "" ],
                                    "patching_rect": [ 480.0, 270.0, 72.0, 23.0 ],
                                    "rnbo_classname": "param",
                                    "rnbo_extra_attributes": {
                                        "meta": "",
                                        "tonormalized": "",
                                        "ctlin": 4.0,
                                        "maximum": 100.0,
                                        "enum": "",
                                        "fromnormalized": "",
                                        "minimum": 0.0,
                                        "steps": 0.0,
                                        "unit": "%",
                                        "order": "4",
                                        "displayorder": "-",
                                        "preset": 1,
                                        "displayname": "Slope",
                                        "sendinit": 1,
                                        "exponent": 1.0
                                    },
                                    "rnbo_serial": 3,
                                    "rnbo_uniqueid": "slope",
                                    "rnboinfo": {
                                        "needsInstanceInfo": 1,
                                        "argnames": {
                                            "value": {
                                                "attrOrProp": 1,
                                                "digest": "Parameter value",
                                                "defaultarg": 2,
                                                "isalias": 0,
                                                "aliases": [],
                                                "settable": 1,
                                                "attachable": 0,
                                                "isparam": 1,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "inlet": 1,
                                                "type": "number",
                                                "defaultValue": "25"
                                            },
                                            "normalizedvalue": {
                                                "attrOrProp": 1,
                                                "digest": "Set value normalized. ",
                                                "isalias": 0,
                                                "aliases": [],
                                                "attachable": 0,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "inlet": 1,
                                                "type": "number"
                                            },
                                            "reset": {
                                                "attrOrProp": 1,
                                                "digest": "Reset param to initial value",
                                                "isalias": 0,
                                                "aliases": [],
                                                "attachable": 1,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "type": "bang"
                                            },
                                            "normalized": {
                                                "attrOrProp": 1,
                                                "digest": "Normalized parameter value.",
                                                "isalias": 0,
                                                "aliases": [],
                                                "attachable": 0,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "outlet": 1,
                                                "type": "number"
                                            },
                                            "name": {
                                                "attrOrProp": 2,
                                                "digest": "Name of the parameter",
                                                "defaultarg": 1,
                                                "isalias": 0,
                                                "aliases": [],
                                                "settable": 1,
                                                "attachable": 0,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "type": "symbol",
                                                "label": "Parameter Name",
                                                "mandatory": 1
                                            },
                                            "enum": {
                                                "attrOrProp": 2,
                                                "digest": "Use an enumerated output",
                                                "isalias": 0,
                                                "aliases": [],
                                                "settable": 1,
                                                "attachable": 0,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "type": "list",
                                                "label": "Enum Values",
                                                "displayorder": 6
                                            },
                                            "minimum": {
                                                "attrOrProp": 2,
                                                "digest": "Minimum value",
                                                "isalias": 0,
                                                "aliases": [ "min" ],
                                                "settable": 1,
                                                "attachable": 0,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "type": "number",
                                                "defaultValue": "0",
                                                "label": "Minimum",
                                                "displayorder": 1
                                            },
                                            "min": {
                                                "attrOrProp": 2,
                                                "digest": "Minimum value",
                                                "isalias": 1,
                                                "aliasOf": "minimum",
                                                "aliases": [],
                                                "settable": 1,
                                                "attachable": 0,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "type": "number",
                                                "defaultValue": "0",
                                                "label": "Minimum",
                                                "displayorder": 1
                                            },
                                            "maximum": {
                                                "attrOrProp": 2,
                                                "digest": "Maximum value",
                                                "isalias": 0,
                                                "aliases": [ "max" ],
                                                "settable": 1,
                                                "attachable": 0,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "type": "number",
                                                "defaultValue": "1",
                                                "label": "Maximum",
                                                "displayorder": 2
                                            },
                                            "max": {
                                                "attrOrProp": 2,
                                                "digest": "Maximum value",
                                                "isalias": 1,
                                                "aliasOf": "maximum",
                                                "aliases": [],
                                                "settable": 1,
                                                "attachable": 0,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "type": "number",
                                                "defaultValue": "1",
                                                "label": "Maximum",
                                                "displayorder": 2
                                            },
                                            "exponent": {
                                                "attrOrProp": 2,
                                                "digest": "Scale values exponentially",
                                                "isalias": 0,
                                                "aliases": [],
                                                "settable": 1,
                                                "attachable": 0,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "type": "number",
                                                "defaultValue": "1",
                                                "label": "Exponent",
                                                "displayorder": 7
                                            },
                                            "steps": {
                                                "attrOrProp": 2,
                                                "digest": "Divide the output into a number of discrete steps",
                                                "isalias": 0,
                                                "aliases": [],
                                                "settable": 1,
                                                "attachable": 0,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "type": "number",
                                                "defaultValue": "0",
                                                "label": "Steps",
                                                "displayorder": 8
                                            },
                                            "displayName": {
                                                "attrOrProp": 2,
                                                "digest": "DEPRECATED: Use the lower case 'displayname' instead",
                                                "isalias": 0,
                                                "aliases": [],
                                                "settable": 1,
                                                "attachable": 0,
                                                "isparam": 0,
                                                "deprecated": 1,
                                                "touched": 0,
                                                "type": "symbol",
                                                "label": "Display Name"
                                            },
                                            "displayname": {
                                                "attrOrProp": 2,
                                                "digest": "A more readable name for the parameter in an external RNBO target",
                                                "isalias": 0,
                                                "aliases": [],
                                                "settable": 1,
                                                "attachable": 0,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "type": "symbol",
                                                "defaultValue": "",
                                                "label": "Display Name",
                                                "displayorder": 14
                                            },
                                            "unit": {
                                                "attrOrProp": 2,
                                                "digest": "A symbol to describe the unit of the parameter in an external RNBO target",
                                                "isalias": 0,
                                                "aliases": [],
                                                "settable": 1,
                                                "attachable": 0,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "type": "symbol",
                                                "defaultValue": "",
                                                "label": "Unit",
                                                "displayorder": 15
                                            },
                                            "tonormalized": {
                                                "attrOrProp": 2,
                                                "digest": "Converts a real parameter value to its normalized form",
                                                "isalias": 0,
                                                "aliases": [],
                                                "settable": 1,
                                                "attachable": 0,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "type": "symbol",
                                                "label": "To Normalized Expression",
                                                "displayorder": 10
                                            },
                                            "fromnormalized": {
                                                "attrOrProp": 2,
                                                "digest": "Converts a normalized parameter into its actual parameter value",
                                                "isalias": 0,
                                                "aliases": [],
                                                "settable": 1,
                                                "attachable": 0,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "type": "symbol",
                                                "label": "From Normalized Expression",
                                                "displayorder": 9
                                            },
                                            "order": {
                                                "attrOrProp": 2,
                                                "digest": "Order in which initial parameter values will be sent out on patcher load. The order can be numeric or symbolic ('first' and 'last')",
                                                "isalias": 0,
                                                "aliases": [],
                                                "settable": 1,
                                                "attachable": 0,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "type": "symbol",
                                                "defaultValue": "0",
                                                "label": "Restore Order",
                                                "displayorder": 12
                                            },
                                            "displayorder": {
                                                "attrOrProp": 2,
                                                "digest": "Order in which parameters will show up in a list of all parameters. The order can be numeric or symbolic ('first' and 'last')",
                                                "isalias": 0,
                                                "aliases": [],
                                                "settable": 1,
                                                "attachable": 0,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "type": "symbol",
                                                "defaultValue": "-",
                                                "label": "Display Order",
                                                "displayorder": 13
                                            },
                                            "sendinit": {
                                                "attrOrProp": 2,
                                                "digest": "Send initial value",
                                                "isalias": 0,
                                                "aliases": [],
                                                "settable": 1,
                                                "attachable": 0,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "type": "bool",
                                                "defaultValue": "true",
                                                "label": "Send Init",
                                                "displayorder": 4
                                            },
                                            "ctlin": {
                                                "attrOrProp": 2,
                                                "digest": "MIDI controller number to control this parameter.",
                                                "isalias": 0,
                                                "aliases": [],
                                                "settable": 1,
                                                "attachable": 0,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "type": "number",
                                                "defaultValue": "-1",
                                                "label": "MIDI Controller Number.",
                                                "displayorder": 16
                                            },
                                            "meta": {
                                                "attrOrProp": 2,
                                                "digest": "A JSON formatted string containing metadata for use by the exported code",
                                                "isalias": 0,
                                                "aliases": [],
                                                "settable": 1,
                                                "attachable": 0,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "type": "symbol",
                                                "defaultValue": "",
                                                "label": "Metadata",
                                                "displayorder": 17
                                            },
                                            "nopreset": {
                                                "attrOrProp": 2,
                                                "digest": "Do not add this value to the preset [DEPRECATED - USE @preset 0 instead].",
                                                "isalias": 0,
                                                "aliases": [],
                                                "settable": 1,
                                                "attachable": 0,
                                                "isparam": 0,
                                                "deprecated": 1,
                                                "touched": 0,
                                                "type": "bool",
                                                "defaultValue": "false"
                                            },
                                            "preset": {
                                                "attrOrProp": 2,
                                                "digest": "Add this value to the preset.",
                                                "isalias": 0,
                                                "aliases": [],
                                                "settable": 1,
                                                "attachable": 0,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "type": "bool",
                                                "defaultValue": "true",
                                                "label": "Include In Preset",
                                                "displayorder": 11
                                            }
                                        },
                                        "inputs": [
                                            {
                                                "name": "value",
                                                "type": "number",
                                                "digest": "Parameter value",
                                                "defaultarg": 2,
                                                "hot": 1,
                                                "docked": 0
                                            },
                                            {
                                                "name": "normalizedvalue",
                                                "type": "number",
                                                "digest": "Set value normalized. ",
                                                "docked": 0
                                            }
                                        ],
                                        "outputs": [
                                            {
                                                "name": "value",
                                                "type": "number",
                                                "digest": "Parameter value",
                                                "defaultarg": 2,
                                                "hot": 1,
                                                "docked": 0
                                            },
                                            {
                                                "name": "normalized",
                                                "type": "number",
                                                "digest": "Normalized parameter value.",
                                                "docked": 0
                                            }
                                        ],
                                        "helpname": "param",
                                        "aliasOf": "param",
                                        "classname": "param",
                                        "operator": 0,
                                        "versionId": -1661410411,
                                        "changesPatcherIO": 0
                                    },
                                    "text": "param slope",
                                    "varname": "slope"
                                }
                            },
                            {
                                "box": {
                                    "id": "obj-2",
                                    "maxclass": "newobj",
                                    "numinlets": 0,
                                    "numoutlets": 1,
                                    "outlettype": [ "signal" ],
                                    "patching_rect": [ 120.0, 190.0, 35.0, 23.0 ],
                                    "rnbo_classname": "in~",
                                    "rnbo_extra_attributes": {
                                        "meta": "",
                                        "comment": ""
                                    },
                                    "rnbo_serial": 1,
                                    "rnbo_uniqueid": "in~_obj-2",
                                    "rnboinfo": {
                                        "needsInstanceInfo": 1,
                                        "argnames": {
                                            "out1": {
                                                "attrOrProp": 1,
                                                "digest": "signal from inlet with index 2",
                                                "isalias": 0,
                                                "aliases": [],
                                                "settable": 0,
                                                "attachable": 0,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "outlet": 1,
                                                "type": "signal"
                                            },
                                            "index": {
                                                "attrOrProp": 2,
                                                "digest": "inlet number",
                                                "defaultarg": 1,
                                                "isalias": 0,
                                                "aliases": [],
                                                "settable": 1,
                                                "attachable": 0,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "type": "number",
                                                "mandatory": 1
                                            },
                                            "comment": {
                                                "attrOrProp": 2,
                                                "digest": "mouse over comment",
                                                "isalias": 0,
                                                "aliases": [],
                                                "settable": 1,
                                                "attachable": 0,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "type": "symbol"
                                            },
                                            "meta": {
                                                "attrOrProp": 2,
                                                "digest": "A JSON formatted string containing metadata for use by the exported code",
                                                "isalias": 0,
                                                "aliases": [],
                                                "settable": 1,
                                                "attachable": 0,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "type": "symbol",
                                                "defaultValue": "",
                                                "label": "Metadata",
                                                "displayorder": 3
                                            }
                                        },
                                        "inputs": [],
                                        "outputs": [
                                            {
                                                "name": "out1",
                                                "type": "signal",
                                                "digest": "signal from inlet with index 2",
                                                "displayName": "",
                                                "docked": 0
                                            }
                                        ],
                                        "helpname": "in~",
                                        "aliasOf": "in~",
                                        "classname": "in~",
                                        "operator": 0,
                                        "versionId": -1654556303,
                                        "changesPatcherIO": 1
                                    },
                                    "text": "in~ 2"
                                }
                            },
                            {
                                "box": {
                                    "id": "obj-1",
                                    "maxclass": "newobj",
                                    "numinlets": 0,
                                    "numoutlets": 1,
                                    "outlettype": [ "signal" ],
                                    "patching_rect": [ 70.0, 190.0, 35.0, 23.0 ],
                                    "rnbo_classname": "in~",
                                    "rnbo_extra_attributes": {
                                        "meta": "",
                                        "comment": ""
                                    },
                                    "rnbo_serial": 2,
                                    "rnbo_uniqueid": "in~_obj-1",
                                    "rnboinfo": {
                                        "needsInstanceInfo": 1,
                                        "argnames": {
                                            "out1": {
                                                "attrOrProp": 1,
                                                "digest": "signal from inlet with index 1",
                                                "isalias": 0,
                                                "aliases": [],
                                                "settable": 0,
                                                "attachable": 0,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "outlet": 1,
                                                "type": "signal"
                                            },
                                            "index": {
                                                "attrOrProp": 2,
                                                "digest": "inlet number",
                                                "defaultarg": 1,
                                                "isalias": 0,
                                                "aliases": [],
                                                "settable": 1,
                                                "attachable": 0,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "type": "number",
                                                "mandatory": 1
                                            },
                                            "comment": {
                                                "attrOrProp": 2,
                                                "digest": "mouse over comment",
                                                "isalias": 0,
                                                "aliases": [],
                                                "settable": 1,
                                                "attachable": 0,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "type": "symbol"
                                            },
                                            "meta": {
                                                "attrOrProp": 2,
                                                "digest": "A JSON formatted string containing metadata for use by the exported code",
                                                "isalias": 0,
                                                "aliases": [],
                                                "settable": 1,
                                                "attachable": 0,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "type": "symbol",
                                                "defaultValue": "",
                                                "label": "Metadata",
                                                "displayorder": 3
                                            }
                                        },
                                        "inputs": [],
                                        "outputs": [
                                            {
                                                "name": "out1",
                                                "type": "signal",
                                                "digest": "signal from inlet with index 1",
                                                "displayName": "",
                                                "docked": 0
                                            }
                                        ],
                                        "helpname": "in~",
                                        "aliasOf": "in~",
                                        "classname": "in~",
                                        "operator": 0,
                                        "versionId": -1654556303,
                                        "changesPatcherIO": 1
                                    },
                                    "text": "in~ 1"
                                }
                            },
                            {
                                "box": {
                                    "id": "obj-16",
                                    "maxclass": "newobj",
                                    "numinlets": 0,
                                    "numoutlets": 1,
                                    "outlettype": [ "signal" ],
                                    "patching_rect": [ 370.0, 90.0, 35.0, 23.0 ],
                                    "rnbo_classname": "in~",
                                    "rnbo_extra_attributes": {
                                        "meta": "",
                                        "comment": ""
                                    },
                                    "rnbo_serial": 3,
                                    "rnbo_uniqueid": "in~_obj-16",
                                    "rnboinfo": {
                                        "needsInstanceInfo": 1,
                                        "argnames": {
                                            "out1": {
                                                "attrOrProp": 1,
                                                "digest": "signal from inlet with index 2",
                                                "isalias": 0,
                                                "aliases": [],
                                                "settable": 0,
                                                "attachable": 0,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "outlet": 1,
                                                "type": "signal"
                                            },
                                            "index": {
                                                "attrOrProp": 2,
                                                "digest": "inlet number",
                                                "defaultarg": 1,
                                                "isalias": 0,
                                                "aliases": [],
                                                "settable": 1,
                                                "attachable": 0,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "type": "number",
                                                "mandatory": 1
                                            },
                                            "comment": {
                                                "attrOrProp": 2,
                                                "digest": "mouse over comment",
                                                "isalias": 0,
                                                "aliases": [],
                                                "settable": 1,
                                                "attachable": 0,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "type": "symbol"
                                            },
                                            "meta": {
                                                "attrOrProp": 2,
                                                "digest": "A JSON formatted string containing metadata for use by the exported code",
                                                "isalias": 0,
                                                "aliases": [],
                                                "settable": 1,
                                                "attachable": 0,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "type": "symbol",
                                                "defaultValue": "",
                                                "label": "Metadata",
                                                "displayorder": 3
                                            }
                                        },
                                        "inputs": [],
                                        "outputs": [
                                            {
                                                "name": "out1",
                                                "type": "signal",
                                                "digest": "signal from inlet with index 2",
                                                "displayName": "",
                                                "docked": 0
                                            }
                                        ],
                                        "helpname": "in~",
                                        "aliasOf": "in~",
                                        "classname": "in~",
                                        "operator": 0,
                                        "versionId": -1654556303,
                                        "changesPatcherIO": 1
                                    },
                                    "text": "in~ 2"
                                }
                            },
                            {
                                "box": {
                                    "id": "obj-17",
                                    "maxclass": "newobj",
                                    "numinlets": 0,
                                    "numoutlets": 1,
                                    "outlettype": [ "signal" ],
                                    "patching_rect": [ 320.0, 90.0, 35.0, 23.0 ],
                                    "rnbo_classname": "in~",
                                    "rnbo_extra_attributes": {
                                        "meta": "",
                                        "comment": ""
                                    },
                                    "rnbo_serial": 4,
                                    "rnbo_uniqueid": "in~_obj-17",
                                    "rnboinfo": {
                                        "needsInstanceInfo": 1,
                                        "argnames": {
                                            "out1": {
                                                "attrOrProp": 1,
                                                "digest": "signal from inlet with index 1",
                                                "isalias": 0,
                                                "aliases": [],
                                                "settable": 0,
                                                "attachable": 0,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "outlet": 1,
                                                "type": "signal"
                                            },
                                            "index": {
                                                "attrOrProp": 2,
                                                "digest": "inlet number",
                                                "defaultarg": 1,
                                                "isalias": 0,
                                                "aliases": [],
                                                "settable": 1,
                                                "attachable": 0,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "type": "number",
                                                "mandatory": 1
                                            },
                                            "comment": {
                                                "attrOrProp": 2,
                                                "digest": "mouse over comment",
                                                "isalias": 0,
                                                "aliases": [],
                                                "settable": 1,
                                                "attachable": 0,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "type": "symbol"
                                            },
                                            "meta": {
                                                "attrOrProp": 2,
                                                "digest": "A JSON formatted string containing metadata for use by the exported code",
                                                "isalias": 0,
                                                "aliases": [],
                                                "settable": 1,
                                                "attachable": 0,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "type": "symbol",
                                                "defaultValue": "",
                                                "label": "Metadata",
                                                "displayorder": 3
                                            }
                                        },
                                        "inputs": [],
                                        "outputs": [
                                            {
                                                "name": "out1",
                                                "type": "signal",
                                                "digest": "signal from inlet with index 1",
                                                "displayName": "",
                                                "docked": 0
                                            }
                                        ],
                                        "helpname": "in~",
                                        "aliasOf": "in~",
                                        "classname": "in~",
                                        "operator": 0,
                                        "versionId": -1654556303,
                                        "changesPatcherIO": 1
                                    },
                                    "text": "in~ 1"
                                }
                            },
                            {
                                "box": {
                                    "fontface": 1,
                                    "id": "obj-110",
                                    "maxclass": "flonum",
                                    "maximum": 100.0,
                                    "minimum": 0.0,
                                    "numinlets": 1,
                                    "numoutlets": 2,
                                    "outlettype": [ "", "bang" ],
                                    "parameter_enable": 0,
                                    "patching_rect": [ 420.0, 120.0, 50.0, 23.0 ],
                                    "rnbo_classname": "number",
                                    "rnbo_extra_attributes": {
                                        "maximum": 100.0,
                                        "initialFormat": "float",
                                        "minimum": 0.0,
                                        "order": "",
                                        "preset": 0
                                    },
                                    "rnbo_serial": 3,
                                    "rnbo_uniqueid": "number_obj-110",
                                    "saved_attribute_attributes": {
                                        "textcolor": {
                                            "expression": "themecolor.theme_selectioncolor"
                                        }
                                    },
                                    "textcolor": [ 0.922234290352602, 0.71007200526417, 0.329758341965716, 1.0 ]
                                }
                            },
                            {
                                "box": {
                                    "id": "obj-109",
                                    "maxclass": "newobj",
                                    "numinlets": 2,
                                    "numoutlets": 2,
                                    "outlettype": [ "", "" ],
                                    "patching_rect": [ 420.0, 90.0, 74.0, 23.0 ],
                                    "rnbo_classname": "param",
                                    "rnbo_extra_attributes": {
                                        "meta": "",
                                        "tonormalized": "",
                                        "ctlin": 2.0,
                                        "maximum": 100.0,
                                        "enum": "",
                                        "fromnormalized": "",
                                        "minimum": 0.0,
                                        "steps": 0.0,
                                        "unit": "%",
                                        "order": "2",
                                        "displayorder": "-",
                                        "preset": 1,
                                        "displayname": "Sense",
                                        "sendinit": 1,
                                        "exponent": 1.0
                                    },
                                    "rnbo_serial": 4,
                                    "rnbo_uniqueid": "sense",
                                    "rnboinfo": {
                                        "needsInstanceInfo": 1,
                                        "argnames": {
                                            "value": {
                                                "attrOrProp": 1,
                                                "digest": "Parameter value",
                                                "defaultarg": 2,
                                                "isalias": 0,
                                                "aliases": [],
                                                "settable": 1,
                                                "attachable": 0,
                                                "isparam": 1,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "inlet": 1,
                                                "type": "number",
                                                "defaultValue": "25"
                                            },
                                            "normalizedvalue": {
                                                "attrOrProp": 1,
                                                "digest": "Set value normalized. ",
                                                "isalias": 0,
                                                "aliases": [],
                                                "attachable": 0,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "inlet": 1,
                                                "type": "number"
                                            },
                                            "reset": {
                                                "attrOrProp": 1,
                                                "digest": "Reset param to initial value",
                                                "isalias": 0,
                                                "aliases": [],
                                                "attachable": 1,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "type": "bang"
                                            },
                                            "normalized": {
                                                "attrOrProp": 1,
                                                "digest": "Normalized parameter value.",
                                                "isalias": 0,
                                                "aliases": [],
                                                "attachable": 0,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "outlet": 1,
                                                "type": "number"
                                            },
                                            "name": {
                                                "attrOrProp": 2,
                                                "digest": "Name of the parameter",
                                                "defaultarg": 1,
                                                "isalias": 0,
                                                "aliases": [],
                                                "settable": 1,
                                                "attachable": 0,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "type": "symbol",
                                                "label": "Parameter Name",
                                                "mandatory": 1
                                            },
                                            "enum": {
                                                "attrOrProp": 2,
                                                "digest": "Use an enumerated output",
                                                "isalias": 0,
                                                "aliases": [],
                                                "settable": 1,
                                                "attachable": 0,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "type": "list",
                                                "label": "Enum Values",
                                                "displayorder": 6
                                            },
                                            "minimum": {
                                                "attrOrProp": 2,
                                                "digest": "Minimum value",
                                                "isalias": 0,
                                                "aliases": [ "min" ],
                                                "settable": 1,
                                                "attachable": 0,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "type": "number",
                                                "defaultValue": "0",
                                                "label": "Minimum",
                                                "displayorder": 1
                                            },
                                            "min": {
                                                "attrOrProp": 2,
                                                "digest": "Minimum value",
                                                "isalias": 1,
                                                "aliasOf": "minimum",
                                                "aliases": [],
                                                "settable": 1,
                                                "attachable": 0,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "type": "number",
                                                "defaultValue": "0",
                                                "label": "Minimum",
                                                "displayorder": 1
                                            },
                                            "maximum": {
                                                "attrOrProp": 2,
                                                "digest": "Maximum value",
                                                "isalias": 0,
                                                "aliases": [ "max" ],
                                                "settable": 1,
                                                "attachable": 0,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "type": "number",
                                                "defaultValue": "1",
                                                "label": "Maximum",
                                                "displayorder": 2
                                            },
                                            "max": {
                                                "attrOrProp": 2,
                                                "digest": "Maximum value",
                                                "isalias": 1,
                                                "aliasOf": "maximum",
                                                "aliases": [],
                                                "settable": 1,
                                                "attachable": 0,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "type": "number",
                                                "defaultValue": "1",
                                                "label": "Maximum",
                                                "displayorder": 2
                                            },
                                            "exponent": {
                                                "attrOrProp": 2,
                                                "digest": "Scale values exponentially",
                                                "isalias": 0,
                                                "aliases": [],
                                                "settable": 1,
                                                "attachable": 0,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "type": "number",
                                                "defaultValue": "1",
                                                "label": "Exponent",
                                                "displayorder": 7
                                            },
                                            "steps": {
                                                "attrOrProp": 2,
                                                "digest": "Divide the output into a number of discrete steps",
                                                "isalias": 0,
                                                "aliases": [],
                                                "settable": 1,
                                                "attachable": 0,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "type": "number",
                                                "defaultValue": "0",
                                                "label": "Steps",
                                                "displayorder": 8
                                            },
                                            "displayName": {
                                                "attrOrProp": 2,
                                                "digest": "DEPRECATED: Use the lower case 'displayname' instead",
                                                "isalias": 0,
                                                "aliases": [],
                                                "settable": 1,
                                                "attachable": 0,
                                                "isparam": 0,
                                                "deprecated": 1,
                                                "touched": 0,
                                                "type": "symbol",
                                                "label": "Display Name"
                                            },
                                            "displayname": {
                                                "attrOrProp": 2,
                                                "digest": "A more readable name for the parameter in an external RNBO target",
                                                "isalias": 0,
                                                "aliases": [],
                                                "settable": 1,
                                                "attachable": 0,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "type": "symbol",
                                                "defaultValue": "",
                                                "label": "Display Name",
                                                "displayorder": 14
                                            },
                                            "unit": {
                                                "attrOrProp": 2,
                                                "digest": "A symbol to describe the unit of the parameter in an external RNBO target",
                                                "isalias": 0,
                                                "aliases": [],
                                                "settable": 1,
                                                "attachable": 0,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "type": "symbol",
                                                "defaultValue": "",
                                                "label": "Unit",
                                                "displayorder": 15
                                            },
                                            "tonormalized": {
                                                "attrOrProp": 2,
                                                "digest": "Converts a real parameter value to its normalized form",
                                                "isalias": 0,
                                                "aliases": [],
                                                "settable": 1,
                                                "attachable": 0,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "type": "symbol",
                                                "label": "To Normalized Expression",
                                                "displayorder": 10
                                            },
                                            "fromnormalized": {
                                                "attrOrProp": 2,
                                                "digest": "Converts a normalized parameter into its actual parameter value",
                                                "isalias": 0,
                                                "aliases": [],
                                                "settable": 1,
                                                "attachable": 0,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "type": "symbol",
                                                "label": "From Normalized Expression",
                                                "displayorder": 9
                                            },
                                            "order": {
                                                "attrOrProp": 2,
                                                "digest": "Order in which initial parameter values will be sent out on patcher load. The order can be numeric or symbolic ('first' and 'last')",
                                                "isalias": 0,
                                                "aliases": [],
                                                "settable": 1,
                                                "attachable": 0,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "type": "symbol",
                                                "defaultValue": "0",
                                                "label": "Restore Order",
                                                "displayorder": 12
                                            },
                                            "displayorder": {
                                                "attrOrProp": 2,
                                                "digest": "Order in which parameters will show up in a list of all parameters. The order can be numeric or symbolic ('first' and 'last')",
                                                "isalias": 0,
                                                "aliases": [],
                                                "settable": 1,
                                                "attachable": 0,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "type": "symbol",
                                                "defaultValue": "-",
                                                "label": "Display Order",
                                                "displayorder": 13
                                            },
                                            "sendinit": {
                                                "attrOrProp": 2,
                                                "digest": "Send initial value",
                                                "isalias": 0,
                                                "aliases": [],
                                                "settable": 1,
                                                "attachable": 0,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "type": "bool",
                                                "defaultValue": "true",
                                                "label": "Send Init",
                                                "displayorder": 4
                                            },
                                            "ctlin": {
                                                "attrOrProp": 2,
                                                "digest": "MIDI controller number to control this parameter.",
                                                "isalias": 0,
                                                "aliases": [],
                                                "settable": 1,
                                                "attachable": 0,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "type": "number",
                                                "defaultValue": "-1",
                                                "label": "MIDI Controller Number.",
                                                "displayorder": 16
                                            },
                                            "meta": {
                                                "attrOrProp": 2,
                                                "digest": "A JSON formatted string containing metadata for use by the exported code",
                                                "isalias": 0,
                                                "aliases": [],
                                                "settable": 1,
                                                "attachable": 0,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "type": "symbol",
                                                "defaultValue": "",
                                                "label": "Metadata",
                                                "displayorder": 17
                                            },
                                            "nopreset": {
                                                "attrOrProp": 2,
                                                "digest": "Do not add this value to the preset [DEPRECATED - USE @preset 0 instead].",
                                                "isalias": 0,
                                                "aliases": [],
                                                "settable": 1,
                                                "attachable": 0,
                                                "isparam": 0,
                                                "deprecated": 1,
                                                "touched": 0,
                                                "type": "bool",
                                                "defaultValue": "false"
                                            },
                                            "preset": {
                                                "attrOrProp": 2,
                                                "digest": "Add this value to the preset.",
                                                "isalias": 0,
                                                "aliases": [],
                                                "settable": 1,
                                                "attachable": 0,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "type": "bool",
                                                "defaultValue": "true",
                                                "label": "Include In Preset",
                                                "displayorder": 11
                                            }
                                        },
                                        "inputs": [
                                            {
                                                "name": "value",
                                                "type": "number",
                                                "digest": "Parameter value",
                                                "defaultarg": 2,
                                                "hot": 1,
                                                "docked": 0
                                            },
                                            {
                                                "name": "normalizedvalue",
                                                "type": "number",
                                                "digest": "Set value normalized. ",
                                                "docked": 0
                                            }
                                        ],
                                        "outputs": [
                                            {
                                                "name": "value",
                                                "type": "number",
                                                "digest": "Parameter value",
                                                "defaultarg": 2,
                                                "hot": 1,
                                                "docked": 0
                                            },
                                            {
                                                "name": "normalized",
                                                "type": "number",
                                                "digest": "Normalized parameter value.",
                                                "docked": 0
                                            }
                                        ],
                                        "helpname": "param",
                                        "aliasOf": "param",
                                        "classname": "param",
                                        "operator": 0,
                                        "versionId": -1661410411,
                                        "changesPatcherIO": 0
                                    },
                                    "text": "param sense",
                                    "varname": "sense"
                                }
                            },
                            {
                                "box": {
                                    "id": "obj-102",
                                    "maxclass": "button",
                                    "numinlets": 1,
                                    "numoutlets": 1,
                                    "outlettype": [ "bang" ],
                                    "parameter_enable": 0,
                                    "patching_rect": [ 320.0, 250.0, 24.0, 24.0 ],
                                    "rnbo_classname": "button",
                                    "rnbo_serial": 1,
                                    "rnbo_uniqueid": "button_obj-102"
                                }
                            },
                            {
                                "box": {
                                    "color": [ 0.618934978328545, 0.744701397656435, 0.953750108255376, 1.0 ],
                                    "id": "obj-8",
                                    "linecount": 2,
                                    "maxclass": "newobj",
                                    "numinlets": 3,
                                    "numoutlets": 1,
                                    "outlettype": [ "" ],
                                    "patcher": {
                                        "fileversion": 1,
                                        "appversion": {
                                            "major": 9,
                                            "minor": 1,
                                            "revision": 2,
                                            "architecture": "x64",
                                            "modernui": 1
                                        },
                                        "classnamespace": "rnbo",
                                        "rect": [ 34.0, 100.0, 600.0, 753.0 ],
                                        "default_fontname": "Lato",
                                        "gridonopen": 2,
                                        "gridsize": [ 10.0, 10.0 ],
                                        "gridsnaponopen": 2,
                                        "objectsnaponopen": 0,
                                        "subpatcher_template": "MP-Rnbo",
                                        "integercoordinates": 1,
                                        "title": "AttackDetection~",
                                        "boxes": [
                                            {
                                                "box": {
                                                    "id": "obj-25",
                                                    "maxclass": "newobj",
                                                    "numinlets": 1,
                                                    "numoutlets": 0,
                                                    "patching_rect": [ 410.0, 690.0, 84.0, 23.0 ],
                                                    "rnbo_classname": "outport",
                                                    "rnbo_extra_attributes": {
                                                        "meta": ""
                                                    },
                                                    "rnbo_serial": 1,
                                                    "rnbo_uniqueid": "outport_obj-25",
                                                    "text": "outport attack"
                                                }
                                            },
                                            {
                                                "box": {
                                                    "id": "obj-30",
                                                    "maxclass": "newobj",
                                                    "numinlets": 2,
                                                    "numoutlets": 1,
                                                    "outlettype": [ "signal" ],
                                                    "patching_rect": [ 60.0, 90.0, 29.5, 23.0 ],
                                                    "rnbo_classname": "+~",
                                                    "rnbo_serial": 1,
                                                    "rnbo_uniqueid": "+~_obj-30",
                                                    "text": "+~"
                                                }
                                            },
                                            {
                                                "box": {
                                                    "id": "obj-24",
                                                    "maxclass": "newobj",
                                                    "numinlets": 0,
                                                    "numoutlets": 1,
                                                    "outlettype": [ "signal" ],
                                                    "patching_rect": [ 100.0, 50.0, 35.0, 23.0 ],
                                                    "rnbo_classname": "in~",
                                                    "rnbo_extra_attributes": {
                                                        "meta": "",
                                                        "comment": ""
                                                    },
                                                    "rnbo_serial": 1,
                                                    "rnbo_uniqueid": "in~_obj-24",
                                                    "rnboinfo": {
                                                        "needsInstanceInfo": 1,
                                                        "argnames": {
                                                            "out1": {
                                                                "attrOrProp": 1,
                                                                "digest": "signal from inlet with index 2",
                                                                "isalias": 0,
                                                                "aliases": [],
                                                                "settable": 0,
                                                                "attachable": 0,
                                                                "isparam": 0,
                                                                "deprecated": 0,
                                                                "touched": 0,
                                                                "outlet": 1,
                                                                "type": "signal"
                                                            },
                                                            "index": {
                                                                "attrOrProp": 2,
                                                                "digest": "inlet number",
                                                                "defaultarg": 1,
                                                                "isalias": 0,
                                                                "aliases": [],
                                                                "settable": 1,
                                                                "attachable": 0,
                                                                "isparam": 0,
                                                                "deprecated": 0,
                                                                "touched": 0,
                                                                "type": "number",
                                                                "mandatory": 1
                                                            },
                                                            "comment": {
                                                                "attrOrProp": 2,
                                                                "digest": "mouse over comment",
                                                                "isalias": 0,
                                                                "aliases": [],
                                                                "settable": 1,
                                                                "attachable": 0,
                                                                "isparam": 0,
                                                                "deprecated": 0,
                                                                "touched": 0,
                                                                "type": "symbol"
                                                            },
                                                            "meta": {
                                                                "attrOrProp": 2,
                                                                "digest": "A JSON formatted string containing metadata for use by the exported code",
                                                                "isalias": 0,
                                                                "aliases": [],
                                                                "settable": 1,
                                                                "attachable": 0,
                                                                "isparam": 0,
                                                                "deprecated": 0,
                                                                "touched": 0,
                                                                "type": "symbol",
                                                                "defaultValue": "",
                                                                "label": "Metadata",
                                                                "displayorder": 3
                                                            }
                                                        },
                                                        "inputs": [],
                                                        "outputs": [
                                                            {
                                                                "name": "out1",
                                                                "type": "signal",
                                                                "digest": "signal from inlet with index 2",
                                                                "displayName": "",
                                                                "docked": 0
                                                            }
                                                        ],
                                                        "helpname": "in~",
                                                        "aliasOf": "in~",
                                                        "classname": "in~",
                                                        "operator": 0,
                                                        "versionId": -1654556303,
                                                        "changesPatcherIO": 1
                                                    },
                                                    "text": "in~ 2"
                                                }
                                            },
                                            {
                                                "box": {
                                                    "id": "obj-16",
                                                    "maxclass": "toggle",
                                                    "numinlets": 1,
                                                    "numoutlets": 1,
                                                    "outlettype": [ "int" ],
                                                    "parameter_enable": 0,
                                                    "patching_rect": [ 360.0, 569.0, 24.0, 24.0 ],
                                                    "rnbo_classname": "toggle",
                                                    "rnbo_extra_attributes": {
                                                        "order": "",
                                                        "preset": 0
                                                    },
                                                    "rnbo_serial": 1,
                                                    "rnbo_uniqueid": "toggle_obj-16"
                                                }
                                            },
                                            {
                                                "box": {
                                                    "id": "obj-80",
                                                    "maxclass": "button",
                                                    "numinlets": 1,
                                                    "numoutlets": 1,
                                                    "outlettype": [ "bang" ],
                                                    "parameter_enable": 0,
                                                    "patching_rect": [ 92.0, 490.0, 24.0, 24.0 ],
                                                    "rnbo_classname": "button",
                                                    "rnbo_serial": 1,
                                                    "rnbo_uniqueid": "button_obj-80"
                                                }
                                            },
                                            {
                                                "box": {
                                                    "id": "obj-78",
                                                    "maxclass": "button",
                                                    "numinlets": 1,
                                                    "numoutlets": 1,
                                                    "outlettype": [ "bang" ],
                                                    "parameter_enable": 0,
                                                    "patching_rect": [ 60.0, 490.0, 24.0, 24.0 ],
                                                    "rnbo_classname": "button",
                                                    "rnbo_serial": 2,
                                                    "rnbo_uniqueid": "button_obj-78"
                                                }
                                            },
                                            {
                                                "box": {
                                                    "id": "obj-74",
                                                    "maxclass": "flonum",
                                                    "numinlets": 1,
                                                    "numoutlets": 2,
                                                    "outlettype": [ "", "bang" ],
                                                    "parameter_enable": 0,
                                                    "patching_rect": [ 40.0, 580.0, 50.0, 23.0 ],
                                                    "rnbo_classname": "number",
                                                    "rnbo_extra_attributes": {
                                                        "maximum": "<none>",
                                                        "initialFormat": "float",
                                                        "minimum": "<none>",
                                                        "order": "",
                                                        "preset": 0
                                                    },
                                                    "rnbo_serial": 1,
                                                    "rnbo_uniqueid": "number_obj-74"
                                                }
                                            },
                                            {
                                                "box": {
                                                    "id": "obj-64",
                                                    "maxclass": "toggle",
                                                    "numinlets": 1,
                                                    "numoutlets": 1,
                                                    "outlettype": [ "int" ],
                                                    "parameter_enable": 0,
                                                    "patching_rect": [ 190.0, 130.0, 24.0, 24.0 ],
                                                    "rnbo_classname": "toggle",
                                                    "rnbo_extra_attributes": {
                                                        "order": "",
                                                        "preset": 0
                                                    },
                                                    "rnbo_serial": 2,
                                                    "rnbo_uniqueid": "toggle_obj-64"
                                                }
                                            },
                                            {
                                                "box": {
                                                    "id": "obj-61",
                                                    "maxclass": "flonum",
                                                    "numinlets": 1,
                                                    "numoutlets": 2,
                                                    "outlettype": [ "", "bang" ],
                                                    "parameter_enable": 0,
                                                    "patching_rect": [ 400.0, 210.0, 50.0, 23.0 ],
                                                    "rnbo_classname": "number",
                                                    "rnbo_extra_attributes": {
                                                        "maximum": "<none>",
                                                        "initialFormat": "float",
                                                        "minimum": "<none>",
                                                        "order": "",
                                                        "preset": 0
                                                    },
                                                    "rnbo_serial": 2,
                                                    "rnbo_uniqueid": "number_obj-61"
                                                }
                                            },
                                            {
                                                "box": {
                                                    "id": "obj-59",
                                                    "maxclass": "newobj",
                                                    "numinlets": 2,
                                                    "numoutlets": 1,
                                                    "outlettype": [ "" ],
                                                    "patching_rect": [ 190.0, 100.0, 29.5, 23.0 ],
                                                    "rnbo_classname": ">",
                                                    "rnbo_extra_attributes": {
                                                        "hot": 0
                                                    },
                                                    "rnbo_serial": 1,
                                                    "rnbo_uniqueid": ">_obj-59",
                                                    "text": "> 0"
                                                }
                                            },
                                            {
                                                "box": {
                                                    "id": "obj-58",
                                                    "maxclass": "flonum",
                                                    "numinlets": 1,
                                                    "numoutlets": 2,
                                                    "outlettype": [ "", "bang" ],
                                                    "parameter_enable": 0,
                                                    "patching_rect": [ 400.0, 510.0, 50.0, 23.0 ],
                                                    "rnbo_classname": "number",
                                                    "rnbo_extra_attributes": {
                                                        "maximum": "<none>",
                                                        "initialFormat": "float",
                                                        "minimum": "<none>",
                                                        "order": "",
                                                        "preset": 0
                                                    },
                                                    "rnbo_serial": 3,
                                                    "rnbo_uniqueid": "number_obj-58"
                                                }
                                            },
                                            {
                                                "box": {
                                                    "id": "obj-56",
                                                    "maxclass": "newobj",
                                                    "numinlets": 6,
                                                    "numoutlets": 1,
                                                    "outlettype": [ "" ],
                                                    "patching_rect": [ 400.0, 480.0, 141.0, 23.0 ],
                                                    "rnbo_classname": "scale",
                                                    "rnbo_serial": 1,
                                                    "rnbo_uniqueid": "scale_obj-56",
                                                    "text": "scale 0. 100. 1000. 0. 0.5"
                                                }
                                            },
                                            {
                                                "box": {
                                                    "id": "obj-53",
                                                    "maxclass": "button",
                                                    "numinlets": 1,
                                                    "numoutlets": 1,
                                                    "outlettype": [ "bang" ],
                                                    "parameter_enable": 0,
                                                    "patching_rect": [ 360.0, 629.0, 24.0, 24.0 ],
                                                    "rnbo_classname": "button",
                                                    "rnbo_serial": 3,
                                                    "rnbo_uniqueid": "button_obj-53"
                                                }
                                            },
                                            {
                                                "box": {
                                                    "id": "obj-29",
                                                    "maxclass": "flonum",
                                                    "numinlets": 1,
                                                    "numoutlets": 2,
                                                    "outlettype": [ "", "bang" ],
                                                    "parameter_enable": 0,
                                                    "patching_rect": [ 260.0, 380.0, 50.0, 23.0 ],
                                                    "rnbo_classname": "number",
                                                    "rnbo_extra_attributes": {
                                                        "maximum": "<none>",
                                                        "initialFormat": "float",
                                                        "minimum": "<none>",
                                                        "order": "",
                                                        "preset": 0
                                                    },
                                                    "rnbo_serial": 4,
                                                    "rnbo_uniqueid": "number_obj-29"
                                                }
                                            },
                                            {
                                                "box": {
                                                    "id": "obj-28",
                                                    "maxclass": "newobj",
                                                    "numinlets": 6,
                                                    "numoutlets": 1,
                                                    "outlettype": [ "" ],
                                                    "patching_rect": [ 260.0, 350.0, 134.0, 23.0 ],
                                                    "rnbo_classname": "scale",
                                                    "rnbo_serial": 2,
                                                    "rnbo_uniqueid": "scale_obj-28",
                                                    "text": "scale 0. 100. 100. 0. 0.5"
                                                }
                                            },
                                            {
                                                "box": {
                                                    "id": "obj-22",
                                                    "maxclass": "newobj",
                                                    "numinlets": 0,
                                                    "numoutlets": 1,
                                                    "outlettype": [ "" ],
                                                    "patching_rect": [ 400.0, 170.0, 28.0, 23.0 ],
                                                    "rnbo_classname": "in",
                                                    "rnbo_extra_attributes": {
                                                        "meta": "",
                                                        "comment": ""
                                                    },
                                                    "rnbo_serial": 1,
                                                    "rnbo_uniqueid": "Attack",
                                                    "rnboinfo": {
                                                        "needsInstanceInfo": 1,
                                                        "argnames": {
                                                            "index": {
                                                                "attrOrProp": 2,
                                                                "digest": "inlet number",
                                                                "defaultarg": 1,
                                                                "isalias": 0,
                                                                "aliases": [],
                                                                "settable": 1,
                                                                "attachable": 0,
                                                                "isparam": 0,
                                                                "deprecated": 0,
                                                                "touched": 0,
                                                                "type": "number",
                                                                "mandatory": 1
                                                            },
                                                            "comment": {
                                                                "attrOrProp": 2,
                                                                "digest": "mouse over comment",
                                                                "isalias": 0,
                                                                "aliases": [],
                                                                "settable": 1,
                                                                "attachable": 0,
                                                                "isparam": 0,
                                                                "deprecated": 0,
                                                                "touched": 0,
                                                                "type": "symbol"
                                                            },
                                                            "meta": {
                                                                "attrOrProp": 2,
                                                                "digest": "A JSON formatted string containing metadata for use by the exported code",
                                                                "isalias": 0,
                                                                "aliases": [],
                                                                "settable": 1,
                                                                "attachable": 0,
                                                                "isparam": 0,
                                                                "deprecated": 0,
                                                                "touched": 0,
                                                                "type": "symbol",
                                                                "defaultValue": "",
                                                                "label": "Metadata",
                                                                "displayorder": 3
                                                            }
                                                        },
                                                        "inputs": [],
                                                        "outputs": [
                                                            {
                                                                "name": "out1",
                                                                "type": [ "bang", "number", "list" ],
                                                                "digest": "value from inlet with index 3",
                                                                "displayName": "",
                                                                "docked": 0
                                                            }
                                                        ],
                                                        "helpname": "in",
                                                        "aliasOf": "in",
                                                        "classname": "in",
                                                        "operator": 0,
                                                        "versionId": 475235762,
                                                        "changesPatcherIO": 1
                                                    },
                                                    "text": "in 3",
                                                    "varname": "Attack"
                                                }
                                            },
                                            {
                                                "box": {
                                                    "id": "obj-27",
                                                    "maxclass": "newobj",
                                                    "numinlets": 2,
                                                    "numoutlets": 2,
                                                    "outlettype": [ "", "" ],
                                                    "patching_rect": [ 360.0, 599.0, 49.0, 23.0 ],
                                                    "rnbo_classname": "select",
                                                    "rnbo_serial": 1,
                                                    "rnbo_uniqueid": "select_obj-27",
                                                    "rnboinfo": {
                                                        "needsInstanceInfo": 1,
                                                        "argnames": {
                                                            "test1": {
                                                                "attrOrProp": 1,
                                                                "digest": "Set Value (1) to Match",
                                                                "defaultarg": 1,
                                                                "isalias": 0,
                                                                "aliases": [],
                                                                "settable": 1,
                                                                "attachable": 0,
                                                                "isparam": 0,
                                                                "deprecated": 0,
                                                                "inlet": 1,
                                                                "type": "number",
                                                                "defaultValue": "1"
                                                            },
                                                            "match1": {
                                                                "attrOrProp": 1,
                                                                "digest": "Bang if input matches 1",
                                                                "isalias": 0,
                                                                "aliases": [],
                                                                "attachable": 0,
                                                                "isparam": 0,
                                                                "deprecated": 0,
                                                                "outlet": 1,
                                                                "type": "bang"
                                                            }
                                                        },
                                                        "inputs": [
                                                            {
                                                                "name": "input",
                                                                "type": [ "number", "bang" ],
                                                                "digest": "Number to test",
                                                                "hot": 1,
                                                                "docked": 0
                                                            },
                                                            {
                                                                "name": "test1",
                                                                "type": "number",
                                                                "digest": "Set Value (1) to Match",
                                                                "defaultarg": 1,
                                                                "docked": 0
                                                            }
                                                        ],
                                                        "outputs": [
                                                            {
                                                                "name": "match1",
                                                                "type": "bang",
                                                                "digest": "Bang if input matches 1",
                                                                "docked": 0
                                                            },
                                                            {
                                                                "name": "nomatch",
                                                                "type": [ "number", "bang" ],
                                                                "digest": "Input if Input Doesn't Match",
                                                                "docked": 0
                                                            }
                                                        ],
                                                        "helpname": "select",
                                                        "aliasOf": "select",
                                                        "classname": "select",
                                                        "operator": 0,
                                                        "versionId": 902197102,
                                                        "changesPatcherIO": 0
                                                    },
                                                    "text": "select 1"
                                                }
                                            },
                                            {
                                                "box": {
                                                    "id": "obj-26",
                                                    "maxclass": "newobj",
                                                    "numinlets": 2,
                                                    "numoutlets": 1,
                                                    "outlettype": [ "" ],
                                                    "patching_rect": [ 360.0, 539.0, 59.0, 23.0 ],
                                                    "rnbo_classname": ">=",
                                                    "rnbo_extra_attributes": {
                                                        "hot": 0
                                                    },
                                                    "rnbo_serial": 1,
                                                    "rnbo_uniqueid": ">=_obj-26",
                                                    "text": ">= 1000"
                                                }
                                            },
                                            {
                                                "box": {
                                                    "id": "obj-10",
                                                    "maxclass": "newobj",
                                                    "numinlets": 2,
                                                    "numoutlets": 1,
                                                    "outlettype": [ "signal" ],
                                                    "patching_rect": [ 60.0, 130.0, 29.5, 23.0 ],
                                                    "rnbo_classname": "*~",
                                                    "rnbo_serial": 1,
                                                    "rnbo_uniqueid": "*~_obj-10",
                                                    "text": "*~"
                                                }
                                            },
                                            {
                                                "box": {
                                                    "id": "obj-35",
                                                    "maxclass": "newobj",
                                                    "numinlets": 1,
                                                    "numoutlets": 0,
                                                    "patching_rect": [ 360.0, 689.0, 36.0, 23.0 ],
                                                    "rnbo_classname": "out",
                                                    "rnbo_extra_attributes": {
                                                        "meta": "",
                                                        "comment": ""
                                                    },
                                                    "rnbo_serial": 1,
                                                    "rnbo_uniqueid": "out_obj-35",
                                                    "rnboinfo": {
                                                        "needsInstanceInfo": 1,
                                                        "argnames": {
                                                            "index": {
                                                                "attrOrProp": 2,
                                                                "digest": "outlet number",
                                                                "defaultarg": 1,
                                                                "isalias": 0,
                                                                "aliases": [],
                                                                "settable": 1,
                                                                "attachable": 0,
                                                                "isparam": 0,
                                                                "deprecated": 0,
                                                                "touched": 0,
                                                                "type": "number",
                                                                "mandatory": 1
                                                            },
                                                            "comment": {
                                                                "attrOrProp": 2,
                                                                "digest": "mouse over comment",
                                                                "isalias": 0,
                                                                "aliases": [],
                                                                "settable": 1,
                                                                "attachable": 0,
                                                                "isparam": 0,
                                                                "deprecated": 0,
                                                                "touched": 0,
                                                                "type": "symbol"
                                                            },
                                                            "meta": {
                                                                "attrOrProp": 2,
                                                                "digest": "A JSON formatted string containing metadata for use by the exported code",
                                                                "isalias": 0,
                                                                "aliases": [],
                                                                "settable": 1,
                                                                "attachable": 0,
                                                                "isparam": 0,
                                                                "deprecated": 0,
                                                                "touched": 0,
                                                                "type": "symbol",
                                                                "defaultValue": "",
                                                                "label": "Metadata",
                                                                "displayorder": 3
                                                            }
                                                        },
                                                        "inputs": [
                                                            {
                                                                "name": "in1",
                                                                "type": [ "bang", "number", "list" ],
                                                                "digest": "value sent to outlet with index 1",
                                                                "displayName": "",
                                                                "hot": 1,
                                                                "docked": 0
                                                            }
                                                        ],
                                                        "outputs": [],
                                                        "helpname": "out",
                                                        "aliasOf": "out",
                                                        "classname": "out",
                                                        "operator": 0,
                                                        "versionId": 1131826829,
                                                        "changesPatcherIO": 1
                                                    },
                                                    "text": "out 1"
                                                }
                                            },
                                            {
                                                "box": {
                                                    "id": "obj-21",
                                                    "maxclass": "newobj",
                                                    "numinlets": 3,
                                                    "numoutlets": 1,
                                                    "outlettype": [ "signal" ],
                                                    "patching_rect": [ 60.0, 210.0, 130.0, 23.0 ],
                                                    "rnbo_classname": "rampsmooth~",
                                                    "rnbo_serial": 1,
                                                    "rnbo_uniqueid": "rampsmooth~_obj-21",
                                                    "text": "rampsmooth~ 480 480"
                                                }
                                            },
                                            {
                                                "box": {
                                                    "id": "obj-15",
                                                    "maxclass": "newobj",
                                                    "numinlets": 2,
                                                    "numoutlets": 1,
                                                    "outlettype": [ "" ],
                                                    "patching_rect": [ 40.0, 540.0, 39.0, 23.0 ],
                                                    "rnbo_classname": "timer",
                                                    "rnbo_serial": 1,
                                                    "rnbo_uniqueid": "timer_obj-15",
                                                    "text": "timer"
                                                }
                                            },
                                            {
                                                "box": {
                                                    "id": "obj-14",
                                                    "maxclass": "newobj",
                                                    "numinlets": 1,
                                                    "numoutlets": 2,
                                                    "outlettype": [ "", "" ],
                                                    "patching_rect": [ 60.0, 460.0, 51.0, 23.0 ],
                                                    "rnbo_classname": "edge~",
                                                    "rnbo_serial": 1,
                                                    "rnbo_uniqueid": "edge~_obj-14",
                                                    "text": "edge~"
                                                }
                                            },
                                            {
                                                "box": {
                                                    "id": "obj-12",
                                                    "maxclass": "newobj",
                                                    "numinlets": 2,
                                                    "numoutlets": 1,
                                                    "outlettype": [ "signal" ],
                                                    "patching_rect": [ 160.0, 350.0, 39.0, 23.0 ],
                                                    "rnbo_classname": "+~",
                                                    "rnbo_serial": 2,
                                                    "rnbo_uniqueid": "+~_obj-12",
                                                    "text": "+~ 50"
                                                }
                                            },
                                            {
                                                "box": {
                                                    "id": "obj-2",
                                                    "maxclass": "newobj",
                                                    "numinlets": 2,
                                                    "numoutlets": 1,
                                                    "outlettype": [ "signal" ],
                                                    "patching_rect": [ 110.0, 350.0, 37.0, 23.0 ],
                                                    "rnbo_classname": "+~",
                                                    "rnbo_serial": 3,
                                                    "rnbo_uniqueid": "+~_obj-2",
                                                    "text": "+~ -1"
                                                }
                                            },
                                            {
                                                "box": {
                                                    "id": "obj-4",
                                                    "maxclass": "newobj",
                                                    "numinlets": 2,
                                                    "numoutlets": 1,
                                                    "outlettype": [ "" ],
                                                    "patching_rect": [ 160.0, 310.0, 73.0, 23.0 ],
                                                    "rnbo_classname": "peakamp~",
                                                    "rnbo_serial": 1,
                                                    "rnbo_uniqueid": "peakamp~_obj-4",
                                                    "text": "peakamp~ 5"
                                                }
                                            },
                                            {
                                                "box": {
                                                    "id": "obj-5",
                                                    "maxclass": "newobj",
                                                    "numinlets": 3,
                                                    "numoutlets": 1,
                                                    "outlettype": [ "signal" ],
                                                    "patching_rect": [ 160.0, 280.0, 145.0, 23.0 ],
                                                    "rnbo_classname": "average_absolute~",
                                                    "rnbo_serial": 1,
                                                    "rnbo_uniqueid": "average_absolute~_obj-5",
                                                    "text": "average_absolute~ 24000"
                                                }
                                            },
                                            {
                                                "box": {
                                                    "id": "obj-6",
                                                    "maxclass": "newobj",
                                                    "numinlets": 3,
                                                    "numoutlets": 1,
                                                    "outlettype": [ "signal" ],
                                                    "patching_rect": [ 60.0, 390.0, 119.0, 23.0 ],
                                                    "rnbo_classname": "thresh~",
                                                    "rnbo_serial": 1,
                                                    "rnbo_uniqueid": "thresh~_obj-6",
                                                    "text": "thresh~"
                                                }
                                            },
                                            {
                                                "box": {
                                                    "id": "obj-8",
                                                    "maxclass": "newobj",
                                                    "numinlets": 2,
                                                    "numoutlets": 1,
                                                    "outlettype": [ "signal" ],
                                                    "patching_rect": [ 60.0, 280.0, 45.0, 23.0 ],
                                                    "rnbo_classname": "*~",
                                                    "rnbo_serial": 2,
                                                    "rnbo_uniqueid": "*~_obj-8",
                                                    "text": "*~ 100"
                                                }
                                            },
                                            {
                                                "box": {
                                                    "id": "obj-18",
                                                    "maxclass": "newobj",
                                                    "numinlets": 2,
                                                    "numoutlets": 1,
                                                    "outlettype": [ "" ],
                                                    "patching_rect": [ 60.0, 180.0, 80.0, 23.0 ],
                                                    "rnbo_classname": "peakamp~",
                                                    "rnbo_serial": 2,
                                                    "rnbo_uniqueid": "peakamp~_obj-18",
                                                    "text": "peakamp~ 10"
                                                }
                                            },
                                            {
                                                "box": {
                                                    "id": "obj-23",
                                                    "maxclass": "newobj",
                                                    "numinlets": 0,
                                                    "numoutlets": 1,
                                                    "outlettype": [ "signal" ],
                                                    "patching_rect": [ 60.0, 50.0, 35.0, 23.0 ],
                                                    "rnbo_classname": "in~",
                                                    "rnbo_extra_attributes": {
                                                        "meta": "",
                                                        "comment": ""
                                                    },
                                                    "rnbo_serial": 2,
                                                    "rnbo_uniqueid": "in~_obj-23",
                                                    "rnboinfo": {
                                                        "needsInstanceInfo": 1,
                                                        "argnames": {
                                                            "out1": {
                                                                "attrOrProp": 1,
                                                                "digest": "signal from inlet with index 1",
                                                                "isalias": 0,
                                                                "aliases": [],
                                                                "settable": 0,
                                                                "attachable": 0,
                                                                "isparam": 0,
                                                                "deprecated": 0,
                                                                "touched": 0,
                                                                "outlet": 1,
                                                                "type": "signal"
                                                            },
                                                            "index": {
                                                                "attrOrProp": 2,
                                                                "digest": "inlet number",
                                                                "defaultarg": 1,
                                                                "isalias": 0,
                                                                "aliases": [],
                                                                "settable": 1,
                                                                "attachable": 0,
                                                                "isparam": 0,
                                                                "deprecated": 0,
                                                                "touched": 0,
                                                                "type": "number",
                                                                "mandatory": 1
                                                            },
                                                            "comment": {
                                                                "attrOrProp": 2,
                                                                "digest": "mouse over comment",
                                                                "isalias": 0,
                                                                "aliases": [],
                                                                "settable": 1,
                                                                "attachable": 0,
                                                                "isparam": 0,
                                                                "deprecated": 0,
                                                                "touched": 0,
                                                                "type": "symbol"
                                                            },
                                                            "meta": {
                                                                "attrOrProp": 2,
                                                                "digest": "A JSON formatted string containing metadata for use by the exported code",
                                                                "isalias": 0,
                                                                "aliases": [],
                                                                "settable": 1,
                                                                "attachable": 0,
                                                                "isparam": 0,
                                                                "deprecated": 0,
                                                                "touched": 0,
                                                                "type": "symbol",
                                                                "defaultValue": "",
                                                                "label": "Metadata",
                                                                "displayorder": 3
                                                            }
                                                        },
                                                        "inputs": [],
                                                        "outputs": [
                                                            {
                                                                "name": "out1",
                                                                "type": "signal",
                                                                "digest": "signal from inlet with index 1",
                                                                "displayName": "",
                                                                "docked": 0
                                                            }
                                                        ],
                                                        "helpname": "in~",
                                                        "aliasOf": "in~",
                                                        "classname": "in~",
                                                        "operator": 0,
                                                        "versionId": -1654556303,
                                                        "changesPatcherIO": 1
                                                    },
                                                    "text": "in~ 1"
                                                }
                                            },
                                            {
                                                "box": {
                                                    "background": 1,
                                                    "fontface": 0,
                                                    "id": "obj-38",
                                                    "maxclass": "comment",
                                                    "numinlets": 1,
                                                    "numoutlets": 0,
                                                    "patching_rect": [ 310.0, 330.0, 32.0, 21.0 ],
                                                    "text": "Map"
                                                }
                                            },
                                            {
                                                "box": {
                                                    "background": 1,
                                                    "fontface": 0,
                                                    "id": "obj-1",
                                                    "maxclass": "comment",
                                                    "numinlets": 1,
                                                    "numoutlets": 0,
                                                    "patching_rect": [ 450.0, 460.0, 32.0, 21.0 ],
                                                    "text": "Map"
                                                }
                                            },
                                            {
                                                "box": {
                                                    "background": 1,
                                                    "fontface": 0,
                                                    "id": "obj-34",
                                                    "linecount": 2,
                                                    "maxclass": "comment",
                                                    "numinlets": 1,
                                                    "numoutlets": 0,
                                                    "patching_rect": [ 83.0, 534.0, 120.0, 35.0 ],
                                                    "text": "Report elapsed time between two events"
                                                }
                                            },
                                            {
                                                "box": {
                                                    "background": 1,
                                                    "fontface": 0,
                                                    "id": "obj-11",
                                                    "maxclass": "comment",
                                                    "numinlets": 1,
                                                    "numoutlets": 0,
                                                    "patching_rect": [ 430.0, 170.0, 40.0, 21.0 ],
                                                    "text": "Sense"
                                                }
                                            },
                                            {
                                                "box": {
                                                    "background": 1,
                                                    "fontface": 0,
                                                    "id": "obj-37",
                                                    "linecount": 2,
                                                    "maxclass": "comment",
                                                    "numinlets": 1,
                                                    "numoutlets": 0,
                                                    "patching_rect": [ 73.0, 415.0, 130.0, 35.0 ],
                                                    "text": "Detect a signal above and below a set level "
                                                }
                                            },
                                            {
                                                "box": {
                                                    "background": 1,
                                                    "id": "obj-77",
                                                    "linecount": 2,
                                                    "maxclass": "comment",
                                                    "numinlets": 1,
                                                    "numoutlets": 0,
                                                    "patching_rect": [ 425.0, 650.0, 105.0, 35.0 ],
                                                    "text": "Forward to rnbo~ messages outlet"
                                                }
                                            },
                                            {
                                                "box": {
                                                    "background": 1,
                                                    "fontface": 0,
                                                    "id": "obj-33",
                                                    "maxclass": "comment",
                                                    "numinlets": 1,
                                                    "numoutlets": 0,
                                                    "patching_rect": [ 195.0, 210.0, 108.0, 21.0 ],
                                                    "text": "Smoothen changes"
                                                }
                                            },
                                            {
                                                "box": {
                                                    "background": 1,
                                                    "fontface": 0,
                                                    "id": "obj-32",
                                                    "linecount": 2,
                                                    "maxclass": "comment",
                                                    "numinlets": 1,
                                                    "numoutlets": 0,
                                                    "patching_rect": [ 145.0, 170.0, 150.0, 35.0 ],
                                                    "text": "Maximum amplitude over a period of time in ms"
                                                }
                                            },
                                            {
                                                "box": {
                                                    "background": 1,
                                                    "fontface": 0,
                                                    "id": "obj-31",
                                                    "maxclass": "comment",
                                                    "numinlets": 1,
                                                    "numoutlets": 0,
                                                    "patching_rect": [ 95.0, 90.0, 28.0, 21.0 ],
                                                    "text": "Mix",
                                                    "textjustification": 1
                                                }
                                            },
                                            {
                                                "box": {
                                                    "background": 1,
                                                    "fontface": 0,
                                                    "id": "obj-20",
                                                    "maxclass": "comment",
                                                    "numinlets": 1,
                                                    "numoutlets": 0,
                                                    "patching_rect": [ 390.0, 570.5, 28.0, 21.0 ],
                                                    "text": "0/1"
                                                }
                                            },
                                            {
                                                "box": {
                                                    "background": 1,
                                                    "fontface": 0,
                                                    "id": "obj-17",
                                                    "maxclass": "comment",
                                                    "numinlets": 1,
                                                    "numoutlets": 0,
                                                    "patching_rect": [ 390.0, 630.5, 43.0, 21.0 ],
                                                    "text": "Attack"
                                                }
                                            },
                                            {
                                                "box": {
                                                    "background": 1,
                                                    "fontface": 0,
                                                    "id": "obj-3",
                                                    "maxclass": "comment",
                                                    "numinlets": 1,
                                                    "numoutlets": 0,
                                                    "patching_rect": [ 60.0, 27.0, 75.0, 21.0 ],
                                                    "text": "Audio in L/R",
                                                    "textjustification": 1
                                                }
                                            },
                                            {
                                                "box": {
                                                    "background": 1,
                                                    "fontface": 0,
                                                    "id": "obj-82",
                                                    "maxclass": "comment",
                                                    "numinlets": 1,
                                                    "numoutlets": 0,
                                                    "patching_rect": [ 30.0, 490.0, 25.0, 21.0 ],
                                                    "text": "Att"
                                                }
                                            },
                                            {
                                                "box": {
                                                    "background": 1,
                                                    "fontface": 0,
                                                    "id": "obj-81",
                                                    "maxclass": "comment",
                                                    "numinlets": 1,
                                                    "numoutlets": 0,
                                                    "patching_rect": [ 120.0, 490.0, 25.0, 21.0 ],
                                                    "text": "Rel"
                                                }
                                            },
                                            {
                                                "box": {
                                                    "background": 1,
                                                    "id": "obj-76",
                                                    "maxclass": "comment",
                                                    "numinlets": 1,
                                                    "numoutlets": 0,
                                                    "patching_rect": [ 94.0, 580.0, 24.0, 21.0 ],
                                                    "text": "ms"
                                                }
                                            },
                                            {
                                                "box": {
                                                    "background": 1,
                                                    "fontface": 0,
                                                    "id": "obj-72",
                                                    "linecount": 3,
                                                    "maxclass": "comment",
                                                    "numinlets": 1,
                                                    "numoutlets": 0,
                                                    "patching_rect": [ 260.0, 410.0, 100.0, 50.0 ],
                                                    "text": "Slope range for low and high level thresholds"
                                                }
                                            },
                                            {
                                                "box": {
                                                    "background": 1,
                                                    "fontface": 0,
                                                    "id": "obj-66",
                                                    "maxclass": "comment",
                                                    "numinlets": 1,
                                                    "numoutlets": 0,
                                                    "patching_rect": [ 215.0, 130.0, 45.0, 21.0 ],
                                                    "text": "On/off"
                                                }
                                            },
                                            {
                                                "box": {
                                                    "background": 1,
                                                    "fontface": 0,
                                                    "id": "obj-65",
                                                    "maxclass": "comment",
                                                    "numinlets": 1,
                                                    "numoutlets": 0,
                                                    "patching_rect": [ 450.0, 510.0, 24.0, 21.0 ],
                                                    "text": "ms"
                                                }
                                            },
                                            {
                                                "box": {
                                                    "background": 1,
                                                    "fontface": 0,
                                                    "id": "obj-62",
                                                    "maxclass": "comment",
                                                    "numinlets": 1,
                                                    "numoutlets": 0,
                                                    "patching_rect": [ 450.0, 210.0, 20.0, 21.0 ],
                                                    "text": "%"
                                                }
                                            },
                                            {
                                                "box": {
                                                    "background": 1,
                                                    "fontface": 0,
                                                    "id": "obj-13",
                                                    "linecount": 3,
                                                    "maxclass": "comment",
                                                    "numinlets": 1,
                                                    "numoutlets": 0,
                                                    "patching_rect": [ 430.0, 540.0, 130.0, 50.0 ],
                                                    "text": "Time threshold below which detected attack will be filtered out"
                                                }
                                            },
                                            {
                                                "box": {
                                                    "background": 1,
                                                    "fontface": 1,
                                                    "fontsize": 14.0,
                                                    "id": "obj-19",
                                                    "maxclass": "comment",
                                                    "numinlets": 1,
                                                    "numoutlets": 0,
                                                    "patching_rect": [ 290.0, 40.0, 112.0, 23.0 ],
                                                    "text": "Attack detection"
                                                }
                                            },
                                            {
                                                "box": {
                                                    "background": 1,
                                                    "fontface": 0,
                                                    "id": "obj-7",
                                                    "linecount": 2,
                                                    "maxclass": "comment",
                                                    "numinlets": 1,
                                                    "numoutlets": 0,
                                                    "patching_rect": [ 290.0, 60.0, 270.0, 35.0 ],
                                                    "text": "Relative-attack detection mechanism, derived from work from and with composer Jesper Nordin"
                                                }
                                            },
                                            {
                                                "box": {
                                                    "background": 1,
                                                    "id": "obj-36",
                                                    "linecount": 2,
                                                    "maxclass": "comment",
                                                    "numinlets": 1,
                                                    "numoutlets": 0,
                                                    "patching_rect": [ 160.0, 240.0, 180.0, 35.0 ],
                                                    "text": "Absolute signal average over an interval specified in samples"
                                                }
                                            }
                                        ],
                                        "lines": [
                                            {
                                                "patchline": {
                                                    "destination": [ "obj-18", 0 ],
                                                    "source": [ "obj-10", 0 ]
                                                }
                                            },
                                            {
                                                "patchline": {
                                                    "destination": [ "obj-2", 0 ],
                                                    "order": 1,
                                                    "source": [ "obj-12", 0 ]
                                                }
                                            },
                                            {
                                                "patchline": {
                                                    "destination": [ "obj-6", 2 ],
                                                    "order": 0,
                                                    "source": [ "obj-12", 0 ]
                                                }
                                            },
                                            {
                                                "patchline": {
                                                    "destination": [ "obj-78", 0 ],
                                                    "source": [ "obj-14", 0 ]
                                                }
                                            },
                                            {
                                                "patchline": {
                                                    "destination": [ "obj-80", 0 ],
                                                    "source": [ "obj-14", 1 ]
                                                }
                                            },
                                            {
                                                "patchline": {
                                                    "destination": [ "obj-74", 0 ],
                                                    "source": [ "obj-15", 0 ]
                                                }
                                            },
                                            {
                                                "patchline": {
                                                    "destination": [ "obj-27", 0 ],
                                                    "source": [ "obj-16", 0 ]
                                                }
                                            },
                                            {
                                                "patchline": {
                                                    "destination": [ "obj-21", 0 ],
                                                    "source": [ "obj-18", 0 ]
                                                }
                                            },
                                            {
                                                "patchline": {
                                                    "destination": [ "obj-6", 1 ],
                                                    "source": [ "obj-2", 0 ]
                                                }
                                            },
                                            {
                                                "patchline": {
                                                    "destination": [ "obj-8", 0 ],
                                                    "source": [ "obj-21", 0 ]
                                                }
                                            },
                                            {
                                                "patchline": {
                                                    "destination": [ "obj-61", 0 ],
                                                    "source": [ "obj-22", 0 ]
                                                }
                                            },
                                            {
                                                "patchline": {
                                                    "destination": [ "obj-30", 0 ],
                                                    "source": [ "obj-23", 0 ]
                                                }
                                            },
                                            {
                                                "patchline": {
                                                    "destination": [ "obj-30", 1 ],
                                                    "source": [ "obj-24", 0 ]
                                                }
                                            },
                                            {
                                                "patchline": {
                                                    "destination": [ "obj-16", 0 ],
                                                    "source": [ "obj-26", 0 ]
                                                }
                                            },
                                            {
                                                "patchline": {
                                                    "destination": [ "obj-53", 0 ],
                                                    "source": [ "obj-27", 0 ]
                                                }
                                            },
                                            {
                                                "patchline": {
                                                    "destination": [ "obj-29", 0 ],
                                                    "source": [ "obj-28", 0 ]
                                                }
                                            },
                                            {
                                                "patchline": {
                                                    "destination": [ "obj-12", 1 ],
                                                    "source": [ "obj-29", 0 ]
                                                }
                                            },
                                            {
                                                "patchline": {
                                                    "destination": [ "obj-10", 0 ],
                                                    "source": [ "obj-30", 0 ]
                                                }
                                            },
                                            {
                                                "patchline": {
                                                    "destination": [ "obj-12", 0 ],
                                                    "source": [ "obj-4", 0 ]
                                                }
                                            },
                                            {
                                                "patchline": {
                                                    "destination": [ "obj-4", 0 ],
                                                    "source": [ "obj-5", 0 ]
                                                }
                                            },
                                            {
                                                "patchline": {
                                                    "destination": [ "obj-25", 0 ],
                                                    "order": 0,
                                                    "source": [ "obj-53", 0 ]
                                                }
                                            },
                                            {
                                                "patchline": {
                                                    "destination": [ "obj-35", 0 ],
                                                    "order": 1,
                                                    "source": [ "obj-53", 0 ]
                                                }
                                            },
                                            {
                                                "patchline": {
                                                    "destination": [ "obj-58", 0 ],
                                                    "source": [ "obj-56", 0 ]
                                                }
                                            },
                                            {
                                                "patchline": {
                                                    "destination": [ "obj-26", 1 ],
                                                    "source": [ "obj-58", 0 ]
                                                }
                                            },
                                            {
                                                "patchline": {
                                                    "destination": [ "obj-64", 0 ],
                                                    "source": [ "obj-59", 0 ]
                                                }
                                            },
                                            {
                                                "patchline": {
                                                    "destination": [ "obj-14", 0 ],
                                                    "source": [ "obj-6", 0 ]
                                                }
                                            },
                                            {
                                                "patchline": {
                                                    "destination": [ "obj-28", 0 ],
                                                    "order": 1,
                                                    "source": [ "obj-61", 0 ]
                                                }
                                            },
                                            {
                                                "patchline": {
                                                    "destination": [ "obj-56", 0 ],
                                                    "order": 0,
                                                    "source": [ "obj-61", 0 ]
                                                }
                                            },
                                            {
                                                "patchline": {
                                                    "destination": [ "obj-59", 0 ],
                                                    "order": 2,
                                                    "source": [ "obj-61", 0 ]
                                                }
                                            },
                                            {
                                                "patchline": {
                                                    "destination": [ "obj-10", 1 ],
                                                    "source": [ "obj-64", 0 ]
                                                }
                                            },
                                            {
                                                "patchline": {
                                                    "destination": [ "obj-26", 0 ],
                                                    "source": [ "obj-74", 0 ]
                                                }
                                            },
                                            {
                                                "patchline": {
                                                    "destination": [ "obj-15", 1 ],
                                                    "source": [ "obj-78", 0 ]
                                                }
                                            },
                                            {
                                                "patchline": {
                                                    "destination": [ "obj-5", 0 ],
                                                    "order": 0,
                                                    "source": [ "obj-8", 0 ]
                                                }
                                            },
                                            {
                                                "patchline": {
                                                    "destination": [ "obj-6", 0 ],
                                                    "order": 1,
                                                    "source": [ "obj-8", 0 ]
                                                }
                                            },
                                            {
                                                "patchline": {
                                                    "destination": [ "obj-15", 0 ],
                                                    "source": [ "obj-80", 0 ]
                                                }
                                            }
                                        ]
                                    },
                                    "patching_rect": [ 320.0, 150.0, 119.0, 37.0 ],
                                    "rnbo_classname": "p",
                                    "rnbo_extra_attributes": {
                                        "voicecontrol": "midi",
                                        "notecontroller": 0,
                                        "args": [],
                                        "exposevoiceparams": 0,
                                        "receivemode": "local",
                                        "polyphony": -1.0,
                                        "uidstyle": "auto"
                                    },
                                    "rnbo_serial": 3,
                                    "rnbo_uniqueid": "AttackDetection~",
                                    "rnboinfo": {
                                        "needsInstanceInfo": 1,
                                        "argnames": {
                                            "target": {
                                                "attrOrProp": 1,
                                                "digest": "target",
                                                "isalias": 0,
                                                "aliases": [],
                                                "settable": 0,
                                                "attachable": 1,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "type": "number",
                                                "defaultValue": "0"
                                            },
                                            "mute": {
                                                "attrOrProp": 1,
                                                "digest": "mute",
                                                "isalias": 0,
                                                "aliases": [],
                                                "attachable": 1,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "type": "number"
                                            },
                                            "in1": {
                                                "attrOrProp": 1,
                                                "digest": "in1",
                                                "isalias": 0,
                                                "aliases": [],
                                                "attachable": 0,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "inlet": 1,
                                                "type": "signal"
                                            },
                                            "in2": {
                                                "attrOrProp": 1,
                                                "digest": "in2",
                                                "isalias": 0,
                                                "aliases": [],
                                                "attachable": 0,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "inlet": 1,
                                                "type": "signal"
                                            },
                                            "__probingout1": {
                                                "attrOrProp": 1,
                                                "digest": "__probingout1",
                                                "isalias": 0,
                                                "aliases": [],
                                                "attachable": 0,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "type": "signal"
                                            },
                                            "polyphony": {
                                                "attrOrProp": 2,
                                                "digest": "Polyphony of the subpatcher.",
                                                "isalias": 0,
                                                "aliases": [],
                                                "settable": 1,
                                                "attachable": 0,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "type": "number",
                                                "defaultValue": "-1"
                                            },
                                            "exposevoiceparams": {
                                                "attrOrProp": 2,
                                                "digest": "Expose per voice versions of the contained parameters (only valid in polyphonic subpatchers).",
                                                "isalias": 0,
                                                "aliases": [],
                                                "settable": 1,
                                                "attachable": 0,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "type": "bool",
                                                "defaultValue": "false"
                                            },
                                            "title": {
                                                "attrOrProp": 2,
                                                "digest": "Title of the subpatcher",
                                                "defaultarg": 1,
                                                "isalias": 0,
                                                "aliases": [],
                                                "settable": 1,
                                                "attachable": 0,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "type": "symbol",
                                                "doNotShowInMaxInspector": 1
                                            },
                                            "file": {
                                                "attrOrProp": 2,
                                                "digest": "rnbo file to load",
                                                "isalias": 0,
                                                "aliases": [],
                                                "settable": 1,
                                                "attachable": 0,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "type": "symbol",
                                                "doNotShowInMaxInspector": 1
                                            },
                                            "voicecontrol": {
                                                "attrOrProp": 2,
                                                "digest": "Chooses the way that polyphonic voices are controlled. 'simple' (or 'midi') will automatically allocate voices for \tincoming MIDI notes. Setting it to 'user' (or 'none') will switch off MIDI \tvoice allocation and start with all voices unmuted.",
                                                "isalias": 0,
                                                "aliases": [],
                                                "settable": 1,
                                                "attachable": 0,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "enum": [ "simple", "user" ],
                                                "type": "enum",
                                                "defaultValue": "simple"
                                            },
                                            "notecontroller": {
                                                "attrOrProp": 2,
                                                "digest": "DEPRECATED. Use voicecontrol instead.",
                                                "isalias": 0,
                                                "aliases": [],
                                                "settable": 1,
                                                "attachable": 0,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "type": "symbol",
                                                "doNotShowInMaxInspector": 1
                                            },
                                            "receivemode": {
                                                "attrOrProp": 2,
                                                "digest": "Do receive~ objects get the signal from a send~ inside the patcher directly (without latency), or compensated (with latency, aligned with all other voices).",
                                                "isalias": 0,
                                                "aliases": [],
                                                "settable": 1,
                                                "attachable": 0,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "enum": [ "local", "compensated" ],
                                                "type": "enum",
                                                "defaultValue": "local"
                                            },
                                            "args": {
                                                "attrOrProp": 2,
                                                "digest": "Replacement args for the subpatcher, everything named #1, #2 etc. will be replaced with the according argument.",
                                                "isalias": 0,
                                                "aliases": [],
                                                "settable": 1,
                                                "attachable": 0,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "type": "symbol",
                                                "doNotShowInMaxInspector": 1
                                            },
                                            "uidstyle": {
                                                "attrOrProp": 2,
                                                "digest": "Behavior of #0 unique ID. auto (default) means abstractions get a local UID, local: start a new local UID, parent: use the one from the parent patcher",
                                                "isalias": 0,
                                                "aliases": [],
                                                "settable": 1,
                                                "attachable": 0,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "enum": [ "auto", "local", "parent", "global" ],
                                                "type": "enum",
                                                "defaultValue": "auto"
                                            }
                                        },
                                        "inputs": [
                                            {
                                                "name": "in1",
                                                "type": "signal",
                                                "digest": "in1",
                                                "displayName": "",
                                                "hot": 1,
                                                "docked": 0
                                            },
                                            {
                                                "name": "in2",
                                                "type": "signal",
                                                "digest": "in2",
                                                "displayName": "",
                                                "hot": 1,
                                                "docked": 0
                                            },
                                            {
                                                "name": "in3",
                                                "type": [ "bang", "number", "list" ],
                                                "digest": "in3",
                                                "displayName": "",
                                                "hot": 1,
                                                "docked": 0
                                            }
                                        ],
                                        "outputs": [
                                            {
                                                "name": "out1",
                                                "type": [ "bang", "number", "list" ],
                                                "digest": "out1",
                                                "displayName": "",
                                                "docked": 0
                                            }
                                        ],
                                        "helpname": "patcher",
                                        "aliasOf": "rnbo",
                                        "classname": "p",
                                        "operator": 0,
                                        "versionId": 426236520,
                                        "changesPatcherIO": 0
                                    },
                                    "saved_attribute_attributes": {
                                        "color": {
                                            "expression": "themecolor.theme_color"
                                        }
                                    },
                                    "saved_newobj_attribute_attributes": {
                                        "color": {
                                            "expression": "themecolor.theme_color"
                                        }
                                    },
                                    "text": "p @title AttackDetection~",
                                    "varname": "AttackDetection~"
                                }
                            },
                            {
                                "box": {
                                    "id": "obj-44",
                                    "maxclass": "newobj",
                                    "numinlets": 2,
                                    "numoutlets": 1,
                                    "outlettype": [ "signal" ],
                                    "patching_rect": [ 170.0, 300.0, 29.5, 23.0 ],
                                    "rnbo_classname": "*~",
                                    "rnbo_serial": 1,
                                    "rnbo_uniqueid": "*~_obj-44",
                                    "text": "*~"
                                }
                            },
                            {
                                "box": {
                                    "id": "obj-42",
                                    "maxclass": "newobj",
                                    "numinlets": 2,
                                    "numoutlets": 1,
                                    "outlettype": [ "signal" ],
                                    "patching_rect": [ 70.0, 300.0, 29.5, 23.0 ],
                                    "rnbo_classname": "*~",
                                    "rnbo_serial": 2,
                                    "rnbo_uniqueid": "*~_obj-42",
                                    "text": "*~"
                                }
                            },
                            {
                                "box": {
                                    "fontface": 1,
                                    "id": "obj-29",
                                    "maxclass": "flonum",
                                    "maximum": 100.0,
                                    "minimum": 0.0,
                                    "numinlets": 1,
                                    "numoutlets": 2,
                                    "outlettype": [ "", "bang" ],
                                    "parameter_enable": 0,
                                    "patching_rect": [ 170.0, 220.0, 50.0, 23.0 ],
                                    "rnbo_classname": "number",
                                    "rnbo_extra_attributes": {
                                        "maximum": 100.0,
                                        "initialFormat": "float",
                                        "minimum": 0.0,
                                        "order": "",
                                        "preset": 0
                                    },
                                    "rnbo_serial": 4,
                                    "rnbo_uniqueid": "number_obj-29",
                                    "saved_attribute_attributes": {
                                        "textcolor": {
                                            "expression": "themecolor.theme_selectioncolor"
                                        }
                                    },
                                    "textcolor": [ 0.922234290352602, 0.71007200526417, 0.329758341965716, 1.0 ]
                                }
                            },
                            {
                                "box": {
                                    "id": "obj-15",
                                    "maxclass": "newobj",
                                    "numinlets": 1,
                                    "numoutlets": 0,
                                    "patching_rect": [ 320.0, 380.0, 43.0, 23.0 ],
                                    "rnbo_classname": "out~",
                                    "rnbo_extra_attributes": {
                                        "meta": "",
                                        "comment": ""
                                    },
                                    "rnbo_serial": 1,
                                    "rnbo_uniqueid": "out~_obj-15",
                                    "rnboinfo": {
                                        "needsInstanceInfo": 1,
                                        "argnames": {
                                            "in1": {
                                                "attrOrProp": 1,
                                                "digest": "signal sent to outlet with index 3",
                                                "isalias": 0,
                                                "aliases": [],
                                                "settable": 0,
                                                "attachable": 0,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "inlet": 1,
                                                "type": "signal"
                                            },
                                            "index": {
                                                "attrOrProp": 2,
                                                "digest": "outlet number",
                                                "defaultarg": 1,
                                                "isalias": 0,
                                                "aliases": [],
                                                "settable": 1,
                                                "attachable": 0,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "type": "number",
                                                "mandatory": 1
                                            },
                                            "comment": {
                                                "attrOrProp": 2,
                                                "digest": "mouse over comment",
                                                "isalias": 0,
                                                "aliases": [],
                                                "settable": 1,
                                                "attachable": 0,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "type": "symbol"
                                            },
                                            "meta": {
                                                "attrOrProp": 2,
                                                "digest": "A JSON formatted string containing metadata for use by the exported code",
                                                "isalias": 0,
                                                "aliases": [],
                                                "settable": 1,
                                                "attachable": 0,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "type": "symbol",
                                                "defaultValue": "",
                                                "label": "Metadata",
                                                "displayorder": 3
                                            }
                                        },
                                        "inputs": [
                                            {
                                                "name": "in1",
                                                "type": "signal",
                                                "digest": "signal sent to outlet with index 3",
                                                "displayName": "",
                                                "hot": 1,
                                                "docked": 0
                                            }
                                        ],
                                        "outputs": [],
                                        "helpname": "out~",
                                        "aliasOf": "out~",
                                        "classname": "out~",
                                        "operator": 0,
                                        "versionId": 1989326771,
                                        "changesPatcherIO": 1
                                    },
                                    "text": "out~ 3"
                                }
                            },
                            {
                                "box": {
                                    "id": "obj-4",
                                    "maxclass": "newobj",
                                    "numinlets": 1,
                                    "numoutlets": 0,
                                    "patching_rect": [ 170.0, 380.0, 43.0, 23.0 ],
                                    "rnbo_classname": "out~",
                                    "rnbo_extra_attributes": {
                                        "meta": "",
                                        "comment": ""
                                    },
                                    "rnbo_serial": 2,
                                    "rnbo_uniqueid": "out~_obj-4",
                                    "rnboinfo": {
                                        "needsInstanceInfo": 1,
                                        "argnames": {
                                            "in1": {
                                                "attrOrProp": 1,
                                                "digest": "signal sent to outlet with index 2",
                                                "isalias": 0,
                                                "aliases": [],
                                                "settable": 0,
                                                "attachable": 0,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "inlet": 1,
                                                "type": "signal"
                                            },
                                            "index": {
                                                "attrOrProp": 2,
                                                "digest": "outlet number",
                                                "defaultarg": 1,
                                                "isalias": 0,
                                                "aliases": [],
                                                "settable": 1,
                                                "attachable": 0,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "type": "number",
                                                "mandatory": 1
                                            },
                                            "comment": {
                                                "attrOrProp": 2,
                                                "digest": "mouse over comment",
                                                "isalias": 0,
                                                "aliases": [],
                                                "settable": 1,
                                                "attachable": 0,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "type": "symbol"
                                            },
                                            "meta": {
                                                "attrOrProp": 2,
                                                "digest": "A JSON formatted string containing metadata for use by the exported code",
                                                "isalias": 0,
                                                "aliases": [],
                                                "settable": 1,
                                                "attachable": 0,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "type": "symbol",
                                                "defaultValue": "",
                                                "label": "Metadata",
                                                "displayorder": 3
                                            }
                                        },
                                        "inputs": [
                                            {
                                                "name": "in1",
                                                "type": "signal",
                                                "digest": "signal sent to outlet with index 2",
                                                "displayName": "",
                                                "hot": 1,
                                                "docked": 0
                                            }
                                        ],
                                        "outputs": [],
                                        "helpname": "out~",
                                        "aliasOf": "out~",
                                        "classname": "out~",
                                        "operator": 0,
                                        "versionId": 1989326771,
                                        "changesPatcherIO": 1
                                    },
                                    "text": "out~ 2"
                                }
                            },
                            {
                                "box": {
                                    "id": "obj-3",
                                    "maxclass": "newobj",
                                    "numinlets": 1,
                                    "numoutlets": 0,
                                    "patching_rect": [ 70.0, 380.0, 43.0, 23.0 ],
                                    "rnbo_classname": "out~",
                                    "rnbo_extra_attributes": {
                                        "meta": "",
                                        "comment": ""
                                    },
                                    "rnbo_serial": 3,
                                    "rnbo_uniqueid": "out~_obj-3",
                                    "rnboinfo": {
                                        "needsInstanceInfo": 1,
                                        "argnames": {
                                            "in1": {
                                                "attrOrProp": 1,
                                                "digest": "signal sent to outlet with index 1",
                                                "isalias": 0,
                                                "aliases": [],
                                                "settable": 0,
                                                "attachable": 0,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "inlet": 1,
                                                "type": "signal"
                                            },
                                            "index": {
                                                "attrOrProp": 2,
                                                "digest": "outlet number",
                                                "defaultarg": 1,
                                                "isalias": 0,
                                                "aliases": [],
                                                "settable": 1,
                                                "attachable": 0,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "type": "number",
                                                "mandatory": 1
                                            },
                                            "comment": {
                                                "attrOrProp": 2,
                                                "digest": "mouse over comment",
                                                "isalias": 0,
                                                "aliases": [],
                                                "settable": 1,
                                                "attachable": 0,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "type": "symbol"
                                            },
                                            "meta": {
                                                "attrOrProp": 2,
                                                "digest": "A JSON formatted string containing metadata for use by the exported code",
                                                "isalias": 0,
                                                "aliases": [],
                                                "settable": 1,
                                                "attachable": 0,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "type": "symbol",
                                                "defaultValue": "",
                                                "label": "Metadata",
                                                "displayorder": 3
                                            }
                                        },
                                        "inputs": [
                                            {
                                                "name": "in1",
                                                "type": "signal",
                                                "digest": "signal sent to outlet with index 1",
                                                "displayName": "",
                                                "hot": 1,
                                                "docked": 0
                                            }
                                        ],
                                        "outputs": [],
                                        "helpname": "out~",
                                        "aliasOf": "out~",
                                        "classname": "out~",
                                        "operator": 0,
                                        "versionId": 1989326771,
                                        "changesPatcherIO": 1
                                    },
                                    "text": "out~ 1"
                                }
                            },
                            {
                                "box": {
                                    "background": 1,
                                    "bgcolor": [ 0.125, 0.125, 0.125, 1.0 ],
                                    "fontface": 1,
                                    "fontsize": 10.0,
                                    "hint": "To see the properties of a parameter, unlock the patcher, select a param object and click the Inspector button in the patcher toolbar ",
                                    "id": "obj-25",
                                    "maxclass": "comment",
                                    "numinlets": 1,
                                    "numoutlets": 0,
                                    "patching_rect": [ 680.0, 380.0, 45.0, 18.0 ],
                                    "saved_attribute_attributes": {
                                        "bgcolor": {
                                            "expression": "themecolor.theme_bgcolor"
                                        },
                                        "textcolor": {
                                            "expression": "themecolor.theme_textcolor_inverse"
                                        }
                                    },
                                    "text": "Params",
                                    "textcolor": [ 0.9, 0.9, 0.9, 1.0 ]
                                }
                            },
                            {
                                "box": {
                                    "background": 1,
                                    "fontface": 1,
                                    "fontsize": 10.0,
                                    "id": "obj-116",
                                    "maxclass": "comment",
                                    "numinlets": 1,
                                    "numoutlets": 0,
                                    "patching_rect": [ 580.0, 380.0, 29.0, 18.0 ],
                                    "text": "Tips"
                                }
                            },
                            {
                                "box": {
                                    "background": 1,
                                    "bgcolor": [ 0.125, 0.125, 0.125, 1.0 ],
                                    "fontface": 1,
                                    "fontsize": 10.0,
                                    "hint": "To copy some elements of the patch without including comments, unlock the patcher window and hit cmd-alt-L (Mac) / ctrl-opt-L (PC) to lock the patcher's background, then make your selection.",
                                    "id": "obj-22",
                                    "maxclass": "comment",
                                    "numinlets": 1,
                                    "numoutlets": 0,
                                    "patching_rect": [ 644.0, 380.0, 33.0, 18.0 ],
                                    "saved_attribute_attributes": {
                                        "bgcolor": {
                                            "expression": "themecolor.theme_bgcolor"
                                        },
                                        "textcolor": {
                                            "expression": "themecolor.theme_textcolor_inverse"
                                        }
                                    },
                                    "text": "Copy",
                                    "textcolor": [ 0.9, 0.9, 0.9, 1.0 ]
                                }
                            },
                            {
                                "box": {
                                    "background": 1,
                                    "bgcolor": [ 0.125, 0.125, 0.125, 1.0 ],
                                    "fontface": 1,
                                    "fontsize": 10.0,
                                    "hint": "Alt-click (Mac) / opt-click (PC) on an object box while the patcher is unlocked to view an object's help file.",
                                    "id": "obj-35",
                                    "maxclass": "comment",
                                    "numinlets": 1,
                                    "numoutlets": 0,
                                    "patching_rect": [ 610.0, 380.0, 30.0, 18.0 ],
                                    "saved_attribute_attributes": {
                                        "bgcolor": {
                                            "expression": "themecolor.theme_bgcolor"
                                        },
                                        "textcolor": {
                                            "expression": "themecolor.theme_textcolor_inverse"
                                        }
                                    },
                                    "text": "Help",
                                    "textcolor": [ 0.9, 0.9, 0.9, 1.0 ]
                                }
                            },
                            {
                                "box": {
                                    "background": 1,
                                    "fontface": 0,
                                    "fontname": "Lato",
                                    "fontsize": 10.0,
                                    "id": "obj-97",
                                    "maxclass": "comment",
                                    "numinlets": 1,
                                    "numoutlets": 0,
                                    "patching_rect": [ 610.0, 400.0, 111.0, 18.0 ],
                                    "text": "manuel@cycling74.com"
                                }
                            },
                            {
                                "box": {
                                    "background": 1,
                                    "id": "obj-33",
                                    "linecount": 2,
                                    "maxclass": "comment",
                                    "numinlets": 1,
                                    "numoutlets": 0,
                                    "patching_rect": [ 476.0, 233.0, 64.0, 35.0 ],
                                    "text": "Sets the fade slope"
                                }
                            },
                            {
                                "box": {
                                    "background": 1,
                                    "id": "obj-32",
                                    "maxclass": "comment",
                                    "numinlets": 1,
                                    "numoutlets": 0,
                                    "patching_rect": [ 354.0, 197.0, 104.0, 21.0 ],
                                    "text": "Sets the fade time"
                                }
                            },
                            {
                                "box": {
                                    "background": 1,
                                    "id": "obj-31",
                                    "linecount": 2,
                                    "maxclass": "comment",
                                    "numinlets": 1,
                                    "numoutlets": 0,
                                    "patching_rect": [ 414.0, 53.0, 124.0, 35.0 ],
                                    "text": "Sets the sensitivity of the attack detector "
                                }
                            },
                            {
                                "box": {
                                    "background": 1,
                                    "id": "obj-28",
                                    "linecount": 3,
                                    "maxclass": "comment",
                                    "numinlets": 1,
                                    "numoutlets": 0,
                                    "patching_rect": [ 170.0, 138.0, 104.0, 50.0 ],
                                    "text": "Sets the amount of delay applied to the input signal"
                                }
                            },
                            {
                                "box": {
                                    "background": 1,
                                    "fontface": 0,
                                    "id": "obj-21",
                                    "linecount": 6,
                                    "maxclass": "comment",
                                    "numinlets": 1,
                                    "numoutlets": 0,
                                    "patching_rect": [ 610.0, 270.0, 181.0, 93.0 ],
                                    "text": "Then the attack bang triggers a pre-defined volume envelope, with adjustable fading time and slope, for some smoother rendering. This is handled by the VolumeRamp~ subpatcher."
                                }
                            },
                            {
                                "box": {
                                    "background": 1,
                                    "fontface": 0,
                                    "id": "obj-20",
                                    "linecount": 9,
                                    "maxclass": "comment",
                                    "numinlets": 1,
                                    "numoutlets": 0,
                                    "patching_rect": [ 610.0, 128.0, 200.0, 136.0 ],
                                    "text": "In parallel, a copy of the incoming signals - or \"sidechain\" - is analyzed, in order to detect abrupt changes - or attacks - in the signal, and to  produce a bang each time a new attack has been detected. This is handled by the AttackDetection~ subpatcher. The Sense parameter sets the sensitivity of the detector."
                                }
                            },
                            {
                                "box": {
                                    "background": 1,
                                    "id": "obj-38",
                                    "maxclass": "comment",
                                    "numinlets": 1,
                                    "numoutlets": 0,
                                    "patching_rect": [ 350.0, 250.0, 20.0, 21.0 ],
                                    "text": "%",
                                    "textjustification": 2
                                }
                            },
                            {
                                "box": {
                                    "background": 1,
                                    "id": "obj-37",
                                    "maxclass": "comment",
                                    "numinlets": 1,
                                    "numoutlets": 0,
                                    "patching_rect": [ 150.0, 220.0, 20.0, 21.0 ],
                                    "text": "%",
                                    "textjustification": 2
                                }
                            },
                            {
                                "box": {
                                    "background": 1,
                                    "id": "obj-36",
                                    "maxclass": "comment",
                                    "numinlets": 1,
                                    "numoutlets": 0,
                                    "patching_rect": [ 460.0, 300.0, 20.0, 21.0 ],
                                    "text": "%",
                                    "textjustification": 2
                                }
                            },
                            {
                                "box": {
                                    "background": 1,
                                    "id": "obj-18",
                                    "maxclass": "comment",
                                    "numinlets": 1,
                                    "numoutlets": 0,
                                    "patching_rect": [ 390.0, 360.0, 48.0, 21.0 ],
                                    "text": "Volume",
                                    "textjustification": 1
                                }
                            },
                            {
                                "box": {
                                    "background": 1,
                                    "fontface": 1,
                                    "fontsize": 18.0,
                                    "id": "obj-49",
                                    "maxclass": "comment",
                                    "numinlets": 1,
                                    "numoutlets": 0,
                                    "patching_rect": [ 70.0, 33.5, 146.0, 28.0 ],
                                    "text": "RNBO AutoSwell"
                                }
                            },
                            {
                                "box": {
                                    "background": 1,
                                    "fontsize": 8.0,
                                    "id": "obj-12",
                                    "maxclass": "comment",
                                    "numinlets": 1,
                                    "numoutlets": 0,
                                    "patching_rect": [ 441.0, 408.0, 19.0, 16.0 ],
                                    "text": "0."
                                }
                            },
                            {
                                "box": {
                                    "background": 1,
                                    "fontsize": 8.0,
                                    "id": "obj-13",
                                    "maxclass": "comment",
                                    "numinlets": 1,
                                    "numoutlets": 0,
                                    "patching_rect": [ 440.0, 376.0, 19.0, 16.0 ],
                                    "text": "1."
                                }
                            },
                            {
                                "box": {
                                    "background": 1,
                                    "fontface": 1,
                                    "id": "obj-30",
                                    "maxclass": "comment",
                                    "numinlets": 1,
                                    "numoutlets": 0,
                                    "patching_rect": [ 70.0, 60.0, 187.0, 21.0 ],
                                    "text": "Classic stereo auto-volume effect"
                                }
                            },
                            {
                                "box": {
                                    "background": 1,
                                    "id": "obj-26",
                                    "maxclass": "comment",
                                    "numinlets": 1,
                                    "numoutlets": 0,
                                    "patching_rect": [ 156.0, 405.0, 71.0, 21.0 ],
                                    "text": "Audio out R",
                                    "textjustification": 1
                                }
                            },
                            {
                                "box": {
                                    "background": 1,
                                    "bubble": 1,
                                    "bubblepoint": 0.25,
                                    "fontface": 0,
                                    "fontsize": 10.0,
                                    "id": "obj-9",
                                    "linecount": 2,
                                    "maxclass": "comment",
                                    "numinlets": 1,
                                    "numoutlets": 0,
                                    "patching_rect": [ 450.0, 155.0, 130.0, 34.0 ],
                                    "saved_attribute_attributes": {
                                        "bubble_bgcolor": {
                                            "expression": "themecolor.theme_locked_bgcolor"
                                        }
                                    },
                                    "text": "Double-click to see the embedded patches",
                                    "textjustification": 1
                                }
                            },
                            {
                                "box": {
                                    "background": 1,
                                    "id": "obj-7",
                                    "maxclass": "comment",
                                    "numinlets": 1,
                                    "numoutlets": 0,
                                    "patching_rect": [ 318.0, 405.0, 47.0, 21.0 ],
                                    "text": "Display",
                                    "textjustification": 1
                                }
                            },
                            {
                                "box": {
                                    "background": 1,
                                    "id": "obj-118",
                                    "maxclass": "comment",
                                    "numinlets": 1,
                                    "numoutlets": 0,
                                    "patching_rect": [ 315.0, 67.0, 97.0, 21.0 ],
                                    "text": "Sidechaining L/R",
                                    "textjustification": 1
                                }
                            },
                            {
                                "box": {
                                    "background": 1,
                                    "fontface": 1,
                                    "id": "obj-123",
                                    "maxclass": "comment",
                                    "numinlets": 1,
                                    "numoutlets": 0,
                                    "patching_rect": [ 422.0, 250.0, 35.0, 21.0 ],
                                    "text": "Time"
                                }
                            },
                            {
                                "box": {
                                    "background": 1,
                                    "id": "obj-108",
                                    "maxclass": "comment",
                                    "numinlets": 1,
                                    "numoutlets": 0,
                                    "patching_rect": [ 275.0, 250.0, 43.0, 21.0 ],
                                    "text": "Attack"
                                }
                            },
                            {
                                "box": {
                                    "background": 1,
                                    "id": "obj-111",
                                    "maxclass": "comment",
                                    "numinlets": 1,
                                    "numoutlets": 0,
                                    "patching_rect": [ 400.0, 120.0, 20.0, 21.0 ],
                                    "text": "%",
                                    "textjustification": 2
                                }
                            },
                            {
                                "box": {
                                    "background": 1,
                                    "fontface": 1,
                                    "id": "obj-112",
                                    "maxclass": "comment",
                                    "numinlets": 1,
                                    "numoutlets": 0,
                                    "patching_rect": [ 472.0, 120.0, 40.0, 21.0 ],
                                    "text": "Sense"
                                }
                            },
                            {
                                "box": {
                                    "background": 1,
                                    "id": "obj-51",
                                    "linecount": 2,
                                    "maxclass": "comment",
                                    "numinlets": 1,
                                    "numoutlets": 0,
                                    "patching_rect": [ 104.5, 294.0, 50.0, 35.0 ],
                                    "text": "Scale volume",
                                    "textjustification": 1
                                }
                            },
                            {
                                "box": {
                                    "background": 1,
                                    "id": "obj-14",
                                    "maxclass": "comment",
                                    "numinlets": 1,
                                    "numoutlets": 0,
                                    "patching_rect": [ 70.0, 167.0, 74.0, 21.0 ],
                                    "text": "Audio in L/R",
                                    "textjustification": 1
                                }
                            },
                            {
                                "box": {
                                    "background": 1,
                                    "fontface": 1,
                                    "id": "obj-34",
                                    "maxclass": "comment",
                                    "numinlets": 1,
                                    "numoutlets": 0,
                                    "patching_rect": [ 222.0, 220.0, 67.0, 21.0 ],
                                    "text": "Lookahead"
                                }
                            },
                            {
                                "box": {
                                    "background": 1,
                                    "fontface": 1,
                                    "id": "obj-11",
                                    "maxclass": "comment",
                                    "numinlets": 1,
                                    "numoutlets": 0,
                                    "patching_rect": [ 610.0, 40.0, 70.0, 21.0 ],
                                    "text": "Description"
                                }
                            },
                            {
                                "box": {
                                    "background": 1,
                                    "fontface": 1,
                                    "id": "obj-27",
                                    "maxclass": "comment",
                                    "numinlets": 1,
                                    "numoutlets": 0,
                                    "patching_rect": [ 532.0, 300.0, 38.0, 21.0 ],
                                    "text": "Slope"
                                }
                            },
                            {
                                "box": {
                                    "background": 1,
                                    "fontface": 0,
                                    "id": "obj-95",
                                    "linecount": 4,
                                    "maxclass": "comment",
                                    "numinlets": 1,
                                    "numoutlets": 0,
                                    "patching_rect": [ 610.0, 60.0, 180.0, 64.0 ],
                                    "text": "The incoming signal is slightly delayed in order to maintain a smooth attack. This is handled by the Lookahead~ subpatcher."
                                }
                            },
                            {
                                "box": {
                                    "background": 1,
                                    "id": "obj-66",
                                    "maxclass": "comment",
                                    "numinlets": 1,
                                    "numoutlets": 0,
                                    "patching_rect": [ 56.5, 405.0, 70.0, 21.0 ],
                                    "text": "Audio out L",
                                    "textjustification": 1
                                }
                            }
                        ],
                        "lines": [
                            {
                                "patchline": {
                                    "destination": [ "obj-23", 0 ],
                                    "source": [ "obj-1", 0 ]
                                }
                            },
                            {
                                "patchline": {
                                    "destination": [ "obj-10", 0 ],
                                    "order": 0,
                                    "source": [ "obj-100", 0 ]
                                }
                            },
                            {
                                "patchline": {
                                    "destination": [ "obj-15", 0 ],
                                    "order": 1,
                                    "source": [ "obj-100", 0 ]
                                }
                            },
                            {
                                "patchline": {
                                    "destination": [ "obj-42", 1 ],
                                    "order": 3,
                                    "source": [ "obj-100", 0 ]
                                }
                            },
                            {
                                "patchline": {
                                    "destination": [ "obj-44", 1 ],
                                    "order": 2,
                                    "source": [ "obj-100", 0 ]
                                }
                            },
                            {
                                "patchline": {
                                    "destination": [ "obj-100", 0 ],
                                    "source": [ "obj-102", 0 ]
                                }
                            },
                            {
                                "patchline": {
                                    "destination": [ "obj-110", 0 ],
                                    "source": [ "obj-109", 0 ]
                                }
                            },
                            {
                                "patchline": {
                                    "destination": [ "obj-8", 2 ],
                                    "source": [ "obj-110", 0 ]
                                }
                            },
                            {
                                "patchline": {
                                    "destination": [ "obj-100", 1 ],
                                    "source": [ "obj-119", 0 ]
                                }
                            },
                            {
                                "patchline": {
                                    "destination": [ "obj-8", 1 ],
                                    "source": [ "obj-16", 0 ]
                                }
                            },
                            {
                                "patchline": {
                                    "destination": [ "obj-8", 0 ],
                                    "source": [ "obj-17", 0 ]
                                }
                            },
                            {
                                "patchline": {
                                    "destination": [ "obj-119", 0 ],
                                    "source": [ "obj-19", 0 ]
                                }
                            },
                            {
                                "patchline": {
                                    "destination": [ "obj-23", 1 ],
                                    "source": [ "obj-2", 0 ]
                                }
                            },
                            {
                                "patchline": {
                                    "destination": [ "obj-42", 0 ],
                                    "source": [ "obj-23", 0 ]
                                }
                            },
                            {
                                "patchline": {
                                    "destination": [ "obj-44", 0 ],
                                    "source": [ "obj-23", 1 ]
                                }
                            },
                            {
                                "patchline": {
                                    "destination": [ "obj-100", 2 ],
                                    "source": [ "obj-24", 0 ]
                                }
                            },
                            {
                                "patchline": {
                                    "destination": [ "obj-23", 2 ],
                                    "source": [ "obj-29", 0 ]
                                }
                            },
                            {
                                "patchline": {
                                    "destination": [ "obj-3", 0 ],
                                    "source": [ "obj-42", 0 ]
                                }
                            },
                            {
                                "patchline": {
                                    "destination": [ "obj-4", 0 ],
                                    "source": [ "obj-44", 0 ]
                                }
                            },
                            {
                                "patchline": {
                                    "destination": [ "obj-24", 0 ],
                                    "source": [ "obj-5", 0 ]
                                }
                            },
                            {
                                "patchline": {
                                    "destination": [ "obj-29", 0 ],
                                    "source": [ "obj-6", 0 ]
                                }
                            },
                            {
                                "patchline": {
                                    "destination": [ "obj-102", 0 ],
                                    "source": [ "obj-8", 0 ]
                                }
                            }
                        ],
                        "export_config": {
                            "max-export": {
                                "max-external-export": {
                                    "external_name": "rnbo.autoswell~",
                                    "author": "Cycling74",
                                    "description": "Classic stereo auto-volume effect",
                                    "tags": "audio, effect, guitar",
                                    "mc": 1
                                }
                            },
                            "vst-au-export": {
                                "vst-au-export-ins": {
                                    "plugin_name": "Rnbo AutoSwell",
                                    "plugin_manufacturer_name": "Cycling74",
                                    "plugin_type": "Effect"
                                }
                            },
                            "cpp-export": {
                                "cpp-code-export": {
                                    "export_name": "rnbo.autoswell.cpp"
                                }
                            },
                            "web-export": {
                                "json-web-export": {
                                    "file_name": "autoswell.json"
                                }
                            }
                        }
                    },
                    "patching_rect": [ 19.0, 15.0, 124.0, 24.0 ],
                    "rnboattrcache": {
                        "slope": {
                            "label": "slope",
                            "isEnum": 0,
                            "parsestring": ""
                        },
                        "lookahead": {
                            "label": "lookahead",
                            "isEnum": 0,
                            "parsestring": ""
                        },
                        "time": {
                            "label": "time",
                            "isEnum": 0,
                            "parsestring": ""
                        },
                        "sense": {
                            "label": "sense",
                            "isEnum": 0,
                            "parsestring": ""
                        }
                    },
                    "rnboversion": "1.4.2",
                    "saved_attribute_attributes": {
                        "valueof": {
                            "parameter_invisible": 1,
                            "parameter_longname": "rnbo~[31]",
                            "parameter_modmode": 0,
                            "parameter_shortname": "rnbo~",
                            "parameter_type": 3
                        }
                    },
                    "saved_newobj_attribute_attributes": {
                        "color": {
                            "expression": "themecolor.theme_color"
                        }
                    },
                    "saved_object_attributes": {
                        "optimization": "O1",
                        "parameter_enable": 1,
                        "uuid": "74a09b97-f360-11ea-9b97-34363bd3ed8c"
                    },
                    "snapshot": {
                        "filetype": "C74Snapshot",
                        "version": 2,
                        "minorversion": 0,
                        "name": "snapshotlist",
                        "origin": "rnbo~",
                        "type": "list",
                        "subtype": "Undefined",
                        "embed": 1,
                        "snapshot": {
                            "lookahead": {
                                "value": 0.0
                            },
                            "slope": {
                                "value": 0.0
                            },
                            "__sps": {
                                "AttackDetection~": {                                },
                                "VolumeRamp~": {                                },
                                "Lookahead~": {                                }
                            },
                            "sense": {
                                "value": 0.0
                            },
                            "time": {
                                "value": 0.0
                            },
                            "__presetid": "74a09b97-f360-11ea-9b97-34363bd3ed8c"
                        },
                        "snapshotlist": {
                            "current_snapshot": 0,
                            "entries": [
                                {
                                    "filetype": "C74Snapshot",
                                    "version": 2,
                                    "minorversion": 0,
                                    "name": "Default",
                                    "origin": "74a09b97-f360-11ea-9b97-34363bd3ed8c",
                                    "type": "rnbo",
                                    "subtype": "",
                                    "embed": 1,
                                    "snapshot": {
                                        "lookahead": {
                                            "value": 0.0
                                        },
                                        "slope": {
                                            "value": 0.0
                                        },
                                        "__sps": {
                                            "AttackDetection~": {                                            },
                                            "VolumeRamp~": {                                            },
                                            "Lookahead~": {                                            }
                                        },
                                        "sense": {
                                            "value": 0.0
                                        },
                                        "time": {
                                            "value": 0.0
                                        },
                                        "__presetid": "74a09b97-f360-11ea-9b97-34363bd3ed8c"
                                    },
                                    "fileref": {
                                        "name": "Default",
                                        "filename": "Default_20260225_19.maxsnap",
                                        "filepath": "~/Documents/Max 9/Snapshots",
                                        "filepos": -1,
                                        "snapshotfileid": "30f9895fc500a31fbfcd9d5a7e10f541"
                                    }
                                },
                                {
                                    "filetype": "C74Snapshot",
                                    "version": 2,
                                    "minorversion": 0,
                                    "name": "Slow",
                                    "origin": "74a09b97-f360-11ea-9b97-34363bd3ed8c",
                                    "type": "rnbo",
                                    "subtype": "",
                                    "embed": 1,
                                    "snapshot": {
                                        "lookahead": {
                                            "value": 100.0
                                        },
                                        "slope": {
                                            "value": 25.0
                                        },
                                        "__sps": {
                                            "AttackDetection~": {                                            },
                                            "VolumeRamp~": {                                            },
                                            "Lookahead~": {                                            }
                                        },
                                        "sense": {
                                            "value": 25.0
                                        },
                                        "time": {
                                            "value": 100.0
                                        },
                                        "__presetid": "74a09b97-f360-11ea-9b97-34363bd3ed8c"
                                    },
                                    "fileref": {
                                        "name": "Slow",
                                        "filename": "Default[1].maxsnap",
                                        "filepath": "~/Documents/Max 8/Snapshots",
                                        "filepos": -1,
                                        "snapshotfileid": "f574d9b590e3e3bceb68a478b7f71d1a"
                                    }
                                },
                                {
                                    "filetype": "C74Snapshot",
                                    "version": 2,
                                    "minorversion": 0,
                                    "name": "Fast",
                                    "origin": "74a09b97-f360-11ea-9b97-34363bd3ed8c",
                                    "type": "rnbo",
                                    "subtype": "",
                                    "embed": 1,
                                    "snapshot": {
                                        "lookahead": {
                                            "value": 50.0
                                        },
                                        "slope": {
                                            "value": 100.0
                                        },
                                        "__sps": {
                                            "AttackDetection~": {                                            },
                                            "VolumeRamp~": {                                            },
                                            "Lookahead~": {                                            }
                                        },
                                        "sense": {
                                            "value": 25.0
                                        },
                                        "time": {
                                            "value": 0.0
                                        },
                                        "__presetid": "74a09b97-f360-11ea-9b97-34363bd3ed8c"
                                    },
                                    "fileref": {
                                        "name": "Fast",
                                        "filename": "Default[1]_20220122.maxsnap",
                                        "filepath": "~/Documents/Max 8/Snapshots",
                                        "filepos": -1,
                                        "snapshotfileid": "a8634491be5379858e257d9ddcecfe3e"
                                    }
                                }
                            ]
                        }
                    },
                    "text": "rnbo~",
                    "varname": "rnbo~[31]"
                }
            }
        ],
        "lines": [],
        "parameters": {
            "obj-40": [ "rnbo~[31]", "rnbo~", 0 ],
            "obj-41": [ "rnbo~[32]", "rnbo~", 0 ],
            "parameterbanks": {
                "0": {
                    "index": 0,
                    "name": "",
                    "parameters": [ "-", "-", "-", "-", "-", "-", "-", "-" ],
                    "buttons": [ "-", "-", "-", "-", "-", "-", "-", "-" ]
                }
            },
            "inherited_shortname": 1
        },
        "autosave": 0
    }
}