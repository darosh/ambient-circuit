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
        "rect": [ 53.0, 99.0, 662.0, 476.0 ],
        "integercoordinates": 1,
        "boxes": [
            {
                "box": {
                    "id": "obj-14",
                    "maxclass": "comment",
                    "numinlets": 1,
                    "numoutlets": 0,
                    "patching_rect": [ 479.0, 21.0, 150.0, 20.0 ],
                    "text": "Empty"
                }
            },
            {
                "box": {
                    "autosave": 1,
                    "id": "obj-13",
                    "inletInfo": {
                        "IOInfo": []
                    },
                    "maxclass": "newobj",
                    "numinlets": 1,
                    "numoutlets": 1,
                    "outletInfo": {
                        "IOInfo": []
                    },
                    "outlettype": [ "list" ],
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
                        "rect": [ 133.0, 91.0, 506.0, 423.0 ],
                        "default_fontname": "Lato",
                        "integercoordinates": 1,
                        "title": "untitled",
                        "boxes": [],
                        "lines": [],
                        "export_config": {
                            "web-export": {
                                "json-web-export": {
                                    "file_name": "empty.json"
                                }
                            }
                        }
                    },
                    "patching_rect": [ 479.0, 57.0, 100.0, 22.0 ],
                    "rnboattrcache": {                    },
                    "rnboversion": "1.4.2",
                    "saved_attribute_attributes": {
                        "valueof": {
                            "parameter_invisible": 1,
                            "parameter_longname": "rnbo~[11]",
                            "parameter_modmode": 0,
                            "parameter_shortname": "rnbo~[11]",
                            "parameter_type": 3
                        }
                    },
                    "saved_object_attributes": {
                        "optimization": "O1",
                        "parameter_enable": 1,
                        "uuid": "cc3d1311-0d9b-11f1-9311-de14237c4a52"
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
                            "__presetid": "cc3d1311-0d9b-11f1-9311-de14237c4a52"
                        },
                        "snapshotlist": {
                            "current_snapshot": 0,
                            "entries": [
                                {
                                    "filetype": "C74Snapshot",
                                    "version": 2,
                                    "minorversion": 0,
                                    "name": "untitled",
                                    "origin": "cc3d1311-0d9b-11f1-9311-de14237c4a52",
                                    "type": "rnbo",
                                    "subtype": "",
                                    "embed": 1,
                                    "snapshot": {
                                        "__presetid": "cc3d1311-0d9b-11f1-9311-de14237c4a52"
                                    },
                                    "fileref": {
                                        "name": "untitled",
                                        "filename": "untitled_20260219_2.maxsnap",
                                        "filepath": "~/Documents/Max 9/Snapshots",
                                        "filepos": -1,
                                        "snapshotfileid": "67146f57dc1a44221d94924df4a0fc99"
                                    }
                                }
                            ]
                        }
                    },
                    "text": "rnbo~",
                    "varname": "rnbo~[11]"
                }
            },
            {
                "box": {
                    "autosave": 1,
                    "color": [ 0.309803921568627, 0.63921568627451, 0.988235294117647, 1.0 ],
                    "id": "obj-57",
                    "inletInfo": {
                        "IOInfo": [
                            {
                                "type": "midi",
                                "index": -1,
                                "tag": "",
                                "comment": ""
                            }
                        ]
                    },
                    "maxclass": "newobj",
                    "numinlets": 2,
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
                                "type": "midi",
                                "index": -1,
                                "tag": "",
                                "comment": ""
                            }
                        ]
                    },
                    "outlettype": [ "signal", "signal", "int", "list" ],
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
                        "rect": [ 133.0, 80.0, 318.0, 423.0 ],
                        "default_fontname": "Lato",
                        "integercoordinates": 1,
                        "title": "feedback-synth",
                        "boxes": [
                            {
                                "box": {
                                    "id": "obj-10",
                                    "maxclass": "newobj",
                                    "numinlets": 2,
                                    "numoutlets": 1,
                                    "outlettype": [ "signal" ],
                                    "patching_rect": [ 40.0, 526.0, 40.0, 23.0 ],
                                    "rnbo_classname": "*~",
                                    "rnbo_serial": 1,
                                    "rnbo_uniqueid": "*~_obj-10",
                                    "text": "*~ 0.5"
                                }
                            },
                            {
                                "box": {
                                    "bubble": 1,
                                    "bubbleside": 3,
                                    "fontsize": 18.0,
                                    "id": "obj-8",
                                    "linecount": 2,
                                    "maxclass": "comment",
                                    "numinlets": 1,
                                    "numoutlets": 0,
                                    "patching_rect": [ 486.0, 301.5, 166.0, 54.0 ],
                                    "text": "Open the Export Sidebar"
                                }
                            },
                            {
                                "box": {
                                    "id": "obj-26",
                                    "maxclass": "newobj",
                                    "numinlets": 3,
                                    "numoutlets": 1,
                                    "outlettype": [ "signal" ],
                                    "patching_rect": [ 174.0, 435.0, 73.0, 23.0 ],
                                    "rnbo_classname": "slide~",
                                    "rnbo_serial": 1,
                                    "rnbo_uniqueid": "slide~_obj-26",
                                    "text": "slide~ 20 20"
                                }
                            },
                            {
                                "box": {
                                    "id": "obj-24",
                                    "maxclass": "newobj",
                                    "numinlets": 3,
                                    "numoutlets": 1,
                                    "outlettype": [ "signal" ],
                                    "patching_rect": [ 69.0, 435.0, 73.0, 23.0 ],
                                    "rnbo_classname": "slide~",
                                    "rnbo_serial": 2,
                                    "rnbo_uniqueid": "slide~_obj-24",
                                    "text": "slide~ 20 20"
                                }
                            },
                            {
                                "box": {
                                    "id": "obj-22",
                                    "maxclass": "newobj",
                                    "numinlets": 3,
                                    "numoutlets": 1,
                                    "outlettype": [ "signal" ],
                                    "patching_rect": [ 224.5, 214.0, 73.0, 23.0 ],
                                    "rnbo_classname": "slide~",
                                    "rnbo_serial": 3,
                                    "rnbo_uniqueid": "slide~_obj-22",
                                    "text": "slide~ 20 20"
                                }
                            },
                            {
                                "box": {
                                    "id": "obj-18",
                                    "maxclass": "newobj",
                                    "numinlets": 3,
                                    "numoutlets": 1,
                                    "outlettype": [ "signal" ],
                                    "patching_rect": [ 99.5, 179.0, 73.0, 23.0 ],
                                    "rnbo_classname": "slide~",
                                    "rnbo_serial": 4,
                                    "rnbo_uniqueid": "slide~_obj-18",
                                    "text": "slide~ 20 20"
                                }
                            },
                            {
                                "box": {
                                    "id": "obj-17",
                                    "maxclass": "newobj",
                                    "numinlets": 2,
                                    "numoutlets": 2,
                                    "outlettype": [ "", "" ],
                                    "patching_rect": [ 174.0, 401.0, 216.0, 23.0 ],
                                    "rnbo_classname": "param",
                                    "rnbo_extra_attributes": {
                                        "meta": "",
                                        "tonormalized": "",
                                        "ctlin": 0.0,
                                        "enum": "",
                                        "fromnormalized": "",
                                        "steps": 0.0,
                                        "unit": "",
                                        "order": "0",
                                        "displayorder": "-",
                                        "preset": 1,
                                        "displayname": "",
                                        "sendinit": 1,
                                        "exponent": 1.0
                                    },
                                    "rnbo_serial": 1,
                                    "rnbo_uniqueid": "Q",
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
                                                "defaultValue": "3"
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
                                    "text": "param Q @value 3 @min 0.01 @max 10",
                                    "varname": "Q"
                                }
                            },
                            {
                                "box": {
                                    "id": "obj-4",
                                    "maxclass": "newobj",
                                    "numinlets": 2,
                                    "numoutlets": 2,
                                    "outlettype": [ "", "" ],
                                    "patching_rect": [ 69.0, 359.0, 336.0, 23.0 ],
                                    "rnbo_classname": "param",
                                    "rnbo_extra_attributes": {
                                        "meta": "",
                                        "tonormalized": "",
                                        "ctlin": 0.0,
                                        "enum": "",
                                        "fromnormalized": "",
                                        "steps": 0.0,
                                        "unit": "",
                                        "order": "0",
                                        "displayorder": "-",
                                        "preset": 1,
                                        "displayname": "",
                                        "sendinit": 1
                                    },
                                    "rnbo_serial": 2,
                                    "rnbo_uniqueid": "cutoff",
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
                                                "defaultValue": "880"
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
                                    "text": "param cutoff @value 880 @min 100 @max 8000 @exponent 2",
                                    "varname": "cutoff"
                                }
                            },
                            {
                                "box": {
                                    "color": [ 0.862745, 0.741176, 0.137255, 1.0 ],
                                    "id": "obj-14",
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
                                        "rect": [ 948.0, 418.0, 640.0, 480.0 ],
                                        "default_fontname": "Lato",
                                        "integercoordinates": 1,
                                        "title": "filter",
                                        "boxes": [
                                            {
                                                "box": {
                                                    "id": "obj-8",
                                                    "maxclass": "newobj",
                                                    "numinlets": 1,
                                                    "numoutlets": 0,
                                                    "patching_rect": [ 67.0, 355.0, 140.0, 23.0 ],
                                                    "rnbo_classname": "out~",
                                                    "rnbo_extra_attributes": {
                                                        "meta": ""
                                                    },
                                                    "rnbo_serial": 1,
                                                    "rnbo_uniqueid": "out~_obj-8",
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
                                                                "displayName": "Signal",
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
                                                    "text": "out~ 1 @comment Signal"
                                                }
                                            },
                                            {
                                                "box": {
                                                    "id": "obj-7",
                                                    "maxclass": "newobj",
                                                    "numinlets": 6,
                                                    "numoutlets": 1,
                                                    "outlettype": [ "signal" ],
                                                    "patching_rect": [ 67.0, 308.0, 165.5, 23.0 ],
                                                    "rnbo_classname": "biquad~",
                                                    "rnbo_serial": 1,
                                                    "rnbo_uniqueid": "biquad~_obj-7",
                                                    "text": "biquad~"
                                                }
                                            },
                                            {
                                                "box": {
                                                    "id": "obj-6",
                                                    "maxclass": "newobj",
                                                    "numinlets": 3,
                                                    "numoutlets": 5,
                                                    "outlettype": [ "signal", "signal", "signal", "signal", "signal" ],
                                                    "patching_rect": [ 96.3, 263.0, 136.2, 23.0 ],
                                                    "rnbo_classname": "filtercoeff~",
                                                    "rnbo_extra_attributes": {
                                                        "resamp": -1.0
                                                    },
                                                    "rnbo_serial": 1,
                                                    "rnbo_uniqueid": "filtercoeff~_obj-6",
                                                    "rnboinfo": {
                                                        "needsInstanceInfo": 1,
                                                        "argnames": {
                                                            "out1": {
                                                                "attrOrProp": 1,
                                                                "digest": "Gain (FF Coefficient 0)",
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
                                                                "digest": "FF Coefficient 1",
                                                                "isalias": 0,
                                                                "aliases": [],
                                                                "attachable": 0,
                                                                "isparam": 0,
                                                                "deprecated": 0,
                                                                "touched": 0,
                                                                "outlet": 1,
                                                                "type": "signal"
                                                            },
                                                            "out3": {
                                                                "attrOrProp": 1,
                                                                "digest": "FF Coefficient 2",
                                                                "isalias": 0,
                                                                "aliases": [],
                                                                "attachable": 0,
                                                                "isparam": 0,
                                                                "deprecated": 0,
                                                                "touched": 0,
                                                                "outlet": 1,
                                                                "type": "signal"
                                                            },
                                                            "out4": {
                                                                "attrOrProp": 1,
                                                                "digest": "FB Coefficient 1",
                                                                "isalias": 0,
                                                                "aliases": [],
                                                                "attachable": 0,
                                                                "isparam": 0,
                                                                "deprecated": 0,
                                                                "touched": 0,
                                                                "outlet": 1,
                                                                "type": "signal"
                                                            },
                                                            "out5": {
                                                                "attrOrProp": 1,
                                                                "digest": "FB Coefficient 2",
                                                                "isalias": 0,
                                                                "aliases": [],
                                                                "attachable": 0,
                                                                "isparam": 0,
                                                                "deprecated": 0,
                                                                "touched": 0,
                                                                "outlet": 1,
                                                                "type": "signal"
                                                            },
                                                            "frequency": {
                                                                "attrOrProp": 1,
                                                                "digest": "Frequency",
                                                                "isalias": 0,
                                                                "aliases": [],
                                                                "settable": 1,
                                                                "attachable": 0,
                                                                "isparam": 0,
                                                                "deprecated": 0,
                                                                "touched": 0,
                                                                "inlet": 1,
                                                                "type": "number",
                                                                "defaultValue": "1000"
                                                            },
                                                            "gain": {
                                                                "attrOrProp": 1,
                                                                "digest": "Gain",
                                                                "isalias": 0,
                                                                "aliases": [],
                                                                "settable": 1,
                                                                "attachable": 0,
                                                                "isparam": 0,
                                                                "deprecated": 0,
                                                                "touched": 0,
                                                                "inlet": 1,
                                                                "type": "number",
                                                                "defaultValue": "1"
                                                            },
                                                            "q": {
                                                                "attrOrProp": 1,
                                                                "digest": "Q (Resonance)",
                                                                "isalias": 0,
                                                                "aliases": [],
                                                                "settable": 1,
                                                                "attachable": 0,
                                                                "isparam": 0,
                                                                "deprecated": 0,
                                                                "touched": 0,
                                                                "inlet": 1,
                                                                "type": "number",
                                                                "defaultValue": "1"
                                                            },
                                                            "type": {
                                                                "attrOrProp": 1,
                                                                "digest": "Filter type",
                                                                "defaultarg": 1,
                                                                "isalias": 0,
                                                                "aliases": [],
                                                                "settable": 1,
                                                                "attachable": 1,
                                                                "isparam": 0,
                                                                "deprecated": 0,
                                                                "touched": 0,
                                                                "enum": [ "lowpass", "highpass", "bandpass", "bandstop", "peaknotch", "lowshelf", "highshelf", "resonant", "allpass", "gainlpass", "gainhpass", "gainbpass", "gainbstop", "gainresonant", "gainapass", "off" ],
                                                                "type": "enum",
                                                                "defaultValue": "lowpass"
                                                            },
                                                            "reset": {
                                                                "attrOrProp": 1,
                                                                "digest": "Banging this attribute will reset the object to its default state.",
                                                                "isalias": 0,
                                                                "aliases": [],
                                                                "attachable": 1,
                                                                "isparam": 0,
                                                                "deprecated": 0,
                                                                "touched": 0,
                                                                "type": "bang",
                                                                "defaultValue": "0"
                                                            },
                                                            "resamp": {
                                                                "attrOrProp": 2,
                                                                "digest": "Resampling Interval",
                                                                "defaultarg": 2,
                                                                "isalias": 0,
                                                                "aliases": [],
                                                                "settable": 1,
                                                                "attachable": 0,
                                                                "isparam": 0,
                                                                "deprecated": 0,
                                                                "touched": 0,
                                                                "type": "number",
                                                                "defaultValue": "-1"
                                                            }
                                                        },
                                                        "inputs": [
                                                            {
                                                                "name": "frequency",
                                                                "type": "auto",
                                                                "digest": "Frequency",
                                                                "displayName": "frequency",
                                                                "hot": 1,
                                                                "docked": 0
                                                            },
                                                            {
                                                                "name": "gain",
                                                                "type": "auto",
                                                                "digest": "Gain",
                                                                "displayName": "gain",
                                                                "docked": 0
                                                            },
                                                            {
                                                                "name": "q",
                                                                "type": "auto",
                                                                "digest": "Q (Resonance)",
                                                                "displayName": "q",
                                                                "docked": 0
                                                            }
                                                        ],
                                                        "outputs": [
                                                            {
                                                                "name": "out1",
                                                                "type": "signal",
                                                                "digest": "Gain (FF Coefficient 0)",
                                                                "docked": 0
                                                            },
                                                            {
                                                                "name": "out2",
                                                                "type": "signal",
                                                                "digest": "FF Coefficient 1",
                                                                "docked": 0
                                                            },
                                                            {
                                                                "name": "out3",
                                                                "type": "signal",
                                                                "digest": "FF Coefficient 2",
                                                                "docked": 0
                                                            },
                                                            {
                                                                "name": "out4",
                                                                "type": "signal",
                                                                "digest": "FB Coefficient 1",
                                                                "docked": 0
                                                            },
                                                            {
                                                                "name": "out5",
                                                                "type": "signal",
                                                                "digest": "FB Coefficient 2",
                                                                "docked": 0
                                                            }
                                                        ],
                                                        "helpname": "filtercoeff~",
                                                        "aliasOf": "filtercoeff~",
                                                        "classname": "filtercoeff~",
                                                        "operator": 0,
                                                        "changesPatcherIO": 0
                                                    },
                                                    "text": "filtercoeff~ lowpass"
                                                }
                                            },
                                            {
                                                "box": {
                                                    "id": "obj-5",
                                                    "maxclass": "newobj",
                                                    "numinlets": 0,
                                                    "numoutlets": 1,
                                                    "outlettype": [ "signal" ],
                                                    "patching_rect": [ 213.5, 229.0, 110.0, 23.0 ],
                                                    "rnbo_classname": "in~",
                                                    "rnbo_extra_attributes": {
                                                        "meta": ""
                                                    },
                                                    "rnbo_serial": 1,
                                                    "rnbo_uniqueid": "in~_obj-5",
                                                    "rnboinfo": {
                                                        "needsInstanceInfo": 1,
                                                        "argnames": {
                                                            "out1": {
                                                                "attrOrProp": 1,
                                                                "digest": "signal from inlet with index 3",
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
                                                                "digest": "signal from inlet with index 3",
                                                                "displayName": "Q",
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
                                                    "text": "in~ 3 @comment Q"
                                                }
                                            },
                                            {
                                                "box": {
                                                    "id": "obj-4",
                                                    "maxclass": "newobj",
                                                    "numinlets": 0,
                                                    "numoutlets": 1,
                                                    "outlettype": [ "signal" ],
                                                    "patching_rect": [ 96.3, 169.0, 135.0, 23.0 ],
                                                    "rnbo_classname": "in~",
                                                    "rnbo_extra_attributes": {
                                                        "meta": ""
                                                    },
                                                    "rnbo_serial": 2,
                                                    "rnbo_uniqueid": "in~_obj-4",
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
                                                                "displayName": "Cutoff",
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
                                                    "text": "in~ 2 @comment Cutoff"
                                                }
                                            },
                                            {
                                                "box": {
                                                    "id": "obj-3",
                                                    "maxclass": "newobj",
                                                    "numinlets": 0,
                                                    "numoutlets": 1,
                                                    "outlettype": [ "signal" ],
                                                    "patching_rect": [ 67.0, 116.0, 132.0, 23.0 ],
                                                    "rnbo_classname": "in~",
                                                    "rnbo_extra_attributes": {
                                                        "meta": ""
                                                    },
                                                    "rnbo_serial": 3,
                                                    "rnbo_uniqueid": "in~_obj-3",
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
                                                                "displayName": "Signal",
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
                                                    "text": "in~ 1 @comment Signal"
                                                }
                                            }
                                        ],
                                        "lines": [
                                            {
                                                "patchline": {
                                                    "destination": [ "obj-7", 0 ],
                                                    "source": [ "obj-3", 0 ]
                                                }
                                            },
                                            {
                                                "patchline": {
                                                    "destination": [ "obj-6", 0 ],
                                                    "source": [ "obj-4", 0 ]
                                                }
                                            },
                                            {
                                                "patchline": {
                                                    "destination": [ "obj-6", 2 ],
                                                    "source": [ "obj-5", 0 ]
                                                }
                                            },
                                            {
                                                "patchline": {
                                                    "destination": [ "obj-7", 5 ],
                                                    "source": [ "obj-6", 4 ]
                                                }
                                            },
                                            {
                                                "patchline": {
                                                    "destination": [ "obj-7", 4 ],
                                                    "source": [ "obj-6", 3 ]
                                                }
                                            },
                                            {
                                                "patchline": {
                                                    "destination": [ "obj-7", 3 ],
                                                    "source": [ "obj-6", 2 ]
                                                }
                                            },
                                            {
                                                "patchline": {
                                                    "destination": [ "obj-7", 2 ],
                                                    "source": [ "obj-6", 1 ]
                                                }
                                            },
                                            {
                                                "patchline": {
                                                    "destination": [ "obj-7", 1 ],
                                                    "source": [ "obj-6", 0 ]
                                                }
                                            },
                                            {
                                                "patchline": {
                                                    "destination": [ "obj-8", 0 ],
                                                    "source": [ "obj-7", 0 ]
                                                }
                                            }
                                        ],
                                        "styles": [
                                            {
                                                "name": "sbb_subtitle",
                                                "parentstyle": "",
                                                "multi": 0
                                            },
                                            {
                                                "name": "sbb_title",
                                                "default": {
                                                    "fontface": [ 3 ],
                                                    "fontsize": [ 18.0 ]
                                                },
                                                "parentstyle": "",
                                                "multi": 0
                                            }
                                        ]
                                    },
                                    "patching_rect": [ 40.0, 491.0, 77.0, 23.0 ],
                                    "rnbo_classname": "p",
                                    "rnbo_extra_attributes": {
                                        "voicecontrol": "simple",
                                        "notecontroller": 0,
                                        "args": [],
                                        "exposevoiceparams": 0,
                                        "receivemode": "local",
                                        "polyphony": -1.0,
                                        "uidstyle": "auto"
                                    },
                                    "rnbo_serial": 1,
                                    "rnbo_uniqueid": "filter",
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
                                            "in3": {
                                                "attrOrProp": 1,
                                                "digest": "in3",
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
                                                "displayName": "Signal",
                                                "hot": 1,
                                                "docked": 0
                                            },
                                            {
                                                "name": "in2",
                                                "type": "signal",
                                                "digest": "in2",
                                                "displayName": "Cutoff",
                                                "hot": 1,
                                                "docked": 0
                                            },
                                            {
                                                "name": "in3",
                                                "type": "signal",
                                                "digest": "in3",
                                                "displayName": "Q",
                                                "hot": 1,
                                                "docked": 0
                                            }
                                        ],
                                        "outputs": [
                                            {
                                                "name": "out1",
                                                "type": "signal",
                                                "digest": "out1",
                                                "displayName": "Signal",
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
                                    "text": "p @title filter",
                                    "varname": "filter"
                                }
                            },
                            {
                                "box": {
                                    "color": [ 0.862745, 0.741176, 0.137255, 1.0 ],
                                    "id": "obj-12",
                                    "maxclass": "newobj",
                                    "numinlets": 2,
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
                                        "rect": [ 909.0, 397.0, 444.0, 334.0 ],
                                        "default_fontname": "Lato",
                                        "integercoordinates": 1,
                                        "title": "envelope",
                                        "boxes": [
                                            {
                                                "box": {
                                                    "id": "obj-6",
                                                    "maxclass": "newobj",
                                                    "numinlets": 1,
                                                    "numoutlets": 0,
                                                    "patching_rect": [ 43.0, 265.0, 43.0, 23.0 ],
                                                    "rnbo_classname": "out~",
                                                    "rnbo_extra_attributes": {
                                                        "meta": "",
                                                        "comment": ""
                                                    },
                                                    "rnbo_serial": 1,
                                                    "rnbo_uniqueid": "out~_obj-6",
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
                                                    "id": "obj-5",
                                                    "maxclass": "newobj",
                                                    "numinlets": 2,
                                                    "numoutlets": 1,
                                                    "outlettype": [ "signal" ],
                                                    "patching_rect": [ 43.0, 207.0, 29.5, 23.0 ],
                                                    "rnbo_classname": "*~",
                                                    "rnbo_serial": 1,
                                                    "rnbo_uniqueid": "*~_obj-5",
                                                    "text": "*~"
                                                }
                                            },
                                            {
                                                "box": {
                                                    "id": "obj-4",
                                                    "maxclass": "newobj",
                                                    "numinlets": 0,
                                                    "numoutlets": 1,
                                                    "outlettype": [ "signal" ],
                                                    "patching_rect": [ 185.0, 33.0, 126.0, 23.0 ],
                                                    "rnbo_classname": "in~",
                                                    "rnbo_extra_attributes": {
                                                        "meta": ""
                                                    },
                                                    "rnbo_serial": 1,
                                                    "rnbo_uniqueid": "in~_obj-4",
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
                                                                "displayName": "Gate",
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
                                                    "text": "in~ 2 @comment Gate"
                                                }
                                            },
                                            {
                                                "box": {
                                                    "id": "obj-3",
                                                    "maxclass": "newobj",
                                                    "numinlets": 0,
                                                    "numoutlets": 1,
                                                    "outlettype": [ "signal" ],
                                                    "patching_rect": [ 43.0, 33.0, 132.0, 23.0 ],
                                                    "rnbo_classname": "in~",
                                                    "rnbo_extra_attributes": {
                                                        "meta": ""
                                                    },
                                                    "rnbo_serial": 2,
                                                    "rnbo_uniqueid": "in~_obj-3",
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
                                                                "displayName": "Signal",
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
                                                    "text": "in~ 1 @comment Signal"
                                                }
                                            },
                                            {
                                                "box": {
                                                    "id": "obj-2",
                                                    "maxclass": "newobj",
                                                    "numinlets": 2,
                                                    "numoutlets": 1,
                                                    "outlettype": [ "signal" ],
                                                    "patching_rect": [ 185.0, 132.0, 29.5, 23.0 ],
                                                    "rnbo_classname": "*~",
                                                    "rnbo_serial": 2,
                                                    "rnbo_uniqueid": "*~_obj-2",
                                                    "text": "*~"
                                                }
                                            },
                                            {
                                                "box": {
                                                    "id": "obj-1",
                                                    "maxclass": "newobj",
                                                    "numinlets": 5,
                                                    "numoutlets": 2,
                                                    "outlettype": [ "signal", "" ],
                                                    "patching_rect": [ 185.0, 82.0, 88.0, 23.0 ],
                                                    "rnbo_classname": "adsr~",
                                                    "rnbo_serial": 1,
                                                    "rnbo_uniqueid": "adsr~_obj-1",
                                                    "text": "adsr~ 5 0 1. 50"
                                                }
                                            }
                                        ],
                                        "lines": [
                                            {
                                                "patchline": {
                                                    "destination": [ "obj-2", 1 ],
                                                    "order": 0,
                                                    "source": [ "obj-1", 0 ]
                                                }
                                            },
                                            {
                                                "patchline": {
                                                    "destination": [ "obj-2", 0 ],
                                                    "order": 1,
                                                    "source": [ "obj-1", 0 ]
                                                }
                                            },
                                            {
                                                "patchline": {
                                                    "destination": [ "obj-5", 1 ],
                                                    "source": [ "obj-2", 0 ]
                                                }
                                            },
                                            {
                                                "patchline": {
                                                    "destination": [ "obj-5", 0 ],
                                                    "source": [ "obj-3", 0 ]
                                                }
                                            },
                                            {
                                                "patchline": {
                                                    "destination": [ "obj-1", 0 ],
                                                    "source": [ "obj-4", 0 ]
                                                }
                                            },
                                            {
                                                "patchline": {
                                                    "destination": [ "obj-6", 0 ],
                                                    "source": [ "obj-5", 0 ]
                                                }
                                            }
                                        ]
                                    },
                                    "patching_rect": [ 40.0, 314.0, 162.0, 23.0 ],
                                    "rnbo_classname": "p",
                                    "rnbo_extra_attributes": {
                                        "voicecontrol": "simple",
                                        "notecontroller": 0,
                                        "args": [],
                                        "exposevoiceparams": 0,
                                        "receivemode": "local",
                                        "polyphony": -1.0,
                                        "uidstyle": "auto"
                                    },
                                    "rnbo_serial": 2,
                                    "rnbo_uniqueid": "envelope",
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
                                                "displayName": "Signal",
                                                "hot": 1,
                                                "docked": 0
                                            },
                                            {
                                                "name": "in2",
                                                "type": "signal",
                                                "digest": "in2",
                                                "displayName": "Gate",
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
                                    "text": "p @title envelope",
                                    "varname": "envelope"
                                }
                            },
                            {
                                "box": {
                                    "color": [ 0.862745, 0.741176, 0.137255, 1.0 ],
                                    "genpatcher": {
                                        "patcher": {
                                            "fileversion": 1,
                                            "appversion": {
                                                "major": 9,
                                                "minor": 1,
                                                "revision": 2,
                                                "architecture": "x64",
                                                "modernui": 1
                                            },
                                            "classnamespace": "dsp.gen",
                                            "rect": [ 954.0, 262.0, 600.0, 704.0 ],
                                            "integercoordinates": 1,
                                            "boxes": [
                                                {
                                                    "box": {
                                                        "maxclass": "newobj",
                                                        "text": "tanh",
                                                        "patching_rect": [ 50.0, 504.0, 32.0, 22.0 ],
                                                        "numinlets": 1,
                                                        "id": "obj-14",
                                                        "numoutlets": 1,
                                                        "outlettype": [ "" ]
                                                    }
                                                },
                                                {
                                                    "box": {
                                                        "maxclass": "newobj",
                                                        "text": "* 10",
                                                        "patching_rect": [ 50.0, 446.0, 30.0, 22.0 ],
                                                        "numinlets": 1,
                                                        "id": "obj-12",
                                                        "numoutlets": 1,
                                                        "outlettype": [ "" ]
                                                    }
                                                },
                                                {
                                                    "box": {
                                                        "maxclass": "newobj",
                                                        "text": "in 3",
                                                        "patching_rect": [ 226.5, 145.0, 28.0, 22.0 ],
                                                        "numinlets": 0,
                                                        "id": "obj-3",
                                                        "numoutlets": 1,
                                                        "outlettype": [ "" ]
                                                    }
                                                },
                                                {
                                                    "box": {
                                                        "maxclass": "newobj",
                                                        "text": "in 2",
                                                        "patching_rect": [ 384.0, 446.0, 28.0, 22.0 ],
                                                        "numinlets": 0,
                                                        "id": "obj-2",
                                                        "numoutlets": 1,
                                                        "outlettype": [ "" ]
                                                    }
                                                },
                                                {
                                                    "box": {
                                                        "maxclass": "newobj",
                                                        "text": "*",
                                                        "patching_rect": [ 216.0, 221.0, 29.5, 22.0 ],
                                                        "numinlets": 2,
                                                        "id": "obj-21",
                                                        "numoutlets": 1,
                                                        "outlettype": [ "" ]
                                                    }
                                                },
                                                {
                                                    "box": {
                                                        "maxclass": "newobj",
                                                        "text": "1.306563",
                                                        "patching_rect": [ 304.0, 414.0, 59.0, 22.0 ],
                                                        "numinlets": 0,
                                                        "id": "obj-10",
                                                        "numoutlets": 1,
                                                        "outlettype": [ "" ]
                                                    }
                                                },
                                                {
                                                    "box": {
                                                        "maxclass": "newobj",
                                                        "text": "0.541196",
                                                        "patching_rect": [ 304.0, 346.0, 58.0, 22.0 ],
                                                        "numinlets": 0,
                                                        "id": "obj-18",
                                                        "numoutlets": 1,
                                                        "outlettype": [ "" ]
                                                    }
                                                },
                                                {
                                                    "box": {
                                                        "maxclass": "newobj",
                                                        "text": "gen @title lowpass",
                                                        "patching_rect": [ 216.0, 446.0, 107.0, 23.0 ],
                                                        "fontname": "Lato",
                                                        "numinlets": 3,
                                                        "id": "obj-19",
                                                        "numoutlets": 1,
                                                        "fontsize": 12.0,
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
                                                            "classnamespace": "dsp.gen",
                                                            "rect": [ 540.0, 100.0, 642.0, 705.0 ],
                                                            "default_fontname": "Lato",
                                                            "integercoordinates": 1,
                                                            "boxes": [
                                                                {
                                                                    "box": {
                                                                        "maxclass": "codebox",
                                                                        "patching_rect": [ 123.72998, 118.0, 480.0, 504.0 ],
                                                                        "fontname": "<Monospaced>",
                                                                        "fontface": 0,
                                                                        "numinlets": 2,
                                                                        "id": "obj-30",
                                                                        "numoutlets": 5,
                                                                        "fontsize": 12.0,
                                                                        "outlettype": [ "", "", "", "", "" ],
                                                                        "code": "cf = in1;\r\nQ = in2;\r\n\r\nomega = cf * twopi/samplerate;\r\nomega = isnan(omega) ? 0.1 : omega;\nsn = sin(omega);\ncs = cos(omega);\nigain = 1.0/gain; \r\none_over_Q = 1./Q;\r\none_over_Q = isnan(one_over_Q) ? 2 : one_over_Q;\nalpha = sn * 0.5 * one_over_Q;\r\n\r\nb0 = 1./(1. + alpha);\r\na2 = ((1 - cs) * 0.5) * b0;\r\na0 = a2;\na1 = (1. - cs) * b0;\nb1 = (-2. * cs) * b0;\nb2 = (1. - alpha) * b0;\n\r\nout1 = a0;\r\nout2 = a1;\r\nout3 = a2;\r\nout4 = b1;\r\nout5 = b2;"
                                                                    }
                                                                },
                                                                {
                                                                    "box": {
                                                                        "maxclass": "newobj",
                                                                        "text": "in 3 @comment Q @default 0.5 @min 0.000001",
                                                                        "patching_rect": [ 217.22998, 64.0, 262.0, 23.0 ],
                                                                        "numinlets": 0,
                                                                        "id": "obj-13",
                                                                        "numoutlets": 1,
                                                                        "outlettype": [ "" ]
                                                                    }
                                                                },
                                                                {
                                                                    "box": {
                                                                        "maxclass": "newobj",
                                                                        "text": "in 2 @comment frequency @default 440 @min 0",
                                                                        "patching_rect": [ 123.72998, 9.0, 265.0, 23.0 ],
                                                                        "numinlets": 0,
                                                                        "id": "obj-10",
                                                                        "numoutlets": 1,
                                                                        "outlettype": [ "" ]
                                                                    }
                                                                },
                                                                {
                                                                    "box": {
                                                                        "maxclass": "newobj",
                                                                        "text": "gen @title biquad",
                                                                        "patching_rect": [ 9.0, 635.0, 594.599976, 23.0 ],
                                                                        "numinlets": 6,
                                                                        "id": "obj-8",
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
                                                                            "classnamespace": "dsp.gen",
                                                                            "rect": [ 106.0, 129.0, 543.0, 636.0 ],
                                                                            "integercoordinates": 1,
                                                                            "boxes": [
                                                                                {
                                                                                    "box": {
                                                                                        "maxclass": "comment",
                                                                                        "text": "Direct form of a two-pole, two-zero filter",
                                                                                        "patching_rect": [ 90.5, 46.0, 264.0, 21.0 ],
                                                                                        "fontname": "Lato",
                                                                                        "numinlets": 1,
                                                                                        "id": "obj-2",
                                                                                        "numoutlets": 0,
                                                                                        "fontsize": 12.0
                                                                                    }
                                                                                },
                                                                                {
                                                                                    "box": {
                                                                                        "maxclass": "comment",
                                                                                        "text": "x2",
                                                                                        "patching_rect": [ 325.5, 138.0, 30.0, 20.0 ],
                                                                                        "numinlets": 1,
                                                                                        "id": "obj-12",
                                                                                        "numoutlets": 0
                                                                                    }
                                                                                },
                                                                                {
                                                                                    "box": {
                                                                                        "maxclass": "comment",
                                                                                        "text": "x1",
                                                                                        "patching_rect": [ 220.0, 100.0, 30.0, 20.0 ],
                                                                                        "numinlets": 1,
                                                                                        "id": "obj-24",
                                                                                        "numoutlets": 0
                                                                                    }
                                                                                },
                                                                                {
                                                                                    "box": {
                                                                                        "maxclass": "comment",
                                                                                        "text": "y2",
                                                                                        "patching_rect": [ 220.0, 360.0, 30.0, 20.0 ],
                                                                                        "numinlets": 1,
                                                                                        "id": "obj-9",
                                                                                        "numoutlets": 0
                                                                                    }
                                                                                },
                                                                                {
                                                                                    "box": {
                                                                                        "maxclass": "comment",
                                                                                        "text": "y1",
                                                                                        "patching_rect": [ 114.5, 322.0, 30.0, 20.0 ],
                                                                                        "numinlets": 1,
                                                                                        "id": "obj-8",
                                                                                        "numoutlets": 0
                                                                                    }
                                                                                },
                                                                                {
                                                                                    "box": {
                                                                                        "maxclass": "comment",
                                                                                        "text": "Previous output history",
                                                                                        "patching_rect": [ 292.0, 329.0, 140.0, 21.0 ],
                                                                                        "fontname": "Lato",
                                                                                        "numinlets": 1,
                                                                                        "id": "obj-6",
                                                                                        "numoutlets": 0,
                                                                                        "fontsize": 12.0
                                                                                    }
                                                                                },
                                                                                {
                                                                                    "box": {
                                                                                        "maxclass": "comment",
                                                                                        "text": "Previous input history",
                                                                                        "patching_rect": [ 282.0, 100.0, 140.0, 21.0 ],
                                                                                        "fontname": "Lato",
                                                                                        "numinlets": 1,
                                                                                        "id": "obj-5",
                                                                                        "numoutlets": 0,
                                                                                        "fontsize": 12.0
                                                                                    }
                                                                                },
                                                                                {
                                                                                    "box": {
                                                                                        "maxclass": "newobj",
                                                                                        "text": "*",
                                                                                        "patching_rect": [ 168.5, 466.0, 32.5, 23.0 ],
                                                                                        "fontname": "Lato",
                                                                                        "numinlets": 2,
                                                                                        "id": "obj-18",
                                                                                        "numoutlets": 1,
                                                                                        "fontsize": 12.0,
                                                                                        "outlettype": [ "" ]
                                                                                    }
                                                                                },
                                                                                {
                                                                                    "box": {
                                                                                        "maxclass": "newobj",
                                                                                        "text": "history",
                                                                                        "patching_rect": [ 168.5, 360.0, 47.0, 23.0 ],
                                                                                        "fontname": "Lato",
                                                                                        "numinlets": 1,
                                                                                        "id": "obj-19",
                                                                                        "numoutlets": 1,
                                                                                        "fontsize": 12.0,
                                                                                        "outlettype": [ "" ]
                                                                                    }
                                                                                },
                                                                                {
                                                                                    "box": {
                                                                                        "maxclass": "newobj",
                                                                                        "text": "in 6 @comment b2 @default 0.2",
                                                                                        "patching_rect": [ 182.0, 433.0, 179.0, 23.0 ],
                                                                                        "fontname": "Lato",
                                                                                        "numinlets": 0,
                                                                                        "id": "obj-20",
                                                                                        "numoutlets": 1,
                                                                                        "fontsize": 12.0,
                                                                                        "outlettype": [ "" ]
                                                                                    }
                                                                                },
                                                                                {
                                                                                    "box": {
                                                                                        "maxclass": "newobj",
                                                                                        "text": "*",
                                                                                        "patching_rect": [ 63.5, 466.0, 32.5, 23.0 ],
                                                                                        "fontname": "Lato",
                                                                                        "numinlets": 2,
                                                                                        "id": "obj-21",
                                                                                        "numoutlets": 1,
                                                                                        "fontsize": 12.0,
                                                                                        "outlettype": [ "" ]
                                                                                    }
                                                                                },
                                                                                {
                                                                                    "box": {
                                                                                        "maxclass": "newobj",
                                                                                        "text": "history",
                                                                                        "patching_rect": [ 63.5, 322.0, 47.0, 23.0 ],
                                                                                        "fontname": "Lato",
                                                                                        "numinlets": 1,
                                                                                        "id": "obj-22",
                                                                                        "numoutlets": 1,
                                                                                        "fontsize": 12.0,
                                                                                        "outlettype": [ "" ]
                                                                                    }
                                                                                },
                                                                                {
                                                                                    "box": {
                                                                                        "maxclass": "newobj",
                                                                                        "text": "in 5 @comment b1 @default 0.2",
                                                                                        "patching_rect": [ 77.0, 396.0, 179.0, 23.0 ],
                                                                                        "fontname": "Lato",
                                                                                        "numinlets": 0,
                                                                                        "id": "obj-23",
                                                                                        "numoutlets": 1,
                                                                                        "fontsize": 12.0,
                                                                                        "outlettype": [ "" ]
                                                                                    }
                                                                                },
                                                                                {
                                                                                    "box": {
                                                                                        "maxclass": "newobj",
                                                                                        "text": "*",
                                                                                        "patching_rect": [ 275.0, 257.0, 32.5, 23.0 ],
                                                                                        "fontname": "Lato",
                                                                                        "numinlets": 2,
                                                                                        "id": "obj-15",
                                                                                        "numoutlets": 1,
                                                                                        "fontsize": 12.0,
                                                                                        "outlettype": [ "" ]
                                                                                    }
                                                                                },
                                                                                {
                                                                                    "box": {
                                                                                        "maxclass": "newobj",
                                                                                        "text": "history",
                                                                                        "patching_rect": [ 275.0, 135.0, 47.0, 23.0 ],
                                                                                        "fontname": "Lato",
                                                                                        "numinlets": 1,
                                                                                        "id": "obj-16",
                                                                                        "numoutlets": 1,
                                                                                        "fontsize": 12.0,
                                                                                        "outlettype": [ "" ]
                                                                                    }
                                                                                },
                                                                                {
                                                                                    "box": {
                                                                                        "maxclass": "newobj",
                                                                                        "text": "in 4 @comment a2 @default 0.1",
                                                                                        "patching_rect": [ 288.5, 227.0, 179.0, 23.0 ],
                                                                                        "fontname": "Lato",
                                                                                        "numinlets": 0,
                                                                                        "id": "obj-17",
                                                                                        "numoutlets": 1,
                                                                                        "fontsize": 12.0,
                                                                                        "outlettype": [ "" ]
                                                                                    }
                                                                                },
                                                                                {
                                                                                    "box": {
                                                                                        "maxclass": "newobj",
                                                                                        "text": "*",
                                                                                        "patching_rect": [ 170.0, 257.0, 32.5, 23.0 ],
                                                                                        "fontname": "Lato",
                                                                                        "numinlets": 2,
                                                                                        "id": "obj-14",
                                                                                        "numoutlets": 1,
                                                                                        "fontsize": 12.0,
                                                                                        "outlettype": [ "" ]
                                                                                    }
                                                                                },
                                                                                {
                                                                                    "box": {
                                                                                        "maxclass": "newobj",
                                                                                        "text": "history",
                                                                                        "patching_rect": [ 170.0, 100.0, 47.0, 23.0 ],
                                                                                        "fontname": "Lato",
                                                                                        "numinlets": 1,
                                                                                        "id": "obj-13",
                                                                                        "numoutlets": 1,
                                                                                        "fontsize": 12.0,
                                                                                        "outlettype": [ "" ]
                                                                                    }
                                                                                },
                                                                                {
                                                                                    "box": {
                                                                                        "maxclass": "newobj",
                                                                                        "text": "-",
                                                                                        "patching_rect": [ 50.0, 511.0, 32.5, 23.0 ],
                                                                                        "fontname": "Lato",
                                                                                        "numinlets": 2,
                                                                                        "id": "obj-11",
                                                                                        "numoutlets": 1,
                                                                                        "fontsize": 12.0,
                                                                                        "outlettype": [ "" ]
                                                                                    }
                                                                                },
                                                                                {
                                                                                    "box": {
                                                                                        "maxclass": "newobj",
                                                                                        "text": "*",
                                                                                        "patching_rect": [ 50.0, 257.0, 32.5, 23.0 ],
                                                                                        "fontname": "Lato",
                                                                                        "numinlets": 2,
                                                                                        "id": "obj-10",
                                                                                        "numoutlets": 1,
                                                                                        "fontsize": 12.0,
                                                                                        "outlettype": [ "" ]
                                                                                    }
                                                                                },
                                                                                {
                                                                                    "box": {
                                                                                        "maxclass": "newobj",
                                                                                        "text": "in 3 @comment a1 @default 0.1",
                                                                                        "patching_rect": [ 183.5, 198.0, 179.0, 23.0 ],
                                                                                        "fontname": "Lato",
                                                                                        "numinlets": 0,
                                                                                        "id": "obj-4",
                                                                                        "numoutlets": 1,
                                                                                        "fontsize": 12.0,
                                                                                        "outlettype": [ "" ]
                                                                                    }
                                                                                },
                                                                                {
                                                                                    "box": {
                                                                                        "maxclass": "newobj",
                                                                                        "text": "in 2 @comment a0 @default 0.9",
                                                                                        "patching_rect": [ 63.5, 163.0, 179.0, 23.0 ],
                                                                                        "fontname": "Lato",
                                                                                        "numinlets": 0,
                                                                                        "id": "obj-3",
                                                                                        "numoutlets": 1,
                                                                                        "fontsize": 12.0,
                                                                                        "outlettype": [ "" ]
                                                                                    }
                                                                                },
                                                                                {
                                                                                    "box": {
                                                                                        "maxclass": "newobj",
                                                                                        "text": "in 1",
                                                                                        "patching_rect": [ 50.0, 46.0, 30.0, 22.0 ],
                                                                                        "numinlets": 0,
                                                                                        "id": "obj-1",
                                                                                        "numoutlets": 1,
                                                                                        "outlettype": [ "" ]
                                                                                    }
                                                                                },
                                                                                {
                                                                                    "box": {
                                                                                        "maxclass": "newobj",
                                                                                        "text": "out 1",
                                                                                        "patching_rect": [ 50.0, 548.5, 38.0, 22.0 ],
                                                                                        "numinlets": 1,
                                                                                        "id": "obj-7",
                                                                                        "numoutlets": 0
                                                                                    }
                                                                                }
                                                                            ],
                                                                            "lines": [
                                                                                {
                                                                                    "patchline": {
                                                                                        "source": [ "obj-1", 0 ],
                                                                                        "destination": [ "obj-10", 0 ],
                                                                                        "order": 1
                                                                                    }
                                                                                },
                                                                                {
                                                                                    "patchline": {
                                                                                        "source": [ "obj-1", 0 ],
                                                                                        "destination": [ "obj-13", 0 ],
                                                                                        "order": 0
                                                                                    }
                                                                                },
                                                                                {
                                                                                    "patchline": {
                                                                                        "source": [ "obj-10", 0 ],
                                                                                        "destination": [ "obj-11", 0 ]
                                                                                    }
                                                                                },
                                                                                {
                                                                                    "patchline": {
                                                                                        "source": [ "obj-11", 0 ],
                                                                                        "destination": [ "obj-22", 0 ],
                                                                                        "midpoints": [ 59.5, 541.0, 281.5, 541.0, 281.5, 312.0, 73.0, 312.0 ],
                                                                                        "order": 0
                                                                                    }
                                                                                },
                                                                                {
                                                                                    "patchline": {
                                                                                        "source": [ "obj-11", 0 ],
                                                                                        "destination": [ "obj-7", 0 ],
                                                                                        "order": 1
                                                                                    }
                                                                                },
                                                                                {
                                                                                    "patchline": {
                                                                                        "source": [ "obj-13", 0 ],
                                                                                        "destination": [ "obj-14", 0 ],
                                                                                        "order": 1
                                                                                    }
                                                                                },
                                                                                {
                                                                                    "patchline": {
                                                                                        "source": [ "obj-13", 0 ],
                                                                                        "destination": [ "obj-16", 0 ],
                                                                                        "order": 0
                                                                                    }
                                                                                },
                                                                                {
                                                                                    "patchline": {
                                                                                        "source": [ "obj-14", 0 ],
                                                                                        "destination": [ "obj-11", 0 ],
                                                                                        "midpoints": [ 179.5, 293.5, 59.5, 293.5 ]
                                                                                    }
                                                                                },
                                                                                {
                                                                                    "patchline": {
                                                                                        "source": [ "obj-15", 0 ],
                                                                                        "destination": [ "obj-11", 0 ],
                                                                                        "midpoints": [ 284.5, 294.5, 59.5, 294.5 ]
                                                                                    }
                                                                                },
                                                                                {
                                                                                    "patchline": {
                                                                                        "source": [ "obj-16", 0 ],
                                                                                        "destination": [ "obj-15", 0 ]
                                                                                    }
                                                                                },
                                                                                {
                                                                                    "patchline": {
                                                                                        "source": [ "obj-17", 0 ],
                                                                                        "destination": [ "obj-15", 1 ]
                                                                                    }
                                                                                },
                                                                                {
                                                                                    "patchline": {
                                                                                        "source": [ "obj-18", 0 ],
                                                                                        "destination": [ "obj-11", 1 ],
                                                                                        "midpoints": [ 178.0, 498.0, 73.0, 498.0 ]
                                                                                    }
                                                                                },
                                                                                {
                                                                                    "patchline": {
                                                                                        "source": [ "obj-19", 0 ],
                                                                                        "destination": [ "obj-18", 0 ]
                                                                                    }
                                                                                },
                                                                                {
                                                                                    "patchline": {
                                                                                        "source": [ "obj-20", 0 ],
                                                                                        "destination": [ "obj-18", 1 ]
                                                                                    }
                                                                                },
                                                                                {
                                                                                    "patchline": {
                                                                                        "source": [ "obj-21", 0 ],
                                                                                        "destination": [ "obj-11", 1 ],
                                                                                        "midpoints": [ 73.0, 498.5, 73.0, 498.5 ]
                                                                                    }
                                                                                },
                                                                                {
                                                                                    "patchline": {
                                                                                        "source": [ "obj-22", 0 ],
                                                                                        "destination": [ "obj-19", 0 ],
                                                                                        "order": 0
                                                                                    }
                                                                                },
                                                                                {
                                                                                    "patchline": {
                                                                                        "source": [ "obj-22", 0 ],
                                                                                        "destination": [ "obj-21", 0 ],
                                                                                        "order": 1
                                                                                    }
                                                                                },
                                                                                {
                                                                                    "patchline": {
                                                                                        "source": [ "obj-23", 0 ],
                                                                                        "destination": [ "obj-21", 1 ]
                                                                                    }
                                                                                },
                                                                                {
                                                                                    "patchline": {
                                                                                        "source": [ "obj-3", 0 ],
                                                                                        "destination": [ "obj-10", 1 ]
                                                                                    }
                                                                                },
                                                                                {
                                                                                    "patchline": {
                                                                                        "source": [ "obj-4", 0 ],
                                                                                        "destination": [ "obj-14", 1 ]
                                                                                    }
                                                                                }
                                                                            ],
                                                                            "editing_bgcolor": [ 0.9, 0.9, 0.9, 1.0 ]
                                                                        }
                                                                    }
                                                                },
                                                                {
                                                                    "box": {
                                                                        "maxclass": "newobj",
                                                                        "text": "out 1 @comment \"filtered signal\"",
                                                                        "patching_rect": [ 9.0, 665.0, 190.0, 23.0 ],
                                                                        "fontname": "Lato",
                                                                        "numinlets": 1,
                                                                        "id": "obj-12",
                                                                        "numoutlets": 0,
                                                                        "fontsize": 12.0
                                                                    }
                                                                },
                                                                {
                                                                    "box": {
                                                                        "maxclass": "newobj",
                                                                        "text": "in 1 @comment \"input signal\"",
                                                                        "linecount": 2,
                                                                        "patching_rect": [ 9.0, 9.0, 98.0, 37.0 ],
                                                                        "fontname": "Lato",
                                                                        "numinlets": 0,
                                                                        "id": "obj-9",
                                                                        "numoutlets": 1,
                                                                        "fontsize": 12.0,
                                                                        "outlettype": [ "" ]
                                                                    }
                                                                }
                                                            ],
                                                            "lines": [
                                                                {
                                                                    "patchline": {
                                                                        "source": [ "obj-10", 0 ],
                                                                        "destination": [ "obj-30", 0 ]
                                                                    }
                                                                },
                                                                {
                                                                    "patchline": {
                                                                        "source": [ "obj-13", 0 ],
                                                                        "destination": [ "obj-30", 1 ]
                                                                    }
                                                                },
                                                                {
                                                                    "patchline": {
                                                                        "source": [ "obj-30", 4 ],
                                                                        "destination": [ "obj-8", 5 ]
                                                                    }
                                                                },
                                                                {
                                                                    "patchline": {
                                                                        "source": [ "obj-30", 3 ],
                                                                        "destination": [ "obj-8", 4 ]
                                                                    }
                                                                },
                                                                {
                                                                    "patchline": {
                                                                        "source": [ "obj-30", 2 ],
                                                                        "destination": [ "obj-8", 3 ]
                                                                    }
                                                                },
                                                                {
                                                                    "patchline": {
                                                                        "source": [ "obj-30", 1 ],
                                                                        "destination": [ "obj-8", 2 ]
                                                                    }
                                                                },
                                                                {
                                                                    "patchline": {
                                                                        "source": [ "obj-30", 0 ],
                                                                        "destination": [ "obj-8", 1 ]
                                                                    }
                                                                },
                                                                {
                                                                    "patchline": {
                                                                        "source": [ "obj-8", 0 ],
                                                                        "destination": [ "obj-12", 0 ]
                                                                    }
                                                                },
                                                                {
                                                                    "patchline": {
                                                                        "source": [ "obj-9", 0 ],
                                                                        "destination": [ "obj-8", 0 ]
                                                                    }
                                                                }
                                                            ],
                                                            "bgcolor": [ 0.9, 0.9, 0.9, 0.9 ],
                                                            "editing_bgcolor": [ 0.9, 0.9, 0.9, 1.0 ]
                                                        }
                                                    }
                                                },
                                                {
                                                    "box": {
                                                        "maxclass": "newobj",
                                                        "text": "gen @title lowpass",
                                                        "patching_rect": [ 216.0, 383.0, 107.0, 23.0 ],
                                                        "fontname": "Lato",
                                                        "numinlets": 3,
                                                        "id": "obj-46",
                                                        "numoutlets": 1,
                                                        "fontsize": 12.0,
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
                                                            "classnamespace": "dsp.gen",
                                                            "rect": [ 540.0, 100.0, 642.0, 705.0 ],
                                                            "default_fontname": "Lato",
                                                            "integercoordinates": 1,
                                                            "boxes": [
                                                                {
                                                                    "box": {
                                                                        "maxclass": "codebox",
                                                                        "patching_rect": [ 123.72998, 118.0, 480.0, 504.0 ],
                                                                        "fontname": "<Monospaced>",
                                                                        "fontface": 0,
                                                                        "numinlets": 2,
                                                                        "id": "obj-30",
                                                                        "numoutlets": 5,
                                                                        "fontsize": 12.0,
                                                                        "outlettype": [ "", "", "", "", "" ],
                                                                        "code": "cf = in1;\r\nQ = in2;\r\n\r\nomega = cf * twopi/samplerate;\r\nomega = isnan(omega) ? 0.1 : omega;\nsn = sin(omega);\ncs = cos(omega);\nigain = 1.0/gain; \r\none_over_Q = 1./Q;\r\none_over_Q = isnan(one_over_Q) ? 2 : one_over_Q;\nalpha = sn * 0.5 * one_over_Q;\r\n\r\nb0 = 1./(1. + alpha);\r\na2 = ((1 - cs) * 0.5) * b0;\r\na0 = a2;\na1 = (1. - cs) * b0;\nb1 = (-2. * cs) * b0;\nb2 = (1. - alpha) * b0;\n\r\nout1 = a0;\r\nout2 = a1;\r\nout3 = a2;\r\nout4 = b1;\r\nout5 = b2;"
                                                                    }
                                                                },
                                                                {
                                                                    "box": {
                                                                        "maxclass": "newobj",
                                                                        "text": "in 3 @comment Q @default 0.5 @min 0.000001",
                                                                        "patching_rect": [ 217.22998, 64.0, 262.0, 23.0 ],
                                                                        "numinlets": 0,
                                                                        "id": "obj-13",
                                                                        "numoutlets": 1,
                                                                        "outlettype": [ "" ]
                                                                    }
                                                                },
                                                                {
                                                                    "box": {
                                                                        "maxclass": "newobj",
                                                                        "text": "in 2 @comment frequency @default 440 @min 0",
                                                                        "patching_rect": [ 123.72998, 9.0, 265.0, 23.0 ],
                                                                        "numinlets": 0,
                                                                        "id": "obj-10",
                                                                        "numoutlets": 1,
                                                                        "outlettype": [ "" ]
                                                                    }
                                                                },
                                                                {
                                                                    "box": {
                                                                        "maxclass": "newobj",
                                                                        "text": "gen @title biquad",
                                                                        "patching_rect": [ 9.0, 635.0, 594.599976, 23.0 ],
                                                                        "numinlets": 6,
                                                                        "id": "obj-8",
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
                                                                            "classnamespace": "dsp.gen",
                                                                            "rect": [ 106.0, 129.0, 543.0, 636.0 ],
                                                                            "integercoordinates": 1,
                                                                            "boxes": [
                                                                                {
                                                                                    "box": {
                                                                                        "maxclass": "comment",
                                                                                        "text": "Direct form of a two-pole, two-zero filter",
                                                                                        "patching_rect": [ 90.5, 46.0, 264.0, 21.0 ],
                                                                                        "fontname": "Lato",
                                                                                        "numinlets": 1,
                                                                                        "id": "obj-2",
                                                                                        "numoutlets": 0,
                                                                                        "fontsize": 12.0
                                                                                    }
                                                                                },
                                                                                {
                                                                                    "box": {
                                                                                        "maxclass": "comment",
                                                                                        "text": "x2",
                                                                                        "patching_rect": [ 325.5, 138.0, 30.0, 20.0 ],
                                                                                        "numinlets": 1,
                                                                                        "id": "obj-12",
                                                                                        "numoutlets": 0
                                                                                    }
                                                                                },
                                                                                {
                                                                                    "box": {
                                                                                        "maxclass": "comment",
                                                                                        "text": "x1",
                                                                                        "patching_rect": [ 220.0, 100.0, 30.0, 20.0 ],
                                                                                        "numinlets": 1,
                                                                                        "id": "obj-24",
                                                                                        "numoutlets": 0
                                                                                    }
                                                                                },
                                                                                {
                                                                                    "box": {
                                                                                        "maxclass": "comment",
                                                                                        "text": "y2",
                                                                                        "patching_rect": [ 220.0, 360.0, 30.0, 20.0 ],
                                                                                        "numinlets": 1,
                                                                                        "id": "obj-9",
                                                                                        "numoutlets": 0
                                                                                    }
                                                                                },
                                                                                {
                                                                                    "box": {
                                                                                        "maxclass": "comment",
                                                                                        "text": "y1",
                                                                                        "patching_rect": [ 114.5, 322.0, 30.0, 20.0 ],
                                                                                        "numinlets": 1,
                                                                                        "id": "obj-8",
                                                                                        "numoutlets": 0
                                                                                    }
                                                                                },
                                                                                {
                                                                                    "box": {
                                                                                        "maxclass": "comment",
                                                                                        "text": "Previous output history",
                                                                                        "patching_rect": [ 292.0, 329.0, 140.0, 21.0 ],
                                                                                        "fontname": "Lato",
                                                                                        "numinlets": 1,
                                                                                        "id": "obj-6",
                                                                                        "numoutlets": 0,
                                                                                        "fontsize": 12.0
                                                                                    }
                                                                                },
                                                                                {
                                                                                    "box": {
                                                                                        "maxclass": "comment",
                                                                                        "text": "Previous input history",
                                                                                        "patching_rect": [ 282.0, 100.0, 140.0, 21.0 ],
                                                                                        "fontname": "Lato",
                                                                                        "numinlets": 1,
                                                                                        "id": "obj-5",
                                                                                        "numoutlets": 0,
                                                                                        "fontsize": 12.0
                                                                                    }
                                                                                },
                                                                                {
                                                                                    "box": {
                                                                                        "maxclass": "newobj",
                                                                                        "text": "*",
                                                                                        "patching_rect": [ 168.5, 466.0, 32.5, 23.0 ],
                                                                                        "fontname": "Lato",
                                                                                        "numinlets": 2,
                                                                                        "id": "obj-18",
                                                                                        "numoutlets": 1,
                                                                                        "fontsize": 12.0,
                                                                                        "outlettype": [ "" ]
                                                                                    }
                                                                                },
                                                                                {
                                                                                    "box": {
                                                                                        "maxclass": "newobj",
                                                                                        "text": "history",
                                                                                        "patching_rect": [ 168.5, 360.0, 47.0, 23.0 ],
                                                                                        "fontname": "Lato",
                                                                                        "numinlets": 1,
                                                                                        "id": "obj-19",
                                                                                        "numoutlets": 1,
                                                                                        "fontsize": 12.0,
                                                                                        "outlettype": [ "" ]
                                                                                    }
                                                                                },
                                                                                {
                                                                                    "box": {
                                                                                        "maxclass": "newobj",
                                                                                        "text": "in 6 @comment b2 @default 0.2",
                                                                                        "patching_rect": [ 182.0, 433.0, 179.0, 23.0 ],
                                                                                        "fontname": "Lato",
                                                                                        "numinlets": 0,
                                                                                        "id": "obj-20",
                                                                                        "numoutlets": 1,
                                                                                        "fontsize": 12.0,
                                                                                        "outlettype": [ "" ]
                                                                                    }
                                                                                },
                                                                                {
                                                                                    "box": {
                                                                                        "maxclass": "newobj",
                                                                                        "text": "*",
                                                                                        "patching_rect": [ 63.5, 466.0, 32.5, 23.0 ],
                                                                                        "fontname": "Lato",
                                                                                        "numinlets": 2,
                                                                                        "id": "obj-21",
                                                                                        "numoutlets": 1,
                                                                                        "fontsize": 12.0,
                                                                                        "outlettype": [ "" ]
                                                                                    }
                                                                                },
                                                                                {
                                                                                    "box": {
                                                                                        "maxclass": "newobj",
                                                                                        "text": "history",
                                                                                        "patching_rect": [ 63.5, 322.0, 47.0, 23.0 ],
                                                                                        "fontname": "Lato",
                                                                                        "numinlets": 1,
                                                                                        "id": "obj-22",
                                                                                        "numoutlets": 1,
                                                                                        "fontsize": 12.0,
                                                                                        "outlettype": [ "" ]
                                                                                    }
                                                                                },
                                                                                {
                                                                                    "box": {
                                                                                        "maxclass": "newobj",
                                                                                        "text": "in 5 @comment b1 @default 0.2",
                                                                                        "patching_rect": [ 77.0, 396.0, 179.0, 23.0 ],
                                                                                        "fontname": "Lato",
                                                                                        "numinlets": 0,
                                                                                        "id": "obj-23",
                                                                                        "numoutlets": 1,
                                                                                        "fontsize": 12.0,
                                                                                        "outlettype": [ "" ]
                                                                                    }
                                                                                },
                                                                                {
                                                                                    "box": {
                                                                                        "maxclass": "newobj",
                                                                                        "text": "*",
                                                                                        "patching_rect": [ 275.0, 257.0, 32.5, 23.0 ],
                                                                                        "fontname": "Lato",
                                                                                        "numinlets": 2,
                                                                                        "id": "obj-15",
                                                                                        "numoutlets": 1,
                                                                                        "fontsize": 12.0,
                                                                                        "outlettype": [ "" ]
                                                                                    }
                                                                                },
                                                                                {
                                                                                    "box": {
                                                                                        "maxclass": "newobj",
                                                                                        "text": "history",
                                                                                        "patching_rect": [ 275.0, 135.0, 47.0, 23.0 ],
                                                                                        "fontname": "Lato",
                                                                                        "numinlets": 1,
                                                                                        "id": "obj-16",
                                                                                        "numoutlets": 1,
                                                                                        "fontsize": 12.0,
                                                                                        "outlettype": [ "" ]
                                                                                    }
                                                                                },
                                                                                {
                                                                                    "box": {
                                                                                        "maxclass": "newobj",
                                                                                        "text": "in 4 @comment a2 @default 0.1",
                                                                                        "patching_rect": [ 288.5, 227.0, 179.0, 23.0 ],
                                                                                        "fontname": "Lato",
                                                                                        "numinlets": 0,
                                                                                        "id": "obj-17",
                                                                                        "numoutlets": 1,
                                                                                        "fontsize": 12.0,
                                                                                        "outlettype": [ "" ]
                                                                                    }
                                                                                },
                                                                                {
                                                                                    "box": {
                                                                                        "maxclass": "newobj",
                                                                                        "text": "*",
                                                                                        "patching_rect": [ 170.0, 257.0, 32.5, 23.0 ],
                                                                                        "fontname": "Lato",
                                                                                        "numinlets": 2,
                                                                                        "id": "obj-14",
                                                                                        "numoutlets": 1,
                                                                                        "fontsize": 12.0,
                                                                                        "outlettype": [ "" ]
                                                                                    }
                                                                                },
                                                                                {
                                                                                    "box": {
                                                                                        "maxclass": "newobj",
                                                                                        "text": "history",
                                                                                        "patching_rect": [ 170.0, 100.0, 47.0, 23.0 ],
                                                                                        "fontname": "Lato",
                                                                                        "numinlets": 1,
                                                                                        "id": "obj-13",
                                                                                        "numoutlets": 1,
                                                                                        "fontsize": 12.0,
                                                                                        "outlettype": [ "" ]
                                                                                    }
                                                                                },
                                                                                {
                                                                                    "box": {
                                                                                        "maxclass": "newobj",
                                                                                        "text": "-",
                                                                                        "patching_rect": [ 50.0, 511.0, 32.5, 23.0 ],
                                                                                        "fontname": "Lato",
                                                                                        "numinlets": 2,
                                                                                        "id": "obj-11",
                                                                                        "numoutlets": 1,
                                                                                        "fontsize": 12.0,
                                                                                        "outlettype": [ "" ]
                                                                                    }
                                                                                },
                                                                                {
                                                                                    "box": {
                                                                                        "maxclass": "newobj",
                                                                                        "text": "*",
                                                                                        "patching_rect": [ 50.0, 257.0, 32.5, 23.0 ],
                                                                                        "fontname": "Lato",
                                                                                        "numinlets": 2,
                                                                                        "id": "obj-10",
                                                                                        "numoutlets": 1,
                                                                                        "fontsize": 12.0,
                                                                                        "outlettype": [ "" ]
                                                                                    }
                                                                                },
                                                                                {
                                                                                    "box": {
                                                                                        "maxclass": "newobj",
                                                                                        "text": "in 3 @comment a1 @default 0.1",
                                                                                        "patching_rect": [ 183.5, 198.0, 179.0, 23.0 ],
                                                                                        "fontname": "Lato",
                                                                                        "numinlets": 0,
                                                                                        "id": "obj-4",
                                                                                        "numoutlets": 1,
                                                                                        "fontsize": 12.0,
                                                                                        "outlettype": [ "" ]
                                                                                    }
                                                                                },
                                                                                {
                                                                                    "box": {
                                                                                        "maxclass": "newobj",
                                                                                        "text": "in 2 @comment a0 @default 0.9",
                                                                                        "patching_rect": [ 63.5, 163.0, 179.0, 23.0 ],
                                                                                        "fontname": "Lato",
                                                                                        "numinlets": 0,
                                                                                        "id": "obj-3",
                                                                                        "numoutlets": 1,
                                                                                        "fontsize": 12.0,
                                                                                        "outlettype": [ "" ]
                                                                                    }
                                                                                },
                                                                                {
                                                                                    "box": {
                                                                                        "maxclass": "newobj",
                                                                                        "text": "in 1",
                                                                                        "patching_rect": [ 50.0, 46.0, 30.0, 22.0 ],
                                                                                        "numinlets": 0,
                                                                                        "id": "obj-1",
                                                                                        "numoutlets": 1,
                                                                                        "outlettype": [ "" ]
                                                                                    }
                                                                                },
                                                                                {
                                                                                    "box": {
                                                                                        "maxclass": "newobj",
                                                                                        "text": "out 1",
                                                                                        "patching_rect": [ 50.0, 548.5, 38.0, 22.0 ],
                                                                                        "numinlets": 1,
                                                                                        "id": "obj-7",
                                                                                        "numoutlets": 0
                                                                                    }
                                                                                }
                                                                            ],
                                                                            "lines": [
                                                                                {
                                                                                    "patchline": {
                                                                                        "source": [ "obj-4", 0 ],
                                                                                        "destination": [ "obj-14", 1 ]
                                                                                    }
                                                                                },
                                                                                {
                                                                                    "patchline": {
                                                                                        "source": [ "obj-3", 0 ],
                                                                                        "destination": [ "obj-10", 1 ]
                                                                                    }
                                                                                },
                                                                                {
                                                                                    "patchline": {
                                                                                        "source": [ "obj-23", 0 ],
                                                                                        "destination": [ "obj-21", 1 ]
                                                                                    }
                                                                                },
                                                                                {
                                                                                    "patchline": {
                                                                                        "source": [ "obj-22", 0 ],
                                                                                        "destination": [ "obj-21", 0 ],
                                                                                        "order": 1
                                                                                    }
                                                                                },
                                                                                {
                                                                                    "patchline": {
                                                                                        "source": [ "obj-22", 0 ],
                                                                                        "destination": [ "obj-19", 0 ],
                                                                                        "order": 0
                                                                                    }
                                                                                },
                                                                                {
                                                                                    "patchline": {
                                                                                        "source": [ "obj-21", 0 ],
                                                                                        "destination": [ "obj-11", 1 ],
                                                                                        "midpoints": [ 73.0, 498.5, 73.0, 498.5 ]
                                                                                    }
                                                                                },
                                                                                {
                                                                                    "patchline": {
                                                                                        "source": [ "obj-20", 0 ],
                                                                                        "destination": [ "obj-18", 1 ]
                                                                                    }
                                                                                },
                                                                                {
                                                                                    "patchline": {
                                                                                        "source": [ "obj-19", 0 ],
                                                                                        "destination": [ "obj-18", 0 ]
                                                                                    }
                                                                                },
                                                                                {
                                                                                    "patchline": {
                                                                                        "source": [ "obj-18", 0 ],
                                                                                        "destination": [ "obj-11", 1 ],
                                                                                        "midpoints": [ 178.0, 498.0, 73.0, 498.0 ]
                                                                                    }
                                                                                },
                                                                                {
                                                                                    "patchline": {
                                                                                        "source": [ "obj-17", 0 ],
                                                                                        "destination": [ "obj-15", 1 ]
                                                                                    }
                                                                                },
                                                                                {
                                                                                    "patchline": {
                                                                                        "source": [ "obj-16", 0 ],
                                                                                        "destination": [ "obj-15", 0 ]
                                                                                    }
                                                                                },
                                                                                {
                                                                                    "patchline": {
                                                                                        "source": [ "obj-15", 0 ],
                                                                                        "destination": [ "obj-11", 0 ],
                                                                                        "midpoints": [ 284.5, 294.5, 59.5, 294.5 ]
                                                                                    }
                                                                                },
                                                                                {
                                                                                    "patchline": {
                                                                                        "source": [ "obj-14", 0 ],
                                                                                        "destination": [ "obj-11", 0 ],
                                                                                        "midpoints": [ 179.5, 293.5, 59.5, 293.5 ]
                                                                                    }
                                                                                },
                                                                                {
                                                                                    "patchline": {
                                                                                        "source": [ "obj-13", 0 ],
                                                                                        "destination": [ "obj-16", 0 ],
                                                                                        "order": 0
                                                                                    }
                                                                                },
                                                                                {
                                                                                    "patchline": {
                                                                                        "source": [ "obj-13", 0 ],
                                                                                        "destination": [ "obj-14", 0 ],
                                                                                        "order": 1
                                                                                    }
                                                                                },
                                                                                {
                                                                                    "patchline": {
                                                                                        "source": [ "obj-11", 0 ],
                                                                                        "destination": [ "obj-7", 0 ],
                                                                                        "order": 1
                                                                                    }
                                                                                },
                                                                                {
                                                                                    "patchline": {
                                                                                        "source": [ "obj-11", 0 ],
                                                                                        "destination": [ "obj-22", 0 ],
                                                                                        "midpoints": [ 59.5, 541.0, 281.5, 541.0, 281.5, 312.0, 73.0, 312.0 ],
                                                                                        "order": 0
                                                                                    }
                                                                                },
                                                                                {
                                                                                    "patchline": {
                                                                                        "source": [ "obj-10", 0 ],
                                                                                        "destination": [ "obj-11", 0 ]
                                                                                    }
                                                                                },
                                                                                {
                                                                                    "patchline": {
                                                                                        "source": [ "obj-1", 0 ],
                                                                                        "destination": [ "obj-13", 0 ],
                                                                                        "order": 0
                                                                                    }
                                                                                },
                                                                                {
                                                                                    "patchline": {
                                                                                        "source": [ "obj-1", 0 ],
                                                                                        "destination": [ "obj-10", 0 ],
                                                                                        "order": 1
                                                                                    }
                                                                                }
                                                                            ],
                                                                            "editing_bgcolor": [ 0.9, 0.9, 0.9, 1.0 ]
                                                                        }
                                                                    }
                                                                },
                                                                {
                                                                    "box": {
                                                                        "maxclass": "newobj",
                                                                        "text": "out 1 @comment \"filtered signal\"",
                                                                        "patching_rect": [ 9.0, 665.0, 190.0, 23.0 ],
                                                                        "fontname": "Lato",
                                                                        "numinlets": 1,
                                                                        "id": "obj-12",
                                                                        "numoutlets": 0,
                                                                        "fontsize": 12.0
                                                                    }
                                                                },
                                                                {
                                                                    "box": {
                                                                        "maxclass": "newobj",
                                                                        "text": "in 1 @comment \"input signal\"",
                                                                        "linecount": 2,
                                                                        "patching_rect": [ 9.0, 9.0, 98.0, 37.0 ],
                                                                        "fontname": "Lato",
                                                                        "numinlets": 0,
                                                                        "id": "obj-9",
                                                                        "numoutlets": 1,
                                                                        "fontsize": 12.0,
                                                                        "outlettype": [ "" ]
                                                                    }
                                                                }
                                                            ],
                                                            "lines": [
                                                                {
                                                                    "patchline": {
                                                                        "source": [ "obj-9", 0 ],
                                                                        "destination": [ "obj-8", 0 ]
                                                                    }
                                                                },
                                                                {
                                                                    "patchline": {
                                                                        "source": [ "obj-8", 0 ],
                                                                        "destination": [ "obj-12", 0 ]
                                                                    }
                                                                },
                                                                {
                                                                    "patchline": {
                                                                        "source": [ "obj-30", 0 ],
                                                                        "destination": [ "obj-8", 1 ]
                                                                    }
                                                                },
                                                                {
                                                                    "patchline": {
                                                                        "source": [ "obj-30", 1 ],
                                                                        "destination": [ "obj-8", 2 ]
                                                                    }
                                                                },
                                                                {
                                                                    "patchline": {
                                                                        "source": [ "obj-30", 2 ],
                                                                        "destination": [ "obj-8", 3 ]
                                                                    }
                                                                },
                                                                {
                                                                    "patchline": {
                                                                        "source": [ "obj-30", 3 ],
                                                                        "destination": [ "obj-8", 4 ]
                                                                    }
                                                                },
                                                                {
                                                                    "patchline": {
                                                                        "source": [ "obj-30", 4 ],
                                                                        "destination": [ "obj-8", 5 ]
                                                                    }
                                                                },
                                                                {
                                                                    "patchline": {
                                                                        "source": [ "obj-13", 0 ],
                                                                        "destination": [ "obj-30", 1 ]
                                                                    }
                                                                },
                                                                {
                                                                    "patchline": {
                                                                        "source": [ "obj-10", 0 ],
                                                                        "destination": [ "obj-30", 0 ]
                                                                    }
                                                                }
                                                            ],
                                                            "bgcolor": [ 0.9, 0.9, 0.9, 0.9 ],
                                                            "editing_bgcolor": [ 0.9, 0.9, 0.9, 1.0 ]
                                                        }
                                                    }
                                                },
                                                {
                                                    "box": {
                                                        "maxclass": "newobj",
                                                        "text": "+",
                                                        "patching_rect": [ 50.0, 232.0, 29.5, 22.0 ],
                                                        "numinlets": 2,
                                                        "id": "obj-16",
                                                        "numoutlets": 1,
                                                        "outlettype": [ "" ]
                                                    }
                                                },
                                                {
                                                    "box": {
                                                        "maxclass": "newobj",
                                                        "text": "*",
                                                        "patching_rect": [ 176.0, 504.0, 29.5, 22.0 ],
                                                        "numinlets": 2,
                                                        "id": "obj-15",
                                                        "numoutlets": 1,
                                                        "outlettype": [ "" ]
                                                    }
                                                },
                                                {
                                                    "box": {
                                                        "maxclass": "newobj",
                                                        "text": "history",
                                                        "patching_rect": [ 216.0, 346.0, 44.0, 22.0 ],
                                                        "numinlets": 1,
                                                        "id": "obj-13",
                                                        "numoutlets": 1,
                                                        "outlettype": [ "" ]
                                                    }
                                                },
                                                {
                                                    "box": {
                                                        "maxclass": "newobj",
                                                        "text": "/",
                                                        "patching_rect": [ 50.0, 110.0, 29.5, 22.0 ],
                                                        "numinlets": 2,
                                                        "id": "obj-11",
                                                        "numoutlets": 1,
                                                        "outlettype": [ "" ]
                                                    }
                                                },
                                                {
                                                    "box": {
                                                        "maxclass": "newobj",
                                                        "text": "* PI",
                                                        "patching_rect": [ 50.0, 145.0, 28.0, 22.0 ],
                                                        "numinlets": 1,
                                                        "id": "obj-9",
                                                        "numoutlets": 1,
                                                        "outlettype": [ "" ]
                                                    }
                                                },
                                                {
                                                    "box": {
                                                        "maxclass": "newobj",
                                                        "text": "/ 2",
                                                        "patching_rect": [ 152.0, 51.0, 22.0, 22.0 ],
                                                        "numinlets": 1,
                                                        "id": "obj-8",
                                                        "numoutlets": 1,
                                                        "outlettype": [ "" ]
                                                    }
                                                },
                                                {
                                                    "box": {
                                                        "maxclass": "newobj",
                                                        "text": "samplerate",
                                                        "patching_rect": [ 152.0, 14.0, 68.0, 22.0 ],
                                                        "numinlets": 0,
                                                        "id": "obj-7",
                                                        "numoutlets": 1,
                                                        "outlettype": [ "" ]
                                                    }
                                                },
                                                {
                                                    "box": {
                                                        "maxclass": "newobj",
                                                        "text": "accum",
                                                        "patching_rect": [ 50.0, 182.0, 44.0, 22.0 ],
                                                        "numinlets": 2,
                                                        "id": "obj-6",
                                                        "numoutlets": 1,
                                                        "outlettype": [ "" ]
                                                    }
                                                },
                                                {
                                                    "box": {
                                                        "maxclass": "newobj",
                                                        "text": "sin",
                                                        "patching_rect": [ 50.0, 284.0, 24.0, 22.0 ],
                                                        "numinlets": 1,
                                                        "id": "obj-5",
                                                        "numoutlets": 1,
                                                        "outlettype": [ "" ]
                                                    }
                                                },
                                                {
                                                    "box": {
                                                        "maxclass": "newobj",
                                                        "text": "in 1",
                                                        "patching_rect": [ 50.0, 14.0, 28.0, 22.0 ],
                                                        "numinlets": 0,
                                                        "id": "obj-1",
                                                        "numoutlets": 1,
                                                        "outlettype": [ "" ]
                                                    }
                                                },
                                                {
                                                    "box": {
                                                        "maxclass": "newobj",
                                                        "text": "out 1",
                                                        "patching_rect": [ 50.0, 577.0, 38.0, 22.0 ],
                                                        "numinlets": 1,
                                                        "id": "obj-4",
                                                        "numoutlets": 0
                                                    }
                                                }
                                            ],
                                            "lines": [
                                                {
                                                    "patchline": {
                                                        "source": [ "obj-14", 0 ],
                                                        "destination": [ "obj-4", 0 ]
                                                    }
                                                },
                                                {
                                                    "patchline": {
                                                        "source": [ "obj-12", 0 ],
                                                        "destination": [ "obj-14", 0 ]
                                                    }
                                                },
                                                {
                                                    "patchline": {
                                                        "source": [ "obj-5", 0 ],
                                                        "destination": [ "obj-12", 0 ],
                                                        "order": 1
                                                    }
                                                },
                                                {
                                                    "patchline": {
                                                        "source": [ "obj-21", 0 ],
                                                        "destination": [ "obj-46", 1 ],
                                                        "order": 1
                                                    }
                                                },
                                                {
                                                    "patchline": {
                                                        "source": [ "obj-21", 0 ],
                                                        "destination": [ "obj-19", 1 ],
                                                        "order": 0
                                                    }
                                                },
                                                {
                                                    "patchline": {
                                                        "source": [ "obj-1", 0 ],
                                                        "destination": [ "obj-21", 0 ],
                                                        "order": 0
                                                    }
                                                },
                                                {
                                                    "patchline": {
                                                        "source": [ "obj-13", 0 ],
                                                        "destination": [ "obj-46", 0 ]
                                                    }
                                                },
                                                {
                                                    "patchline": {
                                                        "source": [ "obj-18", 0 ],
                                                        "destination": [ "obj-46", 2 ]
                                                    }
                                                },
                                                {
                                                    "patchline": {
                                                        "source": [ "obj-10", 0 ],
                                                        "destination": [ "obj-19", 2 ]
                                                    }
                                                },
                                                {
                                                    "patchline": {
                                                        "source": [ "obj-46", 0 ],
                                                        "destination": [ "obj-19", 0 ]
                                                    }
                                                },
                                                {
                                                    "patchline": {
                                                        "source": [ "obj-16", 0 ],
                                                        "destination": [ "obj-5", 0 ]
                                                    }
                                                },
                                                {
                                                    "patchline": {
                                                        "source": [ "obj-6", 0 ],
                                                        "destination": [ "obj-16", 0 ]
                                                    }
                                                },
                                                {
                                                    "patchline": {
                                                        "source": [ "obj-9", 0 ],
                                                        "destination": [ "obj-6", 0 ]
                                                    }
                                                },
                                                {
                                                    "patchline": {
                                                        "source": [ "obj-5", 0 ],
                                                        "destination": [ "obj-13", 0 ],
                                                        "order": 0
                                                    }
                                                },
                                                {
                                                    "patchline": {
                                                        "source": [ "obj-11", 0 ],
                                                        "destination": [ "obj-9", 0 ]
                                                    }
                                                },
                                                {
                                                    "patchline": {
                                                        "source": [ "obj-8", 0 ],
                                                        "destination": [ "obj-11", 1 ]
                                                    }
                                                },
                                                {
                                                    "patchline": {
                                                        "source": [ "obj-1", 0 ],
                                                        "destination": [ "obj-11", 0 ],
                                                        "order": 1
                                                    }
                                                },
                                                {
                                                    "patchline": {
                                                        "source": [ "obj-7", 0 ],
                                                        "destination": [ "obj-8", 0 ]
                                                    }
                                                },
                                                {
                                                    "patchline": {
                                                        "source": [ "obj-3", 0 ],
                                                        "destination": [ "obj-21", 1 ]
                                                    }
                                                },
                                                {
                                                    "patchline": {
                                                        "source": [ "obj-15", 0 ],
                                                        "destination": [ "obj-16", 1 ],
                                                        "midpoints": [ 185.5, 554.0, 128.75, 554.0, 128.75, 220.0, 70.0, 220.0 ]
                                                    }
                                                },
                                                {
                                                    "patchline": {
                                                        "source": [ "obj-19", 0 ],
                                                        "destination": [ "obj-15", 0 ]
                                                    }
                                                },
                                                {
                                                    "patchline": {
                                                        "source": [ "obj-2", 0 ],
                                                        "destination": [ "obj-15", 1 ]
                                                    }
                                                }
                                            ]
                                        }
                                    },
                                    "id": "obj-11",
                                    "maxclass": "newobj",
                                    "numinlets": 3,
                                    "numoutlets": 1,
                                    "outlettype": [ "signal" ],
                                    "patching_rect": [ 40.0, 269.0, 138.0, 23.0 ],
                                    "rnbo_classname": "gen~",
                                    "rnbo_extra_attributes": {
                                        "exposeparams": 0
                                    },
                                    "rnbo_serial": 1,
                                    "rnbo_uniqueid": "feedback-fm",
                                    "rnboinfo": {
                                        "needsInstanceInfo": 1,
                                        "argnames": {
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
                                                "type": "number"
                                            },
                                            "reset": {
                                                "attrOrProp": 1,
                                                "digest": "Reset all param and history objects to initial values",
                                                "isalias": 0,
                                                "aliases": [],
                                                "attachable": 1,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "type": "bang"
                                            },
                                            "expr": {
                                                "attrOrProp": 2,
                                                "digest": "a gen expression",
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
                                                "digest": "gendsp file to load",
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
                                            "title": {
                                                "attrOrProp": 2,
                                                "digest": "a title",
                                                "defaultarg": 1,
                                                "isalias": 0,
                                                "aliases": [ "t" ],
                                                "settable": 1,
                                                "attachable": 0,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "type": "symbol",
                                                "doNotShowInMaxInspector": 1
                                            },
                                            "t": {
                                                "attrOrProp": 2,
                                                "digest": "a title",
                                                "defaultarg": 1,
                                                "isalias": 1,
                                                "aliasOf": "title",
                                                "aliases": [],
                                                "settable": 1,
                                                "attachable": 0,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "type": "symbol"
                                            },
                                            "exposeparams": {
                                                "attrOrProp": 2,
                                                "digest": "Expose gen params as RNBO params.",
                                                "isalias": 0,
                                                "aliases": [],
                                                "settable": 1,
                                                "attachable": 0,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "type": "bool",
                                                "defaultValue": "false"
                                            }
                                        },
                                        "inputs": [
                                            {
                                                "name": "in1",
                                                "type": "auto",
                                                "digest": "in1",
                                                "hot": 1,
                                                "docked": 0
                                            },
                                            {
                                                "name": "in2",
                                                "type": "auto"
                                            },
                                            {
                                                "name": "in3",
                                                "type": "auto"
                                            }
                                        ],
                                        "outputs": [
                                            {
                                                "name": "out1",
                                                "type": "signal"
                                            }
                                        ],
                                        "helpname": "gen~",
                                        "aliasOf": "gen~",
                                        "classname": "gen~",
                                        "operator": 0,
                                        "versionId": 179904306,
                                        "changesPatcherIO": 0
                                    },
                                    "text": "gen~ @title feedback-fm",
                                    "varname": "feedback-fm"
                                }
                            },
                            {
                                "box": {
                                    "id": "obj-9",
                                    "linecount": 2,
                                    "maxclass": "newobj",
                                    "numinlets": 2,
                                    "numoutlets": 2,
                                    "outlettype": [ "", "" ],
                                    "patching_rect": [ 99.5, 136.0, 251.0, 37.0 ],
                                    "rnbo_classname": "param",
                                    "rnbo_extra_attributes": {
                                        "meta": "",
                                        "tonormalized": "",
                                        "ctlin": 0.0,
                                        "enum": "",
                                        "fromnormalized": "",
                                        "steps": 0.0,
                                        "unit": "",
                                        "order": "0",
                                        "displayorder": "-",
                                        "preset": 1,
                                        "displayname": "",
                                        "sendinit": 1,
                                        "exponent": 1.0
                                    },
                                    "rnbo_serial": 3,
                                    "rnbo_uniqueid": "overblow",
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
                                                "defaultValue": "1.5"
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
                                    "text": "param overblow @value 1.5 @min 0.1 @max 5",
                                    "varname": "overblow"
                                }
                            },
                            {
                                "box": {
                                    "id": "obj-6",
                                    "maxclass": "newobj",
                                    "numinlets": 2,
                                    "numoutlets": 2,
                                    "outlettype": [ "", "" ],
                                    "patching_rect": [ 224.5, 179.0, 254.0, 23.0 ],
                                    "rnbo_classname": "param",
                                    "rnbo_extra_attributes": {
                                        "meta": "",
                                        "tonormalized": "",
                                        "ctlin": 0.0,
                                        "enum": "",
                                        "fromnormalized": "",
                                        "steps": 0.0,
                                        "unit": "",
                                        "order": "0",
                                        "displayorder": "-",
                                        "preset": 1,
                                        "displayname": "",
                                        "sendinit": 1,
                                        "exponent": 1.0
                                    },
                                    "rnbo_serial": 4,
                                    "rnbo_uniqueid": "harmonics",
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
                                                "defaultValue": "3"
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
                                    "text": "param harmonics @value 3 @min 0.1 @max 10",
                                    "varname": "harmonics"
                                }
                            },
                            {
                                "box": {
                                    "id": "obj-5",
                                    "maxclass": "newobj",
                                    "numinlets": 1,
                                    "numoutlets": 0,
                                    "patching_rect": [ 170.0, 605.0, 43.0, 23.0 ],
                                    "rnbo_classname": "out~",
                                    "rnbo_extra_attributes": {
                                        "meta": "",
                                        "comment": ""
                                    },
                                    "rnbo_serial": 1,
                                    "rnbo_uniqueid": "out~_obj-5",
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
                                    "id": "obj-7",
                                    "maxclass": "newobj",
                                    "numinlets": 1,
                                    "numoutlets": 0,
                                    "patching_rect": [ 40.0, 605.0, 43.0, 23.0 ],
                                    "rnbo_classname": "out~",
                                    "rnbo_extra_attributes": {
                                        "meta": "",
                                        "comment": ""
                                    },
                                    "rnbo_serial": 2,
                                    "rnbo_uniqueid": "out~_obj-7",
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
                                    "color": [ 0.862745, 0.741176, 0.137255, 1.0 ],
                                    "id": "obj-3",
                                    "linecount": 2,
                                    "maxclass": "newobj",
                                    "numinlets": 1,
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
                                        "rect": [ 744.0, 392.0, 612.0, 312.0 ],
                                        "default_fontname": "Lato",
                                        "integercoordinates": 1,
                                        "title": "delay",
                                        "boxes": [
                                            {
                                                "box": {
                                                    "id": "obj-27",
                                                    "maxclass": "comment",
                                                    "numinlets": 1,
                                                    "numoutlets": 0,
                                                    "patching_rect": [ 20.0, 15.0, 111.0, 21.0 ],
                                                    "text": "Simple stereo delay"
                                                }
                                            },
                                            {
                                                "box": {
                                                    "id": "obj-23",
                                                    "maxclass": "newobj",
                                                    "numinlets": 2,
                                                    "numoutlets": 1,
                                                    "outlettype": [ "signal" ],
                                                    "patching_rect": [ 501.0, 167.958435, 40.0, 23.0 ],
                                                    "rnbo_classname": "*~",
                                                    "rnbo_serial": 1,
                                                    "rnbo_uniqueid": "*~_obj-23",
                                                    "text": "*~ 0.3"
                                                }
                                            },
                                            {
                                                "box": {
                                                    "id": "obj-21",
                                                    "maxclass": "newobj",
                                                    "numinlets": 2,
                                                    "numoutlets": 1,
                                                    "outlettype": [ "signal" ],
                                                    "patching_rect": [ 188.0, 152.0, 40.0, 23.0 ],
                                                    "rnbo_classname": "*~",
                                                    "rnbo_serial": 2,
                                                    "rnbo_uniqueid": "*~_obj-21",
                                                    "text": "*~ 0.3"
                                                }
                                            },
                                            {
                                                "box": {
                                                    "id": "obj-72",
                                                    "linecount": 2,
                                                    "maxclass": "newobj",
                                                    "numinlets": 2,
                                                    "numoutlets": 2,
                                                    "outlettype": [ "", "" ],
                                                    "patching_rect": [ 59.0, 75.91687000000002, 164.0, 37.0 ],
                                                    "rnbo_classname": "param",
                                                    "rnbo_extra_attributes": {
                                                        "meta": "",
                                                        "tonormalized": "",
                                                        "ctlin": 0.0,
                                                        "enum": "",
                                                        "fromnormalized": "",
                                                        "steps": 0.0,
                                                        "unit": "",
                                                        "order": "0",
                                                        "displayorder": "-",
                                                        "preset": 1,
                                                        "displayname": "",
                                                        "sendinit": 1,
                                                        "exponent": 1.0
                                                    },
                                                    "rnbo_serial": 1,
                                                    "rnbo_uniqueid": "left_delay",
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
                                                                "defaultValue": "300"
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
                                                    "text": "param left_delay @value 300 @min 10 @max 10000",
                                                    "varname": "left_delay"
                                                }
                                            },
                                            {
                                                "box": {
                                                    "id": "obj-70",
                                                    "linecount": 2,
                                                    "maxclass": "newobj",
                                                    "numinlets": 2,
                                                    "numoutlets": 2,
                                                    "outlettype": [ "", "" ],
                                                    "patching_rect": [ 282.0, 15.0, 133.0, 37.0 ],
                                                    "rnbo_classname": "param",
                                                    "rnbo_extra_attributes": {
                                                        "meta": "",
                                                        "tonormalized": "",
                                                        "ctlin": 0.0,
                                                        "enum": "",
                                                        "fromnormalized": "",
                                                        "steps": 0.0,
                                                        "unit": "",
                                                        "order": "0",
                                                        "displayorder": "-",
                                                        "preset": 1,
                                                        "displayname": "",
                                                        "sendinit": 1,
                                                        "exponent": 1.0
                                                    },
                                                    "rnbo_serial": 2,
                                                    "rnbo_uniqueid": "fb",
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
                                                                "defaultValue": "0.25"
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
                                                    "text": "param fb @value 0.25 @min 0 @max 1",
                                                    "varname": "fb"
                                                }
                                            },
                                            {
                                                "box": {
                                                    "id": "obj-69",
                                                    "linecount": 2,
                                                    "maxclass": "newobj",
                                                    "numinlets": 2,
                                                    "numoutlets": 2,
                                                    "outlettype": [ "", "" ],
                                                    "patching_rect": [ 358.0, 75.91687000000002, 174.43887400000006, 37.0 ],
                                                    "rnbo_classname": "param",
                                                    "rnbo_extra_attributes": {
                                                        "meta": "",
                                                        "tonormalized": "",
                                                        "ctlin": 0.0,
                                                        "enum": "",
                                                        "fromnormalized": "",
                                                        "steps": 0.0,
                                                        "unit": "",
                                                        "order": "0",
                                                        "displayorder": "-",
                                                        "preset": 1,
                                                        "displayname": "",
                                                        "sendinit": 1,
                                                        "exponent": 1.0
                                                    },
                                                    "rnbo_serial": 3,
                                                    "rnbo_uniqueid": "right_delay",
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
                                                                "defaultValue": "400"
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
                                                    "text": "param right_delay @value 400 @min 10 @max 10000",
                                                    "varname": "right_delay"
                                                }
                                            },
                                            {
                                                "box": {
                                                    "id": "obj-60",
                                                    "maxclass": "newobj",
                                                    "numinlets": 1,
                                                    "numoutlets": 1,
                                                    "outlettype": [ "" ],
                                                    "patching_rect": [ 358.0, 123.45843500000001, 68.0, 23.0 ],
                                                    "rnbo_classname": "mstosamps",
                                                    "rnbo_extra_attributes": {
                                                        "hot": 0
                                                    },
                                                    "rnbo_serial": 1,
                                                    "rnbo_uniqueid": "mstosamps_obj-60",
                                                    "text": "mstosamps"
                                                }
                                            },
                                            {
                                                "box": {
                                                    "id": "obj-56",
                                                    "maxclass": "newobj",
                                                    "numinlets": 1,
                                                    "numoutlets": 1,
                                                    "outlettype": [ "" ],
                                                    "patching_rect": [ 59.0, 133.87530500000003, 68.0, 23.0 ],
                                                    "rnbo_classname": "mstosamps",
                                                    "rnbo_extra_attributes": {
                                                        "hot": 0
                                                    },
                                                    "rnbo_serial": 2,
                                                    "rnbo_uniqueid": "mstosamps_obj-56",
                                                    "text": "mstosamps"
                                                }
                                            },
                                            {
                                                "box": {
                                                    "id": "obj-14",
                                                    "maxclass": "newobj",
                                                    "numinlets": 0,
                                                    "numoutlets": 1,
                                                    "outlettype": [ "signal" ],
                                                    "patching_rect": [ 501.0, 131.91687000000002, 35.0, 23.0 ],
                                                    "rnbo_classname": "in~",
                                                    "rnbo_extra_attributes": {
                                                        "meta": "",
                                                        "comment": ""
                                                    },
                                                    "rnbo_serial": 1,
                                                    "rnbo_uniqueid": "in~_obj-14",
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
                                                    "id": "obj-11",
                                                    "maxclass": "newobj",
                                                    "numinlets": 2,
                                                    "numoutlets": 1,
                                                    "outlettype": [ "signal" ],
                                                    "patching_rect": [ 358.0, 249.958435, 47.0, 23.0 ],
                                                    "rnbo_classname": "*~",
                                                    "rnbo_serial": 3,
                                                    "rnbo_uniqueid": "*~_obj-11",
                                                    "text": "*~ 0.25"
                                                }
                                            },
                                            {
                                                "box": {
                                                    "fontsize": 12.0,
                                                    "id": "obj-12",
                                                    "maxclass": "newobj",
                                                    "numinlets": 1,
                                                    "numoutlets": 1,
                                                    "outlettype": [ "signal" ],
                                                    "patching_rect": [ 499.0, 202.458435, 91.0, 23.0 ],
                                                    "rnbo_classname": "feedback~",
                                                    "rnbo_serial": 1,
                                                    "rnbo_uniqueid": "feedback~_obj-12",
                                                    "rnboinfo": {
                                                        "needsInstanceInfo": 1,
                                                        "argnames": {
                                                            "input": {
                                                                "attrOrProp": 1,
                                                                "digest": "Signal to feed back.",
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
                                                            "output": {
                                                                "attrOrProp": 1,
                                                                "digest": "Signal that was fed back (with one signal buffer delay).",
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
                                                            "reset": {
                                                                "attrOrProp": 1,
                                                                "digest": "Clears/resets the feedback buffer",
                                                                "isalias": 0,
                                                                "aliases": [],
                                                                "attachable": 1,
                                                                "isparam": 0,
                                                                "deprecated": 0,
                                                                "touched": 0,
                                                                "type": "bang"
                                                            }
                                                        },
                                                        "inputs": [
                                                            {
                                                                "name": "input",
                                                                "type": "signal",
                                                                "digest": "Signal to feed back.",
                                                                "hot": 1,
                                                                "docked": 0
                                                            }
                                                        ],
                                                        "outputs": [
                                                            {
                                                                "name": "output",
                                                                "type": "signal",
                                                                "digest": "Signal that was fed back (with one signal buffer delay).",
                                                                "docked": 0
                                                            }
                                                        ],
                                                        "helpname": "feedback~",
                                                        "aliasOf": "feedback~",
                                                        "classname": "feedback~",
                                                        "operator": 0,
                                                        "versionId": -1677864334,
                                                        "changesPatcherIO": 0
                                                    },
                                                    "text": "feedback~"
                                                }
                                            },
                                            {
                                                "box": {
                                                    "id": "obj-13",
                                                    "maxclass": "newobj",
                                                    "numinlets": 2,
                                                    "numoutlets": 1,
                                                    "outlettype": [ "signal" ],
                                                    "patching_rect": [ 358.0, 202.458435, 104.0, 23.0 ],
                                                    "rnbo_classname": "delay~",
                                                    "rnbo_extra_attributes": {
                                                        "ramp": 50.0,
                                                        "interp": "linear",
                                                        "maxdelayms": 0.0
                                                    },
                                                    "rnbo_serial": 1,
                                                    "rnbo_uniqueid": "delay~_obj-13",
                                                    "text": "delay~ samplerate"
                                                }
                                            },
                                            {
                                                "box": {
                                                    "id": "obj-8",
                                                    "maxclass": "newobj",
                                                    "numinlets": 1,
                                                    "numoutlets": 0,
                                                    "patching_rect": [ 499.0, 249.958435, 43.0, 23.0 ],
                                                    "rnbo_classname": "out~",
                                                    "rnbo_extra_attributes": {
                                                        "meta": "",
                                                        "comment": ""
                                                    },
                                                    "rnbo_serial": 1,
                                                    "rnbo_uniqueid": "out~_obj-8",
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
                                                    "id": "obj-6",
                                                    "maxclass": "newobj",
                                                    "numinlets": 2,
                                                    "numoutlets": 1,
                                                    "outlettype": [ "signal" ],
                                                    "patching_rect": [ 45.0, 249.0, 47.0, 23.0 ],
                                                    "rnbo_classname": "*~",
                                                    "rnbo_serial": 4,
                                                    "rnbo_uniqueid": "*~_obj-6",
                                                    "text": "*~ 0.25"
                                                }
                                            },
                                            {
                                                "box": {
                                                    "fontsize": 12.0,
                                                    "id": "obj-22",
                                                    "maxclass": "newobj",
                                                    "numinlets": 1,
                                                    "numoutlets": 1,
                                                    "outlettype": [ "signal" ],
                                                    "patching_rect": [ 186.0, 197.5, 91.0, 23.0 ],
                                                    "rnbo_classname": "feedback~",
                                                    "rnbo_serial": 2,
                                                    "rnbo_uniqueid": "feedback~_obj-22",
                                                    "rnboinfo": {
                                                        "needsInstanceInfo": 1,
                                                        "argnames": {
                                                            "input": {
                                                                "attrOrProp": 1,
                                                                "digest": "Signal to feed back.",
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
                                                            "output": {
                                                                "attrOrProp": 1,
                                                                "digest": "Signal that was fed back (with one signal buffer delay).",
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
                                                            "reset": {
                                                                "attrOrProp": 1,
                                                                "digest": "Clears/resets the feedback buffer",
                                                                "isalias": 0,
                                                                "aliases": [],
                                                                "attachable": 1,
                                                                "isparam": 0,
                                                                "deprecated": 0,
                                                                "touched": 0,
                                                                "type": "bang"
                                                            }
                                                        },
                                                        "inputs": [
                                                            {
                                                                "name": "input",
                                                                "type": "signal",
                                                                "digest": "Signal to feed back.",
                                                                "hot": 1,
                                                                "docked": 0
                                                            }
                                                        ],
                                                        "outputs": [
                                                            {
                                                                "name": "output",
                                                                "type": "signal",
                                                                "digest": "Signal that was fed back (with one signal buffer delay).",
                                                                "docked": 0
                                                            }
                                                        ],
                                                        "helpname": "feedback~",
                                                        "aliasOf": "feedback~",
                                                        "classname": "feedback~",
                                                        "operator": 0,
                                                        "versionId": -1677864334,
                                                        "changesPatcherIO": 0
                                                    },
                                                    "text": "feedback~"
                                                }
                                            },
                                            {
                                                "box": {
                                                    "id": "obj-15",
                                                    "maxclass": "newobj",
                                                    "numinlets": 2,
                                                    "numoutlets": 1,
                                                    "outlettype": [ "signal" ],
                                                    "patching_rect": [ 45.0, 207.5, 104.0, 23.0 ],
                                                    "rnbo_classname": "delay~",
                                                    "rnbo_extra_attributes": {
                                                        "ramp": 50.0,
                                                        "interp": "linear",
                                                        "maxdelayms": 0.0
                                                    },
                                                    "rnbo_serial": 2,
                                                    "rnbo_uniqueid": "delay~_obj-15",
                                                    "text": "delay~ samplerate"
                                                }
                                            },
                                            {
                                                "box": {
                                                    "id": "obj-2",
                                                    "maxclass": "newobj",
                                                    "numinlets": 1,
                                                    "numoutlets": 0,
                                                    "patching_rect": [ 186.0, 249.0, 43.0, 23.0 ],
                                                    "rnbo_classname": "out~",
                                                    "rnbo_extra_attributes": {
                                                        "meta": "",
                                                        "comment": ""
                                                    },
                                                    "rnbo_serial": 2,
                                                    "rnbo_uniqueid": "out~_obj-2",
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
                                                    "id": "obj-1",
                                                    "maxclass": "newobj",
                                                    "numinlets": 0,
                                                    "numoutlets": 1,
                                                    "outlettype": [ "signal" ],
                                                    "patching_rect": [ 188.0, 119.0, 35.0, 23.0 ],
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
                                            }
                                        ],
                                        "lines": [
                                            {
                                                "patchline": {
                                                    "destination": [ "obj-21", 0 ],
                                                    "source": [ "obj-1", 0 ]
                                                }
                                            },
                                            {
                                                "patchline": {
                                                    "destination": [ "obj-12", 0 ],
                                                    "midpoints": [ 367.5, 284.0, 486.0, 284.0, 486.0, 197.0, 508.5, 197.0 ],
                                                    "source": [ "obj-11", 0 ]
                                                }
                                            },
                                            {
                                                "patchline": {
                                                    "destination": [ "obj-13", 0 ],
                                                    "midpoints": [ 508.5, 227.0, 474.0, 227.0, 474.0, 188.0, 367.5, 188.0 ],
                                                    "order": 1,
                                                    "source": [ "obj-12", 0 ]
                                                }
                                            },
                                            {
                                                "patchline": {
                                                    "destination": [ "obj-8", 0 ],
                                                    "order": 0,
                                                    "source": [ "obj-12", 0 ]
                                                }
                                            },
                                            {
                                                "patchline": {
                                                    "destination": [ "obj-11", 0 ],
                                                    "source": [ "obj-13", 0 ]
                                                }
                                            },
                                            {
                                                "patchline": {
                                                    "destination": [ "obj-23", 0 ],
                                                    "source": [ "obj-14", 0 ]
                                                }
                                            },
                                            {
                                                "patchline": {
                                                    "destination": [ "obj-6", 0 ],
                                                    "source": [ "obj-15", 0 ]
                                                }
                                            },
                                            {
                                                "patchline": {
                                                    "destination": [ "obj-22", 0 ],
                                                    "source": [ "obj-21", 0 ]
                                                }
                                            },
                                            {
                                                "patchline": {
                                                    "destination": [ "obj-15", 0 ],
                                                    "midpoints": [ 195.5, 221.0, 159.0, 221.0, 159.0, 194.0, 54.5, 194.0 ],
                                                    "order": 1,
                                                    "source": [ "obj-22", 0 ]
                                                }
                                            },
                                            {
                                                "patchline": {
                                                    "destination": [ "obj-2", 0 ],
                                                    "order": 0,
                                                    "source": [ "obj-22", 0 ]
                                                }
                                            },
                                            {
                                                "patchline": {
                                                    "destination": [ "obj-12", 0 ],
                                                    "source": [ "obj-23", 0 ]
                                                }
                                            },
                                            {
                                                "patchline": {
                                                    "destination": [ "obj-15", 1 ],
                                                    "source": [ "obj-56", 0 ]
                                                }
                                            },
                                            {
                                                "patchline": {
                                                    "destination": [ "obj-22", 0 ],
                                                    "midpoints": [ 54.5, 284.0, 171.0, 284.0, 171.0, 191.0, 195.5, 191.0 ],
                                                    "source": [ "obj-6", 0 ]
                                                }
                                            },
                                            {
                                                "patchline": {
                                                    "destination": [ "obj-13", 1 ],
                                                    "source": [ "obj-60", 0 ]
                                                }
                                            },
                                            {
                                                "patchline": {
                                                    "destination": [ "obj-60", 0 ],
                                                    "source": [ "obj-69", 0 ]
                                                }
                                            },
                                            {
                                                "patchline": {
                                                    "destination": [ "obj-11", 1 ],
                                                    "midpoints": [ 291.5, 236.0, 310.0, 236.0, 310.0, 236.0, 395.5, 236.0 ],
                                                    "order": 0,
                                                    "source": [ "obj-70", 0 ]
                                                }
                                            },
                                            {
                                                "patchline": {
                                                    "destination": [ "obj-6", 1 ],
                                                    "midpoints": [ 291.5, 64.0, 25.0, 64.0, 25.0, 240.0, 82.5, 240.0 ],
                                                    "order": 1,
                                                    "source": [ "obj-70", 0 ]
                                                }
                                            },
                                            {
                                                "patchline": {
                                                    "destination": [ "obj-56", 0 ],
                                                    "source": [ "obj-72", 0 ]
                                                }
                                            }
                                        ]
                                    },
                                    "patching_rect": [ 40.0, 563.0, 149.0, 37.0 ],
                                    "rnbo_classname": "p",
                                    "rnbo_extra_attributes": {
                                        "voicecontrol": "simple",
                                        "notecontroller": 0,
                                        "args": [],
                                        "exposevoiceparams": 0,
                                        "receivemode": "local",
                                        "polyphony": -1.0,
                                        "uidstyle": "auto"
                                    },
                                    "rnbo_serial": 3,
                                    "rnbo_uniqueid": "delay",
                                    "rnboinfo": {
                                        "needsInstanceInfo": 1,
                                        "argnames": {
                                            "left_delay": {
                                                "attrOrProp": 1,
                                                "digest": "left_delay",
                                                "isalias": 0,
                                                "aliases": [],
                                                "settable": 1,
                                                "attachable": 1,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "type": "number"
                                            },
                                            "fb": {
                                                "attrOrProp": 1,
                                                "digest": "fb",
                                                "isalias": 0,
                                                "aliases": [],
                                                "settable": 1,
                                                "attachable": 1,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "type": "number"
                                            },
                                            "right_delay": {
                                                "attrOrProp": 1,
                                                "digest": "right_delay",
                                                "isalias": 0,
                                                "aliases": [],
                                                "settable": 1,
                                                "attachable": 1,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "type": "number"
                                            },
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
                                    "text": "p stereo_delay @title delay",
                                    "varname": "delay"
                                }
                            },
                            {
                                "box": {
                                    "id": "obj-19",
                                    "maxclass": "newobj",
                                    "numinlets": 2,
                                    "numoutlets": 1,
                                    "outlettype": [ "signal" ],
                                    "patching_rect": [ 183.0, 102.0, 30.0, 23.0 ],
                                    "rnbo_classname": "sig~",
                                    "rnbo_extra_attributes": {
                                        "unit": "ms"
                                    },
                                    "rnbo_serial": 1,
                                    "rnbo_uniqueid": "sig~_obj-19",
                                    "text": "sig~"
                                }
                            },
                            {
                                "box": {
                                    "id": "obj-2",
                                    "maxclass": "newobj",
                                    "numinlets": 2,
                                    "numoutlets": 1,
                                    "outlettype": [ "" ],
                                    "patching_rect": [ 183.0, 65.0, 38.0, 23.0 ],
                                    "rnbo_classname": "/",
                                    "rnbo_extra_attributes": {
                                        "hot": 0
                                    },
                                    "rnbo_serial": 1,
                                    "rnbo_uniqueid": "/_obj-2",
                                    "text": "/ 127"
                                }
                            },
                            {
                                "box": {
                                    "id": "obj-1",
                                    "maxclass": "newobj",
                                    "numinlets": 2,
                                    "numoutlets": 4,
                                    "outlettype": [ "", "", "", "" ],
                                    "patching_rect": [ 40.0, 19.0, 50.5, 23.0 ],
                                    "rnbo_classname": "notein",
                                    "rnbo_serial": 1,
                                    "rnbo_uniqueid": "notein_obj-1",
                                    "text": "notein"
                                }
                            },
                            {
                                "box": {
                                    "id": "obj-13",
                                    "maxclass": "newobj",
                                    "numinlets": 2,
                                    "numoutlets": 1,
                                    "outlettype": [ "signal" ],
                                    "patching_rect": [ 40.0, 65.0, 40.0, 23.0 ],
                                    "rnbo_classname": "mtof~",
                                    "rnbo_extra_attributes": {
                                        "scalename": "",
                                        "filter": 1.0
                                    },
                                    "rnbo_serial": 1,
                                    "rnbo_uniqueid": "mtof~_obj-13",
                                    "rnboinfo": {
                                        "needsInstanceInfo": 1,
                                        "argnames": {
                                            "midivalue": {
                                                "attrOrProp": 1,
                                                "digest": "MIDI Note Number",
                                                "isalias": 0,
                                                "aliases": [],
                                                "settable": 1,
                                                "attachable": 0,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "inlet": 1,
                                                "type": "number"
                                            },
                                            "tuning": {
                                                "attrOrProp": 1,
                                                "digest": "Set base frequency",
                                                "isalias": 0,
                                                "aliases": [],
                                                "attachable": 0,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "inlet": 1,
                                                "type": "number"
                                            },
                                            "scale": {
                                                "attrOrProp": 1,
                                                "digest": "Scala scl formatted list",
                                                "isalias": 0,
                                                "aliases": [],
                                                "settable": 1,
                                                "attachable": 1,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "type": "list"
                                            },
                                            "map": {
                                                "attrOrProp": 1,
                                                "digest": "Scala kbm formatted list",
                                                "isalias": 0,
                                                "aliases": [],
                                                "settable": 1,
                                                "attachable": 1,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "type": "list"
                                            },
                                            "ref": {
                                                "attrOrProp": 1,
                                                "digest": "Reference note for which the 'base' frequency is given",
                                                "isalias": 0,
                                                "aliases": [],
                                                "settable": 1,
                                                "attachable": 1,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "type": "number",
                                                "defaultValue": "69"
                                            },
                                            "mid": {
                                                "attrOrProp": 1,
                                                "digest": "Middle note where the first scale degree is mapped",
                                                "isalias": 0,
                                                "aliases": [],
                                                "settable": 1,
                                                "attachable": 1,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "type": "number",
                                                "defaultValue": "60"
                                            },
                                            "base": {
                                                "attrOrProp": 1,
                                                "digest": "Frequency to tune 'ref' note to",
                                                "isalias": 0,
                                                "aliases": [],
                                                "settable": 1,
                                                "attachable": 1,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "type": "number",
                                                "defaultValue": "440"
                                            },
                                            "out": {
                                                "attrOrProp": 1,
                                                "digest": "Frequency (Hz)",
                                                "isalias": 0,
                                                "aliases": [],
                                                "attachable": 0,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "outlet": 1,
                                                "type": "signal"
                                            },
                                            "scalename": {
                                                "attrOrProp": 2,
                                                "digest": "Scale Name",
                                                "defaultarg": 1,
                                                "isalias": 0,
                                                "aliases": [],
                                                "settable": 1,
                                                "attachable": 0,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "type": "symbol"
                                            },
                                            "filter": {
                                                "attrOrProp": 2,
                                                "digest": "Filter unmapped values",
                                                "isalias": 0,
                                                "aliases": [],
                                                "settable": 1,
                                                "attachable": 0,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "type": "number",
                                                "defaultValue": "1"
                                            }
                                        },
                                        "inputs": [
                                            {
                                                "name": "midivalue",
                                                "type": "auto",
                                                "digest": "MIDI Note Number",
                                                "hot": 1,
                                                "docked": 0
                                            },
                                            {
                                                "name": "tuning",
                                                "type": "number",
                                                "digest": "Set base frequency",
                                                "docked": 0
                                            }
                                        ],
                                        "outputs": [
                                            {
                                                "name": "out",
                                                "type": "signal",
                                                "digest": "Frequency (Hz)",
                                                "docked": 0
                                            }
                                        ],
                                        "helpname": "mtof~",
                                        "aliasOf": "mtof",
                                        "classname": "mtof~",
                                        "operator": 0,
                                        "versionId": 950896033,
                                        "changesPatcherIO": 0
                                    },
                                    "text": "mtof~"
                                }
                            }
                        ],
                        "lines": [
                            {
                                "patchline": {
                                    "destination": [ "obj-13", 0 ],
                                    "source": [ "obj-1", 0 ]
                                }
                            },
                            {
                                "patchline": {
                                    "destination": [ "obj-2", 0 ],
                                    "source": [ "obj-1", 1 ]
                                }
                            },
                            {
                                "patchline": {
                                    "destination": [ "obj-3", 0 ],
                                    "source": [ "obj-10", 0 ]
                                }
                            },
                            {
                                "patchline": {
                                    "destination": [ "obj-12", 0 ],
                                    "source": [ "obj-11", 0 ]
                                }
                            },
                            {
                                "patchline": {
                                    "destination": [ "obj-14", 0 ],
                                    "source": [ "obj-12", 0 ]
                                }
                            },
                            {
                                "patchline": {
                                    "destination": [ "obj-11", 0 ],
                                    "source": [ "obj-13", 0 ]
                                }
                            },
                            {
                                "patchline": {
                                    "destination": [ "obj-10", 0 ],
                                    "source": [ "obj-14", 0 ]
                                }
                            },
                            {
                                "patchline": {
                                    "destination": [ "obj-26", 0 ],
                                    "source": [ "obj-17", 0 ]
                                }
                            },
                            {
                                "patchline": {
                                    "destination": [ "obj-11", 1 ],
                                    "source": [ "obj-18", 0 ]
                                }
                            },
                            {
                                "patchline": {
                                    "destination": [ "obj-12", 1 ],
                                    "source": [ "obj-19", 0 ]
                                }
                            },
                            {
                                "patchline": {
                                    "destination": [ "obj-19", 0 ],
                                    "source": [ "obj-2", 0 ]
                                }
                            },
                            {
                                "patchline": {
                                    "destination": [ "obj-11", 2 ],
                                    "source": [ "obj-22", 0 ]
                                }
                            },
                            {
                                "patchline": {
                                    "destination": [ "obj-14", 1 ],
                                    "source": [ "obj-24", 0 ]
                                }
                            },
                            {
                                "patchline": {
                                    "destination": [ "obj-14", 2 ],
                                    "source": [ "obj-26", 0 ]
                                }
                            },
                            {
                                "patchline": {
                                    "destination": [ "obj-5", 0 ],
                                    "source": [ "obj-3", 1 ]
                                }
                            },
                            {
                                "patchline": {
                                    "destination": [ "obj-7", 0 ],
                                    "source": [ "obj-3", 0 ]
                                }
                            },
                            {
                                "patchline": {
                                    "destination": [ "obj-24", 0 ],
                                    "source": [ "obj-4", 0 ]
                                }
                            },
                            {
                                "patchline": {
                                    "destination": [ "obj-22", 0 ],
                                    "source": [ "obj-6", 0 ]
                                }
                            },
                            {
                                "patchline": {
                                    "destination": [ "obj-18", 0 ],
                                    "source": [ "obj-9", 0 ]
                                }
                            }
                        ],
                        "bgcolor": [ 0.356862745098039, 0.356862745098039, 0.356862745098039, 1.0 ],
                        "editing_bgcolor": [ 0.356862745098039, 0.356862745098039, 0.356862745098039, 1.0 ],
                        "export_config": {
                            "vst-au-export": {
                                "vst-au-export-ins": {
                                    "plugin_manufacturer_name": "My Company",
                                    "include_presets": 1,
                                    "plugin_name": "RNBO-Intro-Plugin"
                                }
                            },
                            "web-export": {
                                "json-web-export": {
                                    "file_name": "feedback-synth.json"
                                }
                            }
                        }
                    },
                    "patching_rect": [ 176.0, 358.0, 239.0, 22.0 ],
                    "rnboattrcache": {
                        "poly/delay/left_delay": {
                            "label": "left_delay",
                            "isEnum": 0,
                            "parsestring": ""
                        },
                        "poly/delay/fb": {
                            "label": "fb",
                            "isEnum": 0,
                            "parsestring": ""
                        },
                        "poly/delay/right_delay": {
                            "label": "right_delay",
                            "isEnum": 0,
                            "parsestring": ""
                        },
                        "overblow": {
                            "label": "overblow",
                            "isEnum": 0,
                            "parsestring": ""
                        },
                        "harmonics": {
                            "label": "harmonics",
                            "isEnum": 0,
                            "parsestring": ""
                        },
                        "cutoff": {
                            "label": "cutoff",
                            "isEnum": 0,
                            "parsestring": ""
                        },
                        "Q": {
                            "label": "Q",
                            "isEnum": 0,
                            "parsestring": ""
                        }
                    },
                    "rnboversion": "1.4.2",
                    "saved_attribute_attributes": {
                        "valueof": {
                            "parameter_invisible": 1,
                            "parameter_longname": "rnbo~[6]",
                            "parameter_modmode": 0,
                            "parameter_shortname": "rnbo~",
                            "parameter_type": 3
                        }
                    },
                    "saved_object_attributes": {
                        "optimization": "O1",
                        "parameter_enable": 1,
                        "polyphony": 8,
                        "uuid": "9ee37473-ba62-11eb-b473-a683e7612c99"
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
                            "cutoff": {
                                "value": 1130.4916017938012
                            },
                            "harmonics": {
                                "value": 4.0
                            },
                            "__sps": {
                                "poly": [
                                    {
                                        "__sps": {
                                            "delay": {
                                                "right_delay": {
                                                    "value": 400.0
                                                },
                                                "fb": {
                                                    "value": 0.2
                                                },
                                                "left_delay": {
                                                    "value": 300.0
                                                }
                                            },
                                            "envelope": {                                            },
                                            "filter": {                                            }
                                        }
                                    },
                                    {
                                        "__sps": {
                                            "delay": {
                                                "right_delay": {
                                                    "value": 400.0
                                                },
                                                "fb": {
                                                    "value": 0.2
                                                },
                                                "left_delay": {
                                                    "value": 300.0
                                                }
                                            },
                                            "envelope": {                                            },
                                            "filter": {                                            }
                                        }
                                    },
                                    {
                                        "__sps": {
                                            "delay": {
                                                "right_delay": {
                                                    "value": 400.0
                                                },
                                                "fb": {
                                                    "value": 0.2
                                                },
                                                "left_delay": {
                                                    "value": 300.0
                                                }
                                            },
                                            "envelope": {                                            },
                                            "filter": {                                            }
                                        }
                                    },
                                    {
                                        "__sps": {
                                            "delay": {
                                                "right_delay": {
                                                    "value": 400.0
                                                },
                                                "fb": {
                                                    "value": 0.2
                                                },
                                                "left_delay": {
                                                    "value": 300.0
                                                }
                                            },
                                            "envelope": {                                            },
                                            "filter": {                                            }
                                        }
                                    },
                                    {
                                        "__sps": {
                                            "delay": {
                                                "right_delay": {
                                                    "value": 400.0
                                                },
                                                "fb": {
                                                    "value": 0.2
                                                },
                                                "left_delay": {
                                                    "value": 300.0
                                                }
                                            },
                                            "envelope": {                                            },
                                            "filter": {                                            }
                                        }
                                    },
                                    {
                                        "__sps": {
                                            "delay": {
                                                "right_delay": {
                                                    "value": 400.0
                                                },
                                                "fb": {
                                                    "value": 0.2
                                                },
                                                "left_delay": {
                                                    "value": 300.0
                                                }
                                            },
                                            "envelope": {                                            },
                                            "filter": {                                            }
                                        }
                                    },
                                    {
                                        "__sps": {
                                            "delay": {
                                                "right_delay": {
                                                    "value": 400.0
                                                },
                                                "fb": {
                                                    "value": 0.2
                                                },
                                                "left_delay": {
                                                    "value": 300.0
                                                }
                                            },
                                            "envelope": {                                            },
                                            "filter": {                                            }
                                        }
                                    },
                                    {
                                        "__sps": {
                                            "delay": {
                                                "right_delay": {
                                                    "value": 400.0
                                                },
                                                "fb": {
                                                    "value": 0.2
                                                },
                                                "left_delay": {
                                                    "value": 300.0
                                                }
                                            },
                                            "envelope": {                                            },
                                            "filter": {                                            }
                                        }
                                    }
                                ]
                            },
                            "overblow": {
                                "value": 0.787208609749982
                            },
                            "Q": {
                                "value": 3.0
                            },
                            "__presetid": "feedback-synth"
                        },
                        "snapshotlist": {
                            "current_snapshot": 0,
                            "entries": [
                                {
                                    "filetype": "C74Snapshot",
                                    "version": 2,
                                    "minorversion": 0,
                                    "name": "smooth",
                                    "origin": "feedback-synth",
                                    "type": "rnbo",
                                    "subtype": "",
                                    "embed": 1,
                                    "snapshot": {
                                        "cutoff": {
                                            "value": 1130.4916017938012
                                        },
                                        "harmonics": {
                                            "value": 4.0
                                        },
                                        "__sps": {
                                            "poly": [
                                                {
                                                    "__sps": {
                                                        "delay": {
                                                            "right_delay": {
                                                                "value": 400.0
                                                            },
                                                            "fb": {
                                                                "value": 0.2
                                                            },
                                                            "left_delay": {
                                                                "value": 300.0
                                                            }
                                                        },
                                                        "envelope": {                                                        },
                                                        "filter": {                                                        }
                                                    }
                                                },
                                                {
                                                    "__sps": {
                                                        "delay": {
                                                            "right_delay": {
                                                                "value": 400.0
                                                            },
                                                            "fb": {
                                                                "value": 0.2
                                                            },
                                                            "left_delay": {
                                                                "value": 300.0
                                                            }
                                                        },
                                                        "envelope": {                                                        },
                                                        "filter": {                                                        }
                                                    }
                                                },
                                                {
                                                    "__sps": {
                                                        "delay": {
                                                            "right_delay": {
                                                                "value": 400.0
                                                            },
                                                            "fb": {
                                                                "value": 0.2
                                                            },
                                                            "left_delay": {
                                                                "value": 300.0
                                                            }
                                                        },
                                                        "envelope": {                                                        },
                                                        "filter": {                                                        }
                                                    }
                                                },
                                                {
                                                    "__sps": {
                                                        "delay": {
                                                            "right_delay": {
                                                                "value": 400.0
                                                            },
                                                            "fb": {
                                                                "value": 0.2
                                                            },
                                                            "left_delay": {
                                                                "value": 300.0
                                                            }
                                                        },
                                                        "envelope": {                                                        },
                                                        "filter": {                                                        }
                                                    }
                                                },
                                                {
                                                    "__sps": {
                                                        "delay": {
                                                            "right_delay": {
                                                                "value": 400.0
                                                            },
                                                            "fb": {
                                                                "value": 0.2
                                                            },
                                                            "left_delay": {
                                                                "value": 300.0
                                                            }
                                                        },
                                                        "envelope": {                                                        },
                                                        "filter": {                                                        }
                                                    }
                                                },
                                                {
                                                    "__sps": {
                                                        "delay": {
                                                            "right_delay": {
                                                                "value": 400.0
                                                            },
                                                            "fb": {
                                                                "value": 0.2
                                                            },
                                                            "left_delay": {
                                                                "value": 300.0
                                                            }
                                                        },
                                                        "envelope": {                                                        },
                                                        "filter": {                                                        }
                                                    }
                                                },
                                                {
                                                    "__sps": {
                                                        "delay": {
                                                            "right_delay": {
                                                                "value": 400.0
                                                            },
                                                            "fb": {
                                                                "value": 0.2
                                                            },
                                                            "left_delay": {
                                                                "value": 300.0
                                                            }
                                                        },
                                                        "envelope": {                                                        },
                                                        "filter": {                                                        }
                                                    }
                                                },
                                                {
                                                    "__sps": {
                                                        "delay": {
                                                            "right_delay": {
                                                                "value": 400.0
                                                            },
                                                            "fb": {
                                                                "value": 0.2
                                                            },
                                                            "left_delay": {
                                                                "value": 300.0
                                                            }
                                                        },
                                                        "envelope": {                                                        },
                                                        "filter": {                                                        }
                                                    }
                                                }
                                            ]
                                        },
                                        "overblow": {
                                            "value": 0.787208609749982
                                        },
                                        "Q": {
                                            "value": 3.0
                                        },
                                        "__presetid": "feedback-synth"
                                    },
                                    "fileref": {
                                        "name": "smooth",
                                        "filename": "smooth.maxsnap",
                                        "filepath": "~/Documents/Max 9/Snapshots",
                                        "filepos": -1,
                                        "snapshotfileid": "b083bfab25d7f22537f617825a784c57"
                                    }
                                },
                                {
                                    "filetype": "C74Snapshot",
                                    "version": 2,
                                    "minorversion": 0,
                                    "name": "bright",
                                    "origin": "feedback-synth",
                                    "type": "rnbo",
                                    "subtype": "",
                                    "embed": 1,
                                    "snapshot": {
                                        "cutoff": {
                                            "value": 1956.0
                                        },
                                        "harmonics": {
                                            "value": 3.7
                                        },
                                        "__sps": {
                                            "poly": [
                                                {
                                                    "__sps": {
                                                        "delay": {
                                                            "right_delay": {
                                                                "value": 400.0
                                                            },
                                                            "fb": {
                                                                "value": 0.2
                                                            },
                                                            "left_delay": {
                                                                "value": 300.0
                                                            }
                                                        },
                                                        "envelope": {                                                        },
                                                        "filter": {                                                        }
                                                    }
                                                },
                                                {
                                                    "__sps": {
                                                        "delay": {
                                                            "right_delay": {
                                                                "value": 400.0
                                                            },
                                                            "fb": {
                                                                "value": 0.2
                                                            },
                                                            "left_delay": {
                                                                "value": 300.0
                                                            }
                                                        },
                                                        "envelope": {                                                        },
                                                        "filter": {                                                        }
                                                    }
                                                },
                                                {
                                                    "__sps": {
                                                        "delay": {
                                                            "right_delay": {
                                                                "value": 400.0
                                                            },
                                                            "fb": {
                                                                "value": 0.2
                                                            },
                                                            "left_delay": {
                                                                "value": 300.0
                                                            }
                                                        },
                                                        "envelope": {                                                        },
                                                        "filter": {                                                        }
                                                    }
                                                },
                                                {
                                                    "__sps": {
                                                        "delay": {
                                                            "right_delay": {
                                                                "value": 400.0
                                                            },
                                                            "fb": {
                                                                "value": 0.2
                                                            },
                                                            "left_delay": {
                                                                "value": 300.0
                                                            }
                                                        },
                                                        "envelope": {                                                        },
                                                        "filter": {                                                        }
                                                    }
                                                },
                                                {
                                                    "__sps": {
                                                        "delay": {
                                                            "right_delay": {
                                                                "value": 400.0
                                                            },
                                                            "fb": {
                                                                "value": 0.2
                                                            },
                                                            "left_delay": {
                                                                "value": 300.0
                                                            }
                                                        },
                                                        "envelope": {                                                        },
                                                        "filter": {                                                        }
                                                    }
                                                },
                                                {
                                                    "__sps": {
                                                        "delay": {
                                                            "right_delay": {
                                                                "value": 400.0
                                                            },
                                                            "fb": {
                                                                "value": 0.2
                                                            },
                                                            "left_delay": {
                                                                "value": 300.0
                                                            }
                                                        },
                                                        "envelope": {                                                        },
                                                        "filter": {                                                        }
                                                    }
                                                },
                                                {
                                                    "__sps": {
                                                        "delay": {
                                                            "right_delay": {
                                                                "value": 400.0
                                                            },
                                                            "fb": {
                                                                "value": 0.2
                                                            },
                                                            "left_delay": {
                                                                "value": 300.0
                                                            }
                                                        },
                                                        "envelope": {                                                        },
                                                        "filter": {                                                        }
                                                    }
                                                },
                                                {
                                                    "__sps": {
                                                        "delay": {
                                                            "right_delay": {
                                                                "value": 400.0
                                                            },
                                                            "fb": {
                                                                "value": 0.2
                                                            },
                                                            "left_delay": {
                                                                "value": 300.0
                                                            }
                                                        },
                                                        "envelope": {                                                        },
                                                        "filter": {                                                        }
                                                    }
                                                }
                                            ]
                                        },
                                        "overblow": {
                                            "value": 1.5
                                        },
                                        "Q": {
                                            "value": 1.5
                                        },
                                        "__presetid": "feedback-synth"
                                    },
                                    "fileref": {
                                        "name": "bright",
                                        "filename": "nasty[1].maxsnap",
                                        "filepath": "~/Documents/Max 8/Snapshots",
                                        "filepos": -1,
                                        "snapshotfileid": "092462635a089fac0deecbc2053402ca"
                                    }
                                },
                                {
                                    "filetype": "C74Snapshot",
                                    "version": 2,
                                    "minorversion": 0,
                                    "name": "nasty",
                                    "origin": "feedback-synth",
                                    "type": "rnbo",
                                    "subtype": "",
                                    "embed": 1,
                                    "fileref": {
                                        "name": "nasty",
                                        "filename": "feedback-synth[1].maxsnap",
                                        "filepath": "~/Documents/Max 8/Snapshots",
                                        "filepos": -1,
                                        "snapshotfileid": "2bf5e5cb8220636c7d217cd483ed4a18"
                                    },
                                    "snapshot": {
                                        "cutoff": {
                                            "value": 4000.0
                                        },
                                        "harmonics": {
                                            "value": 4.0
                                        },
                                        "__sps": {
                                            "poly": [
                                                {
                                                    "__sps": {
                                                        "delay": {
                                                            "right_delay": {
                                                                "value": 400.0
                                                            },
                                                            "fb": {
                                                                "value": 0.2
                                                            },
                                                            "left_delay": {
                                                                "value": 300.0
                                                            }
                                                        },
                                                        "envelope": {                                                        },
                                                        "filter": {                                                        }
                                                    }
                                                },
                                                {
                                                    "__sps": {
                                                        "delay": {
                                                            "right_delay": {
                                                                "value": 400.0
                                                            },
                                                            "fb": {
                                                                "value": 0.2
                                                            },
                                                            "left_delay": {
                                                                "value": 300.0
                                                            }
                                                        },
                                                        "envelope": {                                                        },
                                                        "filter": {                                                        }
                                                    }
                                                },
                                                {
                                                    "__sps": {
                                                        "delay": {
                                                            "right_delay": {
                                                                "value": 400.0
                                                            },
                                                            "fb": {
                                                                "value": 0.2
                                                            },
                                                            "left_delay": {
                                                                "value": 300.0
                                                            }
                                                        },
                                                        "envelope": {                                                        },
                                                        "filter": {                                                        }
                                                    }
                                                },
                                                {
                                                    "__sps": {
                                                        "delay": {
                                                            "right_delay": {
                                                                "value": 400.0
                                                            },
                                                            "fb": {
                                                                "value": 0.2
                                                            },
                                                            "left_delay": {
                                                                "value": 300.0
                                                            }
                                                        },
                                                        "envelope": {                                                        },
                                                        "filter": {                                                        }
                                                    }
                                                },
                                                {
                                                    "__sps": {
                                                        "delay": {
                                                            "right_delay": {
                                                                "value": 400.0
                                                            },
                                                            "fb": {
                                                                "value": 0.2
                                                            },
                                                            "left_delay": {
                                                                "value": 300.0
                                                            }
                                                        },
                                                        "envelope": {                                                        },
                                                        "filter": {                                                        }
                                                    }
                                                },
                                                {
                                                    "__sps": {
                                                        "delay": {
                                                            "right_delay": {
                                                                "value": 400.0
                                                            },
                                                            "fb": {
                                                                "value": 0.2
                                                            },
                                                            "left_delay": {
                                                                "value": 300.0
                                                            }
                                                        },
                                                        "envelope": {                                                        },
                                                        "filter": {                                                        }
                                                    }
                                                },
                                                {
                                                    "__sps": {
                                                        "delay": {
                                                            "right_delay": {
                                                                "value": 400.0
                                                            },
                                                            "fb": {
                                                                "value": 0.2
                                                            },
                                                            "left_delay": {
                                                                "value": 300.0
                                                            }
                                                        },
                                                        "envelope": {                                                        },
                                                        "filter": {                                                        }
                                                    }
                                                },
                                                {
                                                    "__sps": {
                                                        "delay": {
                                                            "right_delay": {
                                                                "value": 400.0
                                                            },
                                                            "fb": {
                                                                "value": 0.2
                                                            },
                                                            "left_delay": {
                                                                "value": 300.0
                                                            }
                                                        },
                                                        "envelope": {                                                        },
                                                        "filter": {                                                        }
                                                    }
                                                }
                                            ]
                                        },
                                        "overblow": {
                                            "value": 5.0
                                        },
                                        "Q": {
                                            "value": 3.0
                                        },
                                        "__presetid": "feedback-synth"
                                    }
                                }
                            ]
                        }
                    },
                    "text": "rnbo~ @polyphony 8 @title feedback-synth",
                    "varname": "rnbo~[6]"
                }
            },
            {
                "box": {
                    "id": "obj-58",
                    "maxclass": "newobj",
                    "numinlets": 2,
                    "numoutlets": 1,
                    "outlettype": [ "" ],
                    "patching_rect": [ 45.0, 326.0, 46.0, 22.0 ],
                    "text": "pack i i"
                }
            },
            {
                "box": {
                    "id": "obj-55",
                    "maxclass": "newobj",
                    "numinlets": 7,
                    "numoutlets": 2,
                    "outlettype": [ "int", "" ],
                    "patching_rect": [ 45.0, 358.0, 82.0, 22.0 ],
                    "text": "midiformat"
                }
            },
            {
                "box": {
                    "hkeycolor": [ 0.254423052072525, 0.558908581733704, 0.983096480369568, 1.0 ],
                    "id": "obj-53",
                    "maxclass": "kslider",
                    "mode": 2,
                    "numinlets": 2,
                    "numoutlets": 2,
                    "outlettype": [ "int", "int" ],
                    "parameter_enable": 0,
                    "patching_rect": [ 45.0, 251.0, 336.0, 53.0 ]
                }
            },
            {
                "box": {
                    "id": "obj-20",
                    "local": 1,
                    "maxclass": "ezdac~",
                    "numinlets": 2,
                    "numoutlets": 0,
                    "patching_rect": [ 126.0, 170.0, 44.0, 44.0 ],
                    "prototypename": "helpfile"
                }
            },
            {
                "box": {
                    "autosave": 1,
                    "id": "obj-16",
                    "inletInfo": {
                        "IOInfo": [
                            {
                                "type": "midi",
                                "index": -1,
                                "tag": "",
                                "comment": ""
                            }
                        ]
                    },
                    "maxclass": "newobj",
                    "numinlets": 2,
                    "numoutlets": 3,
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
                            }
                        ]
                    },
                    "outlettype": [ "signal", "signal", "list" ],
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
                        "rect": [ 130.0, 90.0, 235.0, 423.0 ],
                        "default_fontname": "Lato",
                        "integercoordinates": 1,
                        "title": "untitled",
                        "boxes": [
                            {
                                "box": {
                                    "id": "obj-7",
                                    "maxclass": "newobj",
                                    "numinlets": 1,
                                    "numoutlets": 1,
                                    "outlettype": [ "signal" ],
                                    "patching_rect": [ 245.0, 322.0, 34.0, 23.0 ],
                                    "rnbo_classname": "limi~",
                                    "rnbo_extra_attributes": {
                                        "buffersize": 512.0,
                                        "mode": "exponential",
                                        "channels": 1.0
                                    },
                                    "rnbo_serial": 1,
                                    "rnbo_uniqueid": "limi~_obj-7",
                                    "rnboinfo": {
                                        "needsInstanceInfo": 1,
                                        "argnames": {
                                            "input1": {
                                                "attrOrProp": 1,
                                                "digest": "Input",
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
                                            "output1": {
                                                "attrOrProp": 1,
                                                "digest": "Filtered output",
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
                                            "bypass": {
                                                "attrOrProp": 1,
                                                "digest": "Bypass",
                                                "isalias": 0,
                                                "aliases": [],
                                                "settable": 1,
                                                "attachable": 1,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "type": "number",
                                                "defaultValue": "0"
                                            },
                                            "dcblock": {
                                                "attrOrProp": 1,
                                                "digest": "DC block",
                                                "isalias": 0,
                                                "aliases": [],
                                                "settable": 1,
                                                "attachable": 1,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "type": "number",
                                                "defaultValue": "0"
                                            },
                                            "lookahead": {
                                                "attrOrProp": 1,
                                                "digest": "Lookahead",
                                                "isalias": 0,
                                                "aliases": [],
                                                "settable": 1,
                                                "attachable": 1,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "type": "number",
                                                "defaultValue": "100"
                                            },
                                            "preamp": {
                                                "attrOrProp": 1,
                                                "digest": "Preamp",
                                                "isalias": 0,
                                                "aliases": [],
                                                "settable": 1,
                                                "attachable": 1,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "type": "number",
                                                "defaultValue": "0"
                                            },
                                            "postamp": {
                                                "attrOrProp": 1,
                                                "digest": "postamp",
                                                "isalias": 0,
                                                "aliases": [],
                                                "settable": 1,
                                                "attachable": 1,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "type": "number",
                                                "defaultValue": "0"
                                            },
                                            "threshold": {
                                                "attrOrProp": 1,
                                                "digest": "Threshold",
                                                "isalias": 0,
                                                "aliases": [],
                                                "settable": 1,
                                                "attachable": 1,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "type": "number",
                                                "defaultValue": "0"
                                            },
                                            "release": {
                                                "attrOrProp": 1,
                                                "digest": "Release",
                                                "isalias": 0,
                                                "aliases": [],
                                                "settable": 1,
                                                "attachable": 1,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "type": "number",
                                                "defaultValue": "1000"
                                            },
                                            "clear": {
                                                "attrOrProp": 1,
                                                "digest": "Clear",
                                                "isalias": 0,
                                                "aliases": [],
                                                "attachable": 1,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "type": "bang"
                                            },
                                            "channels": {
                                                "attrOrProp": 2,
                                                "digest": "Channels",
                                                "defaultarg": 1,
                                                "isalias": 0,
                                                "aliases": [],
                                                "settable": 1,
                                                "attachable": 0,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "type": "number",
                                                "defaultValue": "1"
                                            },
                                            "buffersize": {
                                                "attrOrProp": 2,
                                                "digest": "Buffer size",
                                                "defaultarg": 2,
                                                "isalias": 0,
                                                "aliases": [],
                                                "settable": 1,
                                                "attachable": 0,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "type": "number",
                                                "defaultValue": "512"
                                            },
                                            "mode": {
                                                "attrOrProp": 2,
                                                "digest": "Mode",
                                                "isalias": 0,
                                                "aliases": [],
                                                "settable": 1,
                                                "attachable": 0,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "enum": [ "linear", "exponential" ],
                                                "type": "enum",
                                                "defaultValue": "exponential"
                                            }
                                        },
                                        "inputs": [
                                            {
                                                "name": "input1",
                                                "type": "signal",
                                                "digest": "Input",
                                                "hot": 1,
                                                "docked": 0
                                            }
                                        ],
                                        "outputs": [
                                            {
                                                "name": "output1",
                                                "type": "signal",
                                                "digest": "Filtered output",
                                                "docked": 0
                                            }
                                        ],
                                        "helpname": "limi~",
                                        "aliasOf": "limi~",
                                        "classname": "limi~",
                                        "operator": 0,
                                        "versionId": -346516842,
                                        "changesPatcherIO": 0
                                    },
                                    "text": "limi~"
                                }
                            },
                            {
                                "box": {
                                    "id": "obj-6",
                                    "maxclass": "newobj",
                                    "numinlets": 1,
                                    "numoutlets": 1,
                                    "outlettype": [ "signal" ],
                                    "patching_rect": [ 132.0, 322.0, 34.0, 23.0 ],
                                    "rnbo_classname": "limi~",
                                    "rnbo_extra_attributes": {
                                        "buffersize": 512.0,
                                        "mode": "exponential",
                                        "channels": 1.0
                                    },
                                    "rnbo_serial": 2,
                                    "rnbo_uniqueid": "limi~_obj-6",
                                    "rnboinfo": {
                                        "needsInstanceInfo": 1,
                                        "argnames": {
                                            "input1": {
                                                "attrOrProp": 1,
                                                "digest": "Input",
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
                                            "output1": {
                                                "attrOrProp": 1,
                                                "digest": "Filtered output",
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
                                            "bypass": {
                                                "attrOrProp": 1,
                                                "digest": "Bypass",
                                                "isalias": 0,
                                                "aliases": [],
                                                "settable": 1,
                                                "attachable": 1,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "type": "number",
                                                "defaultValue": "0"
                                            },
                                            "dcblock": {
                                                "attrOrProp": 1,
                                                "digest": "DC block",
                                                "isalias": 0,
                                                "aliases": [],
                                                "settable": 1,
                                                "attachable": 1,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "type": "number",
                                                "defaultValue": "0"
                                            },
                                            "lookahead": {
                                                "attrOrProp": 1,
                                                "digest": "Lookahead",
                                                "isalias": 0,
                                                "aliases": [],
                                                "settable": 1,
                                                "attachable": 1,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "type": "number",
                                                "defaultValue": "100"
                                            },
                                            "preamp": {
                                                "attrOrProp": 1,
                                                "digest": "Preamp",
                                                "isalias": 0,
                                                "aliases": [],
                                                "settable": 1,
                                                "attachable": 1,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "type": "number",
                                                "defaultValue": "0"
                                            },
                                            "postamp": {
                                                "attrOrProp": 1,
                                                "digest": "postamp",
                                                "isalias": 0,
                                                "aliases": [],
                                                "settable": 1,
                                                "attachable": 1,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "type": "number",
                                                "defaultValue": "0"
                                            },
                                            "threshold": {
                                                "attrOrProp": 1,
                                                "digest": "Threshold",
                                                "isalias": 0,
                                                "aliases": [],
                                                "settable": 1,
                                                "attachable": 1,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "type": "number",
                                                "defaultValue": "0"
                                            },
                                            "release": {
                                                "attrOrProp": 1,
                                                "digest": "Release",
                                                "isalias": 0,
                                                "aliases": [],
                                                "settable": 1,
                                                "attachable": 1,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "type": "number",
                                                "defaultValue": "1000"
                                            },
                                            "clear": {
                                                "attrOrProp": 1,
                                                "digest": "Clear",
                                                "isalias": 0,
                                                "aliases": [],
                                                "attachable": 1,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "type": "bang"
                                            },
                                            "channels": {
                                                "attrOrProp": 2,
                                                "digest": "Channels",
                                                "defaultarg": 1,
                                                "isalias": 0,
                                                "aliases": [],
                                                "settable": 1,
                                                "attachable": 0,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "type": "number",
                                                "defaultValue": "1"
                                            },
                                            "buffersize": {
                                                "attrOrProp": 2,
                                                "digest": "Buffer size",
                                                "defaultarg": 2,
                                                "isalias": 0,
                                                "aliases": [],
                                                "settable": 1,
                                                "attachable": 0,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "type": "number",
                                                "defaultValue": "512"
                                            },
                                            "mode": {
                                                "attrOrProp": 2,
                                                "digest": "Mode",
                                                "isalias": 0,
                                                "aliases": [],
                                                "settable": 1,
                                                "attachable": 0,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "enum": [ "linear", "exponential" ],
                                                "type": "enum",
                                                "defaultValue": "exponential"
                                            }
                                        },
                                        "inputs": [
                                            {
                                                "name": "input1",
                                                "type": "signal",
                                                "digest": "Input",
                                                "hot": 1,
                                                "docked": 0
                                            }
                                        ],
                                        "outputs": [
                                            {
                                                "name": "output1",
                                                "type": "signal",
                                                "digest": "Filtered output",
                                                "docked": 0
                                            }
                                        ],
                                        "helpname": "limi~",
                                        "aliasOf": "limi~",
                                        "classname": "limi~",
                                        "operator": 0,
                                        "versionId": -346516842,
                                        "changesPatcherIO": 0
                                    },
                                    "text": "limi~"
                                }
                            },
                            {
                                "box": {
                                    "id": "obj-2",
                                    "maxclass": "newobj",
                                    "numinlets": 2,
                                    "numoutlets": 2,
                                    "outlettype": [ "signal", "" ],
                                    "patching_rect": [ 418.0, 328.0, 61.0, 23.0 ],
                                    "rnbo_classname": "line~",
                                    "rnbo_serial": 1,
                                    "rnbo_uniqueid": "line~_obj-2",
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
                                        "classname": "line~",
                                        "operator": 0,
                                        "versionId": 2134689829,
                                        "changesPatcherIO": 0
                                    },
                                    "text": "line~ 0 10"
                                }
                            },
                            {
                                "box": {
                                    "id": "obj-22",
                                    "maxclass": "newobj",
                                    "numinlets": 2,
                                    "numoutlets": 2,
                                    "outlettype": [ "", "" ],
                                    "patching_rect": [ 418.0, 261.0, 245.0, 23.0 ],
                                    "rnbo_classname": "param",
                                    "rnbo_extra_attributes": {
                                        "meta": "",
                                        "tonormalized": "",
                                        "ctlin": 0.0,
                                        "enum": "",
                                        "fromnormalized": "",
                                        "steps": 0.0,
                                        "unit": "",
                                        "order": "",
                                        "displayorder": "-",
                                        "preset": 1,
                                        "displayname": "",
                                        "sendinit": 1,
                                        "exponent": 1.0
                                    },
                                    "rnbo_serial": 1,
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
                                                "defaultValue": "0.5"
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
                                    "text": "param volume @min 0 @max 100 @value 0.5",
                                    "varname": "volume"
                                }
                            },
                            {
                                "box": {
                                    "id": "obj-38",
                                    "maxclass": "newobj",
                                    "numinlets": 2,
                                    "numoutlets": 1,
                                    "outlettype": [ "signal" ],
                                    "patching_rect": [ 137.0, 261.0, 40.0, 23.0 ],
                                    "rnbo_classname": "*~",
                                    "rnbo_serial": 1,
                                    "rnbo_uniqueid": "*~_obj-38",
                                    "text": "*~ 0.5"
                                }
                            },
                            {
                                "box": {
                                    "id": "obj-37",
                                    "maxclass": "newobj",
                                    "numinlets": 2,
                                    "numoutlets": 1,
                                    "outlettype": [ "signal" ],
                                    "patching_rect": [ 245.0, 261.0, 40.0, 23.0 ],
                                    "rnbo_classname": "*~",
                                    "rnbo_serial": 2,
                                    "rnbo_uniqueid": "*~_obj-37",
                                    "text": "*~ 0.5"
                                }
                            },
                            {
                                "box": {
                                    "fontname": "Lato",
                                    "fontsize": 12.0,
                                    "id": "obj-35",
                                    "maxclass": "newobj",
                                    "numinlets": 2,
                                    "numoutlets": 2,
                                    "outlettype": [ "", "" ],
                                    "patching_rect": [ 274.0, 17.0, 182.0, 23.0 ],
                                    "rnbo_classname": "param",
                                    "rnbo_extra_attributes": {
                                        "meta": "",
                                        "tonormalized": "",
                                        "ctlin": -1.0,
                                        "enum": "",
                                        "fromnormalized": "",
                                        "steps": 0.0,
                                        "unit": "",
                                        "order": "0",
                                        "displayorder": "-",
                                        "preset": 1,
                                        "displayname": "",
                                        "sendinit": 1,
                                        "exponent": 1.0
                                    },
                                    "rnbo_serial": 2,
                                    "rnbo_uniqueid": "t60",
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
                                                "defaultValue": "1"
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
                                    "text": "param t60 1 @min 0 @max 10",
                                    "varname": "t60"
                                }
                            },
                            {
                                "box": {
                                    "id": "obj-34",
                                    "maxclass": "newobj",
                                    "numinlets": 1,
                                    "numoutlets": 1,
                                    "outlettype": [ "" ],
                                    "patching_rect": [ 433.0, 224.0, 100.0, 23.0 ],
                                    "rnbo_classname": "set",
                                    "rnbo_serial": 1,
                                    "rnbo_uniqueid": "set_obj-34",
                                    "rnboinfo": {
                                        "needsInstanceInfo": 1,
                                        "argnames": {
                                            "name": {
                                                "attrOrProp": 2,
                                                "digest": "attribute/param to control",
                                                "defaultarg": 1,
                                                "isalias": 0,
                                                "aliases": [],
                                                "settable": 1,
                                                "attachable": 0,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "type": "symbol",
                                                "mandatory": 1
                                            }
                                        },
                                        "inputs": [
                                            {
                                                "name": "input",
                                                "type": [ "bang", "number", "list", "signal" ],
                                                "digest": "attribute or parameter value (bang, number, list)",
                                                "hot": 1,
                                                "docked": 0
                                            }
                                        ],
                                        "outputs": [
                                            {
                                                "name": "output",
                                                "type": [ "bang", "number", "list", "signal" ],
                                                "digest": "connect to first inlet of gen or subpatcher",
                                                "docked": 0
                                            }
                                        ],
                                        "helpname": "set",
                                        "aliasOf": "set",
                                        "classname": "set",
                                        "operator": 0,
                                        "versionId": 1197449671,
                                        "changesPatcherIO": 0
                                    },
                                    "text": "set smooth"
                                }
                            },
                            {
                                "box": {
                                    "id": "obj-33",
                                    "maxclass": "newobj",
                                    "numinlets": 1,
                                    "numoutlets": 1,
                                    "outlettype": [ "" ],
                                    "patching_rect": [ 497.0, 138.0, 100.0, 23.0 ],
                                    "rnbo_classname": "set",
                                    "rnbo_serial": 2,
                                    "rnbo_uniqueid": "set_obj-33",
                                    "rnboinfo": {
                                        "needsInstanceInfo": 1,
                                        "argnames": {
                                            "name": {
                                                "attrOrProp": 2,
                                                "digest": "attribute/param to control",
                                                "defaultarg": 1,
                                                "isalias": 0,
                                                "aliases": [],
                                                "settable": 1,
                                                "attachable": 0,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "type": "symbol",
                                                "mandatory": 1
                                            }
                                        },
                                        "inputs": [
                                            {
                                                "name": "input",
                                                "type": [ "bang", "number", "list", "signal" ],
                                                "digest": "attribute or parameter value (bang, number, list)",
                                                "hot": 1,
                                                "docked": 0
                                            }
                                        ],
                                        "outputs": [
                                            {
                                                "name": "output",
                                                "type": [ "bang", "number", "list", "signal" ],
                                                "digest": "connect to first inlet of gen or subpatcher",
                                                "docked": 0
                                            }
                                        ],
                                        "helpname": "set",
                                        "aliasOf": "set",
                                        "classname": "set",
                                        "operator": 0,
                                        "versionId": 1197449671,
                                        "changesPatcherIO": 0
                                    },
                                    "text": "set ratio"
                                }
                            },
                            {
                                "box": {
                                    "id": "obj-32",
                                    "maxclass": "newobj",
                                    "numinlets": 1,
                                    "numoutlets": 1,
                                    "outlettype": [ "" ],
                                    "patching_rect": [ 356.0, 140.0, 100.0, 23.0 ],
                                    "rnbo_classname": "set",
                                    "rnbo_serial": 3,
                                    "rnbo_uniqueid": "set_obj-32",
                                    "rnboinfo": {
                                        "needsInstanceInfo": 1,
                                        "argnames": {
                                            "name": {
                                                "attrOrProp": 2,
                                                "digest": "attribute/param to control",
                                                "defaultarg": 1,
                                                "isalias": 0,
                                                "aliases": [],
                                                "settable": 1,
                                                "attachable": 0,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "type": "symbol",
                                                "mandatory": 1
                                            }
                                        },
                                        "inputs": [
                                            {
                                                "name": "input",
                                                "type": [ "bang", "number", "list", "signal" ],
                                                "digest": "attribute or parameter value (bang, number, list)",
                                                "hot": 1,
                                                "docked": 0
                                            }
                                        ],
                                        "outputs": [
                                            {
                                                "name": "output",
                                                "type": [ "bang", "number", "list", "signal" ],
                                                "digest": "connect to first inlet of gen or subpatcher",
                                                "docked": 0
                                            }
                                        ],
                                        "helpname": "set",
                                        "aliasOf": "set",
                                        "classname": "set",
                                        "operator": 0,
                                        "versionId": 1197449671,
                                        "changesPatcherIO": 0
                                    },
                                    "text": "set depth"
                                }
                            },
                            {
                                "box": {
                                    "id": "obj-30",
                                    "maxclass": "newobj",
                                    "numinlets": 1,
                                    "numoutlets": 1,
                                    "outlettype": [ "" ],
                                    "patching_rect": [ 30.0, 120.0, 100.0, 23.0 ],
                                    "rnbo_classname": "set",
                                    "rnbo_serial": 4,
                                    "rnbo_uniqueid": "set_obj-30",
                                    "rnboinfo": {
                                        "needsInstanceInfo": 1,
                                        "argnames": {
                                            "name": {
                                                "attrOrProp": 2,
                                                "digest": "attribute/param to control",
                                                "defaultarg": 1,
                                                "isalias": 0,
                                                "aliases": [],
                                                "settable": 1,
                                                "attachable": 0,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "type": "symbol",
                                                "mandatory": 1
                                            }
                                        },
                                        "inputs": [
                                            {
                                                "name": "input",
                                                "type": [ "bang", "number", "list", "signal" ],
                                                "digest": "attribute or parameter value (bang, number, list)",
                                                "hot": 1,
                                                "docked": 0
                                            }
                                        ],
                                        "outputs": [
                                            {
                                                "name": "output",
                                                "type": [ "bang", "number", "list", "signal" ],
                                                "digest": "connect to first inlet of gen or subpatcher",
                                                "docked": 0
                                            }
                                        ],
                                        "helpname": "set",
                                        "aliasOf": "set",
                                        "classname": "set",
                                        "operator": 0,
                                        "versionId": 1197449671,
                                        "changesPatcherIO": 0
                                    },
                                    "text": "set carrier"
                                }
                            },
                            {
                                "box": {
                                    "id": "obj-28",
                                    "maxclass": "newobj",
                                    "numinlets": 1,
                                    "numoutlets": 1,
                                    "outlettype": [ "" ],
                                    "patching_rect": [ 227.0, 120.0, 100.0, 23.0 ],
                                    "rnbo_classname": "set",
                                    "rnbo_serial": 5,
                                    "rnbo_uniqueid": "t60[1]",
                                    "rnboinfo": {
                                        "needsInstanceInfo": 1,
                                        "argnames": {
                                            "name": {
                                                "attrOrProp": 2,
                                                "digest": "attribute/param to control",
                                                "defaultarg": 1,
                                                "isalias": 0,
                                                "aliases": [],
                                                "settable": 1,
                                                "attachable": 0,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "type": "symbol",
                                                "mandatory": 1
                                            }
                                        },
                                        "inputs": [
                                            {
                                                "name": "input",
                                                "type": [ "bang", "number", "list", "signal" ],
                                                "digest": "attribute or parameter value (bang, number, list)",
                                                "hot": 1,
                                                "docked": 0
                                            }
                                        ],
                                        "outputs": [
                                            {
                                                "name": "output",
                                                "type": [ "bang", "number", "list", "signal" ],
                                                "digest": "connect to first inlet of gen or subpatcher",
                                                "docked": 0
                                            }
                                        ],
                                        "helpname": "set",
                                        "aliasOf": "set",
                                        "classname": "set",
                                        "operator": 0,
                                        "versionId": 1197449671,
                                        "changesPatcherIO": 0
                                    },
                                    "text": "set t60",
                                    "varname": "t60[1]"
                                }
                            },
                            {
                                "box": {
                                    "id": "obj-26",
                                    "maxclass": "newobj",
                                    "numinlets": 2,
                                    "numoutlets": 1,
                                    "outlettype": [ "" ],
                                    "patching_rect": [ 150.0, 57.0, 100.0, 23.0 ],
                                    "rnbo_classname": ">",
                                    "rnbo_extra_attributes": {
                                        "hot": 0
                                    },
                                    "rnbo_serial": 1,
                                    "rnbo_uniqueid": ">_obj-26",
                                    "text": "> 0"
                                }
                            },
                            {
                                "box": {
                                    "id": "obj-12",
                                    "maxclass": "newobj",
                                    "numinlets": 2,
                                    "numoutlets": 4,
                                    "outlettype": [ "", "", "", "" ],
                                    "patching_rect": [ 60.0, 12.0, 51.0, 23.0 ],
                                    "rnbo_classname": "notein",
                                    "rnbo_serial": 1,
                                    "rnbo_uniqueid": "notein_obj-12",
                                    "text": "notein"
                                }
                            },
                            {
                                "box": {
                                    "id": "obj-13",
                                    "maxclass": "newobj",
                                    "numinlets": 2,
                                    "numoutlets": 1,
                                    "outlettype": [ "" ],
                                    "patching_rect": [ 60.0, 57.0, 40.0, 23.0 ],
                                    "rnbo_classname": "mtof",
                                    "rnbo_extra_attributes": {
                                        "scalename": "",
                                        "filter": 1.0
                                    },
                                    "rnbo_serial": 1,
                                    "rnbo_uniqueid": "mtof_obj-13",
                                    "rnboinfo": {
                                        "needsInstanceInfo": 1,
                                        "argnames": {
                                            "midivalue": {
                                                "attrOrProp": 1,
                                                "digest": "MIDI Note Number",
                                                "isalias": 0,
                                                "aliases": [],
                                                "settable": 1,
                                                "attachable": 0,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "inlet": 1,
                                                "type": "list"
                                            },
                                            "tuning": {
                                                "attrOrProp": 1,
                                                "digest": "Set base frequency",
                                                "isalias": 0,
                                                "aliases": [],
                                                "attachable": 0,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "inlet": 1,
                                                "type": "number"
                                            },
                                            "scale": {
                                                "attrOrProp": 1,
                                                "digest": "Scala scl formatted list",
                                                "isalias": 0,
                                                "aliases": [],
                                                "settable": 1,
                                                "attachable": 1,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "type": "list"
                                            },
                                            "map": {
                                                "attrOrProp": 1,
                                                "digest": "Scala kbm formatted list",
                                                "isalias": 0,
                                                "aliases": [],
                                                "settable": 1,
                                                "attachable": 1,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "type": "list"
                                            },
                                            "ref": {
                                                "attrOrProp": 1,
                                                "digest": "Reference note for which the 'base' frequency is given",
                                                "isalias": 0,
                                                "aliases": [],
                                                "settable": 1,
                                                "attachable": 1,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "type": "number",
                                                "defaultValue": "69"
                                            },
                                            "mid": {
                                                "attrOrProp": 1,
                                                "digest": "Middle note where the first scale degree is mapped",
                                                "isalias": 0,
                                                "aliases": [],
                                                "settable": 1,
                                                "attachable": 1,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "type": "number",
                                                "defaultValue": "60"
                                            },
                                            "base": {
                                                "attrOrProp": 1,
                                                "digest": "Frequency to tune 'ref' note to",
                                                "isalias": 0,
                                                "aliases": [],
                                                "settable": 1,
                                                "attachable": 1,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "type": "number",
                                                "defaultValue": "440"
                                            },
                                            "out": {
                                                "attrOrProp": 1,
                                                "digest": "Frequency (Hz)",
                                                "isalias": 0,
                                                "aliases": [],
                                                "attachable": 0,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "outlet": 1,
                                                "type": "list"
                                            },
                                            "scalename": {
                                                "attrOrProp": 2,
                                                "digest": "Scale Name",
                                                "defaultarg": 1,
                                                "isalias": 0,
                                                "aliases": [],
                                                "settable": 1,
                                                "attachable": 0,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "type": "symbol"
                                            },
                                            "filter": {
                                                "attrOrProp": 2,
                                                "digest": "Filter unmapped values",
                                                "isalias": 0,
                                                "aliases": [],
                                                "settable": 1,
                                                "attachable": 0,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "type": "number",
                                                "defaultValue": "1"
                                            }
                                        },
                                        "inputs": [
                                            {
                                                "name": "midivalue",
                                                "type": "list",
                                                "digest": "MIDI Note Number",
                                                "hot": 1,
                                                "docked": 0
                                            },
                                            {
                                                "name": "tuning",
                                                "type": "number",
                                                "digest": "Set base frequency",
                                                "docked": 0
                                            }
                                        ],
                                        "outputs": [
                                            {
                                                "name": "out",
                                                "type": "list",
                                                "digest": "Frequency (Hz)",
                                                "docked": 0
                                            }
                                        ],
                                        "helpname": "mtof",
                                        "aliasOf": "mtof",
                                        "classname": "mtof",
                                        "operator": 0,
                                        "versionId": 950896033,
                                        "changesPatcherIO": 0
                                    },
                                    "text": "mtof"
                                }
                            },
                            {
                                "box": {
                                    "id": "obj-5",
                                    "maxclass": "newobj",
                                    "numinlets": 1,
                                    "numoutlets": 0,
                                    "patching_rect": [ 245.0, 364.0, 100.0, 23.0 ],
                                    "rnbo_classname": "out~",
                                    "rnbo_extra_attributes": {
                                        "meta": "",
                                        "comment": ""
                                    },
                                    "rnbo_serial": 1,
                                    "rnbo_uniqueid": "out~_obj-5",
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
                                    "id": "obj-4",
                                    "maxclass": "newobj",
                                    "numinlets": 1,
                                    "numoutlets": 0,
                                    "patching_rect": [ 125.0, 364.0, 100.0, 23.0 ],
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
                                    "fontname": "Lato",
                                    "fontsize": 12.0,
                                    "id": "obj-17",
                                    "maxclass": "newobj",
                                    "numinlets": 2,
                                    "numoutlets": 2,
                                    "outlettype": [ "", "" ],
                                    "patching_rect": [ 425.0, 183.0, 215.0, 23.0 ],
                                    "rnbo_classname": "param",
                                    "rnbo_extra_attributes": {
                                        "meta": "",
                                        "tonormalized": "",
                                        "ctlin": -1.0,
                                        "enum": "",
                                        "fromnormalized": "",
                                        "steps": 0.0,
                                        "unit": "",
                                        "order": "0",
                                        "displayorder": "-",
                                        "preset": 1,
                                        "displayname": "",
                                        "sendinit": 1,
                                        "exponent": 1.0
                                    },
                                    "rnbo_serial": 3,
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
                                                "defaultValue": "0.98"
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
                                    "text": "param smooth 0.98 @min 0 @max 0.99",
                                    "varname": "smooth"
                                }
                            },
                            {
                                "box": {
                                    "fontname": "Lato",
                                    "fontsize": 12.0,
                                    "id": "obj-14",
                                    "maxclass": "newobj",
                                    "numinlets": 2,
                                    "numoutlets": 2,
                                    "outlettype": [ "", "" ],
                                    "patching_rect": [ 286.0, 57.0, 191.0, 23.0 ],
                                    "rnbo_classname": "param",
                                    "rnbo_extra_attributes": {
                                        "meta": "",
                                        "tonormalized": "",
                                        "ctlin": -1.0,
                                        "enum": "",
                                        "fromnormalized": "",
                                        "steps": 0.0,
                                        "unit": "",
                                        "order": "0",
                                        "displayorder": "-",
                                        "preset": 1,
                                        "displayname": "",
                                        "sendinit": 1,
                                        "exponent": 1.0
                                    },
                                    "rnbo_serial": 4,
                                    "rnbo_uniqueid": "depth",
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
                                                "defaultValue": "1"
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
                                    "text": "param depth 1 @min -10 @max 10",
                                    "varname": "depth"
                                }
                            },
                            {
                                "box": {
                                    "fontname": "Lato",
                                    "fontsize": 12.0,
                                    "id": "obj-3",
                                    "maxclass": "newobj",
                                    "numinlets": 2,
                                    "numoutlets": 2,
                                    "outlettype": [ "", "" ],
                                    "patching_rect": [ 479.0, 98.0, 173.0, 23.0 ],
                                    "rnbo_classname": "param",
                                    "rnbo_extra_attributes": {
                                        "meta": "",
                                        "tonormalized": "",
                                        "ctlin": -1.0,
                                        "enum": "",
                                        "fromnormalized": "",
                                        "steps": 0.0,
                                        "unit": "",
                                        "order": "0",
                                        "displayorder": "-",
                                        "preset": 1,
                                        "displayname": "",
                                        "sendinit": 1,
                                        "exponent": 1.0
                                    },
                                    "rnbo_serial": 5,
                                    "rnbo_uniqueid": "ratio",
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
                                                "defaultValue": "1"
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
                                    "text": "param ratio 1 @min 0 @max 10",
                                    "varname": "ratio"
                                }
                            },
                            {
                                "box": {
                                    "fontname": "Lato",
                                    "fontsize": 12.0,
                                    "genpatcher": {
                                        "patcher": {
                                            "fileversion": 1,
                                            "appversion": {
                                                "major": 9,
                                                "minor": 1,
                                                "revision": 2,
                                                "architecture": "x64",
                                                "modernui": 1
                                            },
                                            "classnamespace": "dsp.gen",
                                            "rect": [ 33.0, 90.0, 777.0, 423.0 ],
                                            "default_fontname": "Lato",
                                            "integercoordinates": 1,
                                            "boxes": [
                                                {
                                                    "box": {
                                                        "maxclass": "newobj",
                                                        "text": "in 2",
                                                        "patching_rect": [ 931.0, 70.0, 100.0, 23.0 ],
                                                        "numinlets": 0,
                                                        "id": "obj-12",
                                                        "numoutlets": 1,
                                                        "outlettype": [ "" ]
                                                    }
                                                },
                                                {
                                                    "box": {
                                                        "maxclass": "newobj",
                                                        "text": "expr in1*2*PI/samplerate",
                                                        "patching_rect": [ 45.0, 90.0, 143.0, 23.0 ],
                                                        "fontname": "Lato",
                                                        "numinlets": 1,
                                                        "id": "obj-39",
                                                        "numoutlets": 1,
                                                        "fontsize": 12.0,
                                                        "outlettype": [ "" ]
                                                    }
                                                },
                                                {
                                                    "box": {
                                                        "maxclass": "comment",
                                                        "text": "Stereo effect with 2 modulators (phase shifted)",
                                                        "linecount": 2,
                                                        "patching_rect": [ 450.0, 165.0, 155.0, 35.0 ],
                                                        "fontname": "Lato",
                                                        "numinlets": 1,
                                                        "id": "obj-30",
                                                        "numoutlets": 0,
                                                        "fontsize": 12.0
                                                    }
                                                },
                                                {
                                                    "box": {
                                                        "maxclass": "comment",
                                                        "text": "Stereo effect with 2 carriers",
                                                        "linecount": 2,
                                                        "patching_rect": [ 315.0, 300.0, 153.0, 35.0 ],
                                                        "fontname": "Lato",
                                                        "numinlets": 1,
                                                        "id": "obj-29",
                                                        "numoutlets": 0,
                                                        "fontsize": 12.0
                                                    }
                                                },
                                                {
                                                    "box": {
                                                        "maxclass": "comment",
                                                        "text": "Smoothed envelope: convert t60 to recursive scalar, and smooth with a running average",
                                                        "linecount": 4,
                                                        "patching_rect": [ 600.0, 75.0, 155.0, 64.0 ],
                                                        "fontname": "Lato",
                                                        "numinlets": 1,
                                                        "id": "obj-13",
                                                        "numoutlets": 0,
                                                        "fontsize": 12.0
                                                    }
                                                },
                                                {
                                                    "box": {
                                                        "maxclass": "newobj",
                                                        "text": "out 2",
                                                        "patching_rect": [ 255.0, 420.0, 37.0, 23.0 ],
                                                        "fontname": "Lato",
                                                        "numinlets": 1,
                                                        "id": "obj-33",
                                                        "numoutlets": 0,
                                                        "fontsize": 12.0
                                                    }
                                                },
                                                {
                                                    "box": {
                                                        "maxclass": "newobj",
                                                        "text": "out 1",
                                                        "patching_rect": [ 45.0, 420.0, 37.0, 23.0 ],
                                                        "fontname": "Lato",
                                                        "numinlets": 1,
                                                        "id": "obj-42",
                                                        "numoutlets": 0,
                                                        "fontsize": 12.0
                                                    }
                                                },
                                                {
                                                    "box": {
                                                        "maxclass": "newobj",
                                                        "text": "*",
                                                        "patching_rect": [ 270.0, 195.0, 32.5, 23.0 ],
                                                        "fontname": "Lato",
                                                        "numinlets": 2,
                                                        "id": "obj-31",
                                                        "numoutlets": 1,
                                                        "fontsize": 12.0,
                                                        "outlettype": [ "" ]
                                                    }
                                                },
                                                {
                                                    "box": {
                                                        "maxclass": "newobj",
                                                        "text": "*",
                                                        "patching_rect": [ 255.0, 390.0, 32.5, 23.0 ],
                                                        "fontname": "Lato",
                                                        "numinlets": 2,
                                                        "id": "obj-37",
                                                        "numoutlets": 1,
                                                        "fontsize": 12.0,
                                                        "outlettype": [ "" ]
                                                    }
                                                },
                                                {
                                                    "box": {
                                                        "maxclass": "newobj",
                                                        "text": "*",
                                                        "patching_rect": [ 270.0, 240.0, 32.5, 23.0 ],
                                                        "fontname": "Lato",
                                                        "numinlets": 2,
                                                        "id": "obj-6",
                                                        "numoutlets": 1,
                                                        "fontsize": 12.0,
                                                        "outlettype": [ "" ]
                                                    }
                                                },
                                                {
                                                    "box": {
                                                        "maxclass": "newobj",
                                                        "text": "cos",
                                                        "patching_rect": [ 390.0, 195.0, 32.5, 23.0 ],
                                                        "fontname": "Lato",
                                                        "numinlets": 1,
                                                        "id": "obj-22",
                                                        "numoutlets": 1,
                                                        "fontsize": 12.0,
                                                        "outlettype": [ "" ]
                                                    }
                                                },
                                                {
                                                    "box": {
                                                        "maxclass": "newobj",
                                                        "text": "accum",
                                                        "patching_rect": [ 390.0, 165.0, 46.0, 23.0 ],
                                                        "fontname": "Lato",
                                                        "numinlets": 2,
                                                        "id": "obj-28",
                                                        "numoutlets": 1,
                                                        "fontsize": 12.0,
                                                        "outlettype": [ "" ]
                                                    }
                                                },
                                                {
                                                    "box": {
                                                        "maxclass": "newobj",
                                                        "text": "sin",
                                                        "patching_rect": [ 255.0, 330.0, 46.0, 23.0 ],
                                                        "fontname": "Lato",
                                                        "numinlets": 1,
                                                        "id": "obj-34",
                                                        "numoutlets": 1,
                                                        "fontsize": 12.0,
                                                        "outlettype": [ "" ]
                                                    }
                                                },
                                                {
                                                    "box": {
                                                        "maxclass": "newobj",
                                                        "text": "accum",
                                                        "patching_rect": [ 255.0, 300.0, 46.0, 23.0 ],
                                                        "fontname": "Lato",
                                                        "numinlets": 2,
                                                        "id": "obj-35",
                                                        "numoutlets": 1,
                                                        "fontsize": 12.0,
                                                        "outlettype": [ "" ]
                                                    }
                                                },
                                                {
                                                    "box": {
                                                        "maxclass": "newobj",
                                                        "text": "param smooth 0.98",
                                                        "patching_rect": [ 691.0, 279.0, 115.0, 23.0 ],
                                                        "fontname": "Lato",
                                                        "numinlets": 0,
                                                        "id": "obj-17",
                                                        "numoutlets": 1,
                                                        "fontsize": 12.0,
                                                        "outlettype": [ "" ]
                                                    }
                                                },
                                                {
                                                    "box": {
                                                        "maxclass": "newobj",
                                                        "text": "sub",
                                                        "patching_rect": [ 630.0, 285.0, 32.5, 23.0 ],
                                                        "fontname": "Lato",
                                                        "numinlets": 2,
                                                        "id": "obj-16",
                                                        "numoutlets": 1,
                                                        "fontsize": 12.0,
                                                        "outlettype": [ "" ]
                                                    }
                                                },
                                                {
                                                    "box": {
                                                        "maxclass": "newobj",
                                                        "text": "*",
                                                        "patching_rect": [ 630.0, 315.0, 32.5, 23.0 ],
                                                        "fontname": "Lato",
                                                        "numinlets": 2,
                                                        "id": "obj-18",
                                                        "numoutlets": 1,
                                                        "fontsize": 12.0,
                                                        "outlettype": [ "" ]
                                                    }
                                                },
                                                {
                                                    "box": {
                                                        "maxclass": "newobj",
                                                        "text": "history l",
                                                        "patching_rect": [ 600.0, 345.0, 52.0, 23.0 ],
                                                        "fontname": "Lato",
                                                        "numinlets": 1,
                                                        "id": "obj-19",
                                                        "numoutlets": 1,
                                                        "fontsize": 12.0,
                                                        "outlettype": [ "" ]
                                                    }
                                                },
                                                {
                                                    "box": {
                                                        "maxclass": "newobj",
                                                        "text": "* samplerate",
                                                        "patching_rect": [ 780.0, 120.0, 78.0, 23.0 ],
                                                        "fontname": "Lato",
                                                        "numinlets": 1,
                                                        "id": "obj-20",
                                                        "numoutlets": 1,
                                                        "fontsize": 12.0,
                                                        "outlettype": [ "" ]
                                                    }
                                                },
                                                {
                                                    "box": {
                                                        "maxclass": "newobj",
                                                        "text": "param t60 1",
                                                        "patching_rect": [ 780.0, 90.0, 76.0, 23.0 ],
                                                        "fontname": "Lato",
                                                        "numinlets": 0,
                                                        "id": "obj-21",
                                                        "numoutlets": 1,
                                                        "fontsize": 12.0,
                                                        "outlettype": [ "" ]
                                                    }
                                                },
                                                {
                                                    "box": {
                                                        "maxclass": "newobj",
                                                        "text": "t60",
                                                        "patching_rect": [ 780.0, 180.0, 27.0, 23.0 ],
                                                        "fontname": "Lato",
                                                        "numinlets": 1,
                                                        "id": "obj-23",
                                                        "numoutlets": 1,
                                                        "fontsize": 12.0,
                                                        "outlettype": [ "" ]
                                                    }
                                                },
                                                {
                                                    "box": {
                                                        "maxclass": "newobj",
                                                        "text": "*",
                                                        "patching_rect": [ 45.0, 390.0, 32.5, 23.0 ],
                                                        "fontname": "Lato",
                                                        "numinlets": 2,
                                                        "id": "obj-25",
                                                        "numoutlets": 1,
                                                        "fontsize": 12.0,
                                                        "outlettype": [ "" ]
                                                    }
                                                },
                                                {
                                                    "box": {
                                                        "maxclass": "newobj",
                                                        "text": "*",
                                                        "patching_rect": [ 675.0, 210.0, 32.5, 23.0 ],
                                                        "fontname": "Lato",
                                                        "numinlets": 2,
                                                        "id": "obj-26",
                                                        "numoutlets": 1,
                                                        "fontsize": 12.0,
                                                        "outlettype": [ "" ]
                                                    }
                                                },
                                                {
                                                    "box": {
                                                        "maxclass": "newobj",
                                                        "text": "history amp 0",
                                                        "patching_rect": [ 675.0, 171.0, 85.0, 23.0 ],
                                                        "fontname": "Lato",
                                                        "numinlets": 1,
                                                        "id": "obj-27",
                                                        "numoutlets": 1,
                                                        "fontsize": 12.0,
                                                        "outlettype": [ "" ]
                                                    }
                                                },
                                                {
                                                    "box": {
                                                        "maxclass": "newobj",
                                                        "text": "*",
                                                        "patching_rect": [ 60.0, 240.0, 32.5, 23.0 ],
                                                        "fontname": "Lato",
                                                        "numinlets": 2,
                                                        "id": "obj-15",
                                                        "numoutlets": 1,
                                                        "fontsize": 12.0,
                                                        "outlettype": [ "" ]
                                                    }
                                                },
                                                {
                                                    "box": {
                                                        "maxclass": "newobj",
                                                        "text": "param depth 2",
                                                        "patching_rect": [ 75.0, 150.0, 90.0, 23.0 ],
                                                        "fontname": "Lato",
                                                        "numinlets": 0,
                                                        "id": "obj-14",
                                                        "numoutlets": 1,
                                                        "fontsize": 12.0,
                                                        "outlettype": [ "" ]
                                                    }
                                                },
                                                {
                                                    "box": {
                                                        "maxclass": "newobj",
                                                        "text": "sin",
                                                        "patching_rect": [ 180.0, 195.0, 32.5, 23.0 ],
                                                        "fontname": "Lato",
                                                        "numinlets": 1,
                                                        "id": "obj-9",
                                                        "numoutlets": 1,
                                                        "fontsize": 12.0,
                                                        "outlettype": [ "" ]
                                                    }
                                                },
                                                {
                                                    "box": {
                                                        "maxclass": "newobj",
                                                        "text": "accum",
                                                        "patching_rect": [ 180.0, 165.0, 46.0, 23.0 ],
                                                        "fontname": "Lato",
                                                        "numinlets": 2,
                                                        "id": "obj-10",
                                                        "numoutlets": 1,
                                                        "fontsize": 12.0,
                                                        "outlettype": [ "" ]
                                                    }
                                                },
                                                {
                                                    "box": {
                                                        "maxclass": "newobj",
                                                        "text": "*",
                                                        "patching_rect": [ 180.0, 135.0, 32.5, 23.0 ],
                                                        "fontname": "Lato",
                                                        "numinlets": 2,
                                                        "id": "obj-5",
                                                        "numoutlets": 1,
                                                        "fontsize": 12.0,
                                                        "outlettype": [ "" ]
                                                    }
                                                },
                                                {
                                                    "box": {
                                                        "maxclass": "newobj",
                                                        "text": "*",
                                                        "patching_rect": [ 60.0, 195.0, 32.5, 23.0 ],
                                                        "fontname": "Lato",
                                                        "numinlets": 2,
                                                        "id": "obj-8",
                                                        "numoutlets": 1,
                                                        "fontsize": 12.0,
                                                        "outlettype": [ "" ]
                                                    }
                                                },
                                                {
                                                    "box": {
                                                        "maxclass": "newobj",
                                                        "text": "param ratio 1",
                                                        "patching_rect": [ 193.5, 45.0, 153.0, 23.0 ],
                                                        "fontname": "Lato",
                                                        "numinlets": 0,
                                                        "id": "obj-3",
                                                        "numoutlets": 1,
                                                        "fontsize": 12.0,
                                                        "outlettype": [ "" ]
                                                    }
                                                },
                                                {
                                                    "box": {
                                                        "maxclass": "newobj",
                                                        "text": "sin",
                                                        "patching_rect": [ 45.0, 330.0, 32.5, 23.0 ],
                                                        "fontname": "Lato",
                                                        "numinlets": 1,
                                                        "id": "obj-7",
                                                        "numoutlets": 1,
                                                        "fontsize": 12.0,
                                                        "outlettype": [ "" ]
                                                    }
                                                },
                                                {
                                                    "box": {
                                                        "maxclass": "newobj",
                                                        "text": "accum",
                                                        "patching_rect": [ 45.0, 300.0, 46.0, 23.0 ],
                                                        "fontname": "Lato",
                                                        "numinlets": 2,
                                                        "id": "obj-4",
                                                        "numoutlets": 1,
                                                        "fontsize": 12.0,
                                                        "outlettype": [ "" ]
                                                    }
                                                },
                                                {
                                                    "box": {
                                                        "maxclass": "newobj",
                                                        "text": "param carrier 440",
                                                        "patching_rect": [ 45.0, 45.0, 132.0, 23.0 ],
                                                        "fontname": "Lato",
                                                        "numinlets": 0,
                                                        "id": "obj-1",
                                                        "numoutlets": 1,
                                                        "fontsize": 12.0,
                                                        "outlettype": [ "" ]
                                                    }
                                                }
                                            ],
                                            "lines": [
                                                {
                                                    "patchline": {
                                                        "source": [ "obj-9", 0 ],
                                                        "destination": [ "obj-15", 1 ],
                                                        "midpoints": [ 189.5, 220.0, 83.0, 220.0 ]
                                                    }
                                                },
                                                {
                                                    "patchline": {
                                                        "source": [ "obj-8", 0 ],
                                                        "destination": [ "obj-15", 0 ]
                                                    }
                                                },
                                                {
                                                    "patchline": {
                                                        "source": [ "obj-7", 0 ],
                                                        "destination": [ "obj-25", 0 ]
                                                    }
                                                },
                                                {
                                                    "patchline": {
                                                        "source": [ "obj-6", 0 ],
                                                        "destination": [ "obj-35", 0 ],
                                                        "midpoints": [ 279.5, 287.0, 264.5, 287.0 ]
                                                    }
                                                },
                                                {
                                                    "patchline": {
                                                        "source": [ "obj-5", 0 ],
                                                        "destination": [ "obj-35", 0 ],
                                                        "midpoints": [ 189.5, 160.5, 264.5, 160.5 ],
                                                        "order": 1
                                                    }
                                                },
                                                {
                                                    "patchline": {
                                                        "source": [ "obj-5", 0 ],
                                                        "destination": [ "obj-31", 0 ],
                                                        "midpoints": [ 189.5, 160.5, 279.5, 160.5 ],
                                                        "order": 0
                                                    }
                                                },
                                                {
                                                    "patchline": {
                                                        "source": [ "obj-5", 0 ],
                                                        "destination": [ "obj-10", 0 ],
                                                        "order": 2
                                                    }
                                                },
                                                {
                                                    "patchline": {
                                                        "source": [ "obj-4", 0 ],
                                                        "destination": [ "obj-7", 0 ]
                                                    }
                                                },
                                                {
                                                    "patchline": {
                                                        "source": [ "obj-39", 0 ],
                                                        "destination": [ "obj-8", 0 ],
                                                        "midpoints": [ 54.5, 159.5, 69.5, 159.5 ],
                                                        "order": 2
                                                    }
                                                },
                                                {
                                                    "patchline": {
                                                        "source": [ "obj-39", 0 ],
                                                        "destination": [ "obj-5", 0 ],
                                                        "midpoints": [ 54.5, 129.5, 189.5, 129.5 ],
                                                        "order": 1
                                                    }
                                                },
                                                {
                                                    "patchline": {
                                                        "source": [ "obj-39", 0 ],
                                                        "destination": [ "obj-4", 0 ],
                                                        "order": 3
                                                    }
                                                },
                                                {
                                                    "patchline": {
                                                        "source": [ "obj-39", 0 ],
                                                        "destination": [ "obj-28", 0 ],
                                                        "midpoints": [ 54.5, 129.5, 399.5, 129.5 ],
                                                        "order": 0
                                                    }
                                                },
                                                {
                                                    "patchline": {
                                                        "source": [ "obj-37", 0 ],
                                                        "destination": [ "obj-33", 0 ]
                                                    }
                                                },
                                                {
                                                    "patchline": {
                                                        "source": [ "obj-35", 0 ],
                                                        "destination": [ "obj-34", 0 ]
                                                    }
                                                },
                                                {
                                                    "patchline": {
                                                        "source": [ "obj-34", 0 ],
                                                        "destination": [ "obj-37", 0 ]
                                                    }
                                                },
                                                {
                                                    "patchline": {
                                                        "source": [ "obj-31", 0 ],
                                                        "destination": [ "obj-6", 0 ]
                                                    }
                                                },
                                                {
                                                    "patchline": {
                                                        "source": [ "obj-28", 0 ],
                                                        "destination": [ "obj-22", 0 ]
                                                    }
                                                },
                                                {
                                                    "patchline": {
                                                        "source": [ "obj-27", 0 ],
                                                        "destination": [ "obj-26", 0 ],
                                                        "order": 0
                                                    }
                                                },
                                                {
                                                    "patchline": {
                                                        "source": [ "obj-27", 0 ],
                                                        "destination": [ "obj-19", 0 ],
                                                        "midpoints": [ 684.5, 207.0, 609.5, 207.0 ],
                                                        "order": 2
                                                    }
                                                },
                                                {
                                                    "patchline": {
                                                        "source": [ "obj-27", 0 ],
                                                        "destination": [ "obj-16", 1 ],
                                                        "midpoints": [ 684.5, 207.0, 653.0, 207.0 ],
                                                        "order": 1
                                                    }
                                                },
                                                {
                                                    "patchline": {
                                                        "source": [ "obj-26", 0 ],
                                                        "destination": [ "obj-27", 0 ],
                                                        "midpoints": [ 684.5, 239.0, 767.5, 239.0, 767.5, 162.0, 684.5, 162.0 ]
                                                    }
                                                },
                                                {
                                                    "patchline": {
                                                        "source": [ "obj-25", 0 ],
                                                        "destination": [ "obj-42", 0 ]
                                                    }
                                                },
                                                {
                                                    "patchline": {
                                                        "source": [ "obj-23", 0 ],
                                                        "destination": [ "obj-26", 1 ],
                                                        "midpoints": [ 789.5, 204.5, 698.0, 204.5 ]
                                                    }
                                                },
                                                {
                                                    "patchline": {
                                                        "source": [ "obj-22", 0 ],
                                                        "destination": [ "obj-6", 1 ],
                                                        "midpoints": [ 399.5, 227.0, 293.0, 227.0 ]
                                                    }
                                                },
                                                {
                                                    "patchline": {
                                                        "source": [ "obj-21", 0 ],
                                                        "destination": [ "obj-20", 0 ]
                                                    }
                                                },
                                                {
                                                    "patchline": {
                                                        "source": [ "obj-20", 0 ],
                                                        "destination": [ "obj-23", 0 ]
                                                    }
                                                },
                                                {
                                                    "patchline": {
                                                        "source": [ "obj-19", 0 ],
                                                        "destination": [ "obj-37", 1 ],
                                                        "midpoints": [ 609.5, 374.0, 278.0, 374.0 ],
                                                        "order": 1
                                                    }
                                                },
                                                {
                                                    "patchline": {
                                                        "source": [ "obj-19", 0 ],
                                                        "destination": [ "obj-25", 1 ],
                                                        "midpoints": [ 609.5, 374.5, 68.0, 374.5 ],
                                                        "order": 2
                                                    }
                                                },
                                                {
                                                    "patchline": {
                                                        "source": [ "obj-19", 0 ],
                                                        "destination": [ "obj-16", 0 ],
                                                        "midpoints": [ 609.5, 374.0, 673.5, 374.0, 673.5, 275.0, 639.5, 275.0 ],
                                                        "order": 0
                                                    }
                                                },
                                                {
                                                    "patchline": {
                                                        "source": [ "obj-18", 0 ],
                                                        "destination": [ "obj-19", 0 ],
                                                        "midpoints": [ 639.5, 339.5, 609.5, 339.5 ]
                                                    }
                                                },
                                                {
                                                    "patchline": {
                                                        "source": [ "obj-17", 0 ],
                                                        "destination": [ "obj-18", 1 ],
                                                        "midpoints": [ 700.5, 309.5, 653.0, 309.5 ]
                                                    }
                                                },
                                                {
                                                    "patchline": {
                                                        "source": [ "obj-16", 0 ],
                                                        "destination": [ "obj-18", 0 ]
                                                    }
                                                },
                                                {
                                                    "patchline": {
                                                        "source": [ "obj-15", 0 ],
                                                        "destination": [ "obj-4", 0 ],
                                                        "midpoints": [ 69.5, 287.0, 54.5, 287.0 ]
                                                    }
                                                },
                                                {
                                                    "patchline": {
                                                        "source": [ "obj-14", 0 ],
                                                        "destination": [ "obj-8", 1 ],
                                                        "order": 1
                                                    }
                                                },
                                                {
                                                    "patchline": {
                                                        "source": [ "obj-14", 0 ],
                                                        "destination": [ "obj-31", 1 ],
                                                        "midpoints": [ 84.5, 189.5, 293.0, 189.5 ],
                                                        "order": 0
                                                    }
                                                },
                                                {
                                                    "patchline": {
                                                        "source": [ "obj-10", 0 ],
                                                        "destination": [ "obj-9", 0 ]
                                                    }
                                                },
                                                {
                                                    "patchline": {
                                                        "source": [ "obj-1", 0 ],
                                                        "destination": [ "obj-39", 0 ]
                                                    }
                                                },
                                                {
                                                    "patchline": {
                                                        "source": [ "obj-3", 0 ],
                                                        "destination": [ "obj-5", 1 ]
                                                    }
                                                },
                                                {
                                                    "patchline": {
                                                        "source": [ "obj-12", 0 ],
                                                        "destination": [ "obj-27", 0 ]
                                                    }
                                                }
                                            ]
                                        }
                                    },
                                    "id": "obj-1",
                                    "maxclass": "newobj",
                                    "numinlets": 2,
                                    "numoutlets": 2,
                                    "outlettype": [ "signal", "signal" ],
                                    "patching_rect": [ 160.0, 194.0, 65.0, 23.0 ],
                                    "rnbo_classname": "gen~",
                                    "rnbo_extra_attributes": {
                                        "exposeparams": 0
                                    },
                                    "rnbo_serial": 1,
                                    "rnbo_uniqueid": "gen~_obj-1",
                                    "rnboinfo": {
                                        "needsInstanceInfo": 1,
                                        "argnames": {
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
                                                "type": "number"
                                            },
                                            "reset": {
                                                "attrOrProp": 1,
                                                "digest": "Reset all param and history objects to initial values",
                                                "isalias": 0,
                                                "aliases": [],
                                                "attachable": 1,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "type": "bang"
                                            },
                                            "expr": {
                                                "attrOrProp": 2,
                                                "digest": "a gen expression",
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
                                                "digest": "gendsp file to load",
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
                                            "title": {
                                                "attrOrProp": 2,
                                                "digest": "a title",
                                                "defaultarg": 1,
                                                "isalias": 0,
                                                "aliases": [ "t" ],
                                                "settable": 1,
                                                "attachable": 0,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "type": "symbol",
                                                "doNotShowInMaxInspector": 1
                                            },
                                            "t": {
                                                "attrOrProp": 2,
                                                "digest": "a title",
                                                "defaultarg": 1,
                                                "isalias": 1,
                                                "aliasOf": "title",
                                                "aliases": [],
                                                "settable": 1,
                                                "attachable": 0,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "type": "symbol"
                                            },
                                            "exposeparams": {
                                                "attrOrProp": 2,
                                                "digest": "Expose gen params as RNBO params.",
                                                "isalias": 0,
                                                "aliases": [],
                                                "settable": 1,
                                                "attachable": 0,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "type": "bool",
                                                "defaultValue": "false"
                                            }
                                        },
                                        "inputs": [
                                            {
                                                "name": "in1",
                                                "type": "auto"
                                            },
                                            {
                                                "name": "in2",
                                                "type": "auto"
                                            }
                                        ],
                                        "outputs": [
                                            {
                                                "name": "out1",
                                                "type": "signal"
                                            },
                                            {
                                                "name": "out2",
                                                "type": "signal"
                                            }
                                        ],
                                        "helpname": "gen~",
                                        "aliasOf": "gen~",
                                        "classname": "gen~",
                                        "operator": 0,
                                        "versionId": 179904306,
                                        "changesPatcherIO": 0
                                    },
                                    "text": "gen~"
                                }
                            }
                        ],
                        "lines": [
                            {
                                "patchline": {
                                    "destination": [ "obj-37", 0 ],
                                    "source": [ "obj-1", 1 ]
                                }
                            },
                            {
                                "patchline": {
                                    "destination": [ "obj-38", 0 ],
                                    "source": [ "obj-1", 0 ]
                                }
                            },
                            {
                                "patchline": {
                                    "destination": [ "obj-13", 0 ],
                                    "source": [ "obj-12", 0 ]
                                }
                            },
                            {
                                "patchline": {
                                    "destination": [ "obj-26", 0 ],
                                    "source": [ "obj-12", 1 ]
                                }
                            },
                            {
                                "patchline": {
                                    "destination": [ "obj-30", 0 ],
                                    "source": [ "obj-13", 0 ]
                                }
                            },
                            {
                                "patchline": {
                                    "destination": [ "obj-32", 0 ],
                                    "source": [ "obj-14", 0 ]
                                }
                            },
                            {
                                "patchline": {
                                    "destination": [ "obj-34", 0 ],
                                    "source": [ "obj-17", 0 ]
                                }
                            },
                            {
                                "patchline": {
                                    "destination": [ "obj-37", 1 ],
                                    "order": 0,
                                    "source": [ "obj-2", 0 ]
                                }
                            },
                            {
                                "patchline": {
                                    "destination": [ "obj-38", 1 ],
                                    "order": 1,
                                    "source": [ "obj-2", 0 ]
                                }
                            },
                            {
                                "patchline": {
                                    "destination": [ "obj-2", 0 ],
                                    "source": [ "obj-22", 0 ]
                                }
                            },
                            {
                                "patchline": {
                                    "destination": [ "obj-1", 1 ],
                                    "source": [ "obj-26", 0 ]
                                }
                            },
                            {
                                "patchline": {
                                    "destination": [ "obj-1", 0 ],
                                    "source": [ "obj-28", 0 ]
                                }
                            },
                            {
                                "patchline": {
                                    "destination": [ "obj-33", 0 ],
                                    "source": [ "obj-3", 0 ]
                                }
                            },
                            {
                                "patchline": {
                                    "destination": [ "obj-1", 0 ],
                                    "source": [ "obj-30", 0 ]
                                }
                            },
                            {
                                "patchline": {
                                    "destination": [ "obj-1", 0 ],
                                    "source": [ "obj-32", 0 ]
                                }
                            },
                            {
                                "patchline": {
                                    "destination": [ "obj-1", 0 ],
                                    "source": [ "obj-33", 0 ]
                                }
                            },
                            {
                                "patchline": {
                                    "destination": [ "obj-1", 0 ],
                                    "source": [ "obj-34", 0 ]
                                }
                            },
                            {
                                "patchline": {
                                    "destination": [ "obj-28", 0 ],
                                    "source": [ "obj-35", 0 ]
                                }
                            },
                            {
                                "patchline": {
                                    "destination": [ "obj-7", 0 ],
                                    "source": [ "obj-37", 0 ]
                                }
                            },
                            {
                                "patchline": {
                                    "destination": [ "obj-6", 0 ],
                                    "source": [ "obj-38", 0 ]
                                }
                            },
                            {
                                "patchline": {
                                    "destination": [ "obj-4", 0 ],
                                    "source": [ "obj-6", 0 ]
                                }
                            },
                            {
                                "patchline": {
                                    "destination": [ "obj-5", 0 ],
                                    "source": [ "obj-7", 0 ]
                                }
                            }
                        ],
                        "export_config": {
                            "web-export": {
                                "json-web-export": {
                                    "file_name": "fm.json"
                                }
                            }
                        }
                    },
                    "patching_rect": [ 98.0, 101.0, 100.0, 22.0 ],
                    "rnboattrcache": {
                        "depth": {
                            "label": "depth",
                            "isEnum": 0,
                            "parsestring": ""
                        },
                        "t60": {
                            "label": "t60",
                            "isEnum": 0,
                            "parsestring": ""
                        },
                        "smooth": {
                            "label": "smooth",
                            "isEnum": 0,
                            "parsestring": ""
                        },
                        "ratio": {
                            "label": "ratio",
                            "isEnum": 0,
                            "parsestring": ""
                        },
                        "volume": {
                            "label": "volume",
                            "isEnum": 0,
                            "parsestring": ""
                        }
                    },
                    "rnboversion": "1.4.2",
                    "saved_attribute_attributes": {
                        "valueof": {
                            "parameter_invisible": 1,
                            "parameter_longname": "rnbo~[12]",
                            "parameter_modmode": 0,
                            "parameter_shortname": "rnbo~[11]",
                            "parameter_type": 3
                        }
                    },
                    "saved_object_attributes": {
                        "optimization": "O1",
                        "parameter_enable": 1,
                        "uuid": "cc3d1311-0d9b-11f1-9311-de14237c4a52"
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
                            "ratio": {
                                "value": 1.0
                            },
                            "t60": {
                                "value": 1.0
                            },
                            "volume": {
                                "value": 0.5
                            },
                            "depth": {
                                "value": 1.0
                            },
                            "smooth": {
                                "value": 0.98
                            },
                            "__presetid": "cc3d1311-0d9b-11f1-9311-de14237c4a52"
                        },
                        "snapshotlist": {
                            "current_snapshot": 0,
                            "entries": [
                                {
                                    "filetype": "C74Snapshot",
                                    "version": 2,
                                    "minorversion": 0,
                                    "name": "untitled",
                                    "origin": "cc3d1311-0d9b-11f1-9311-de14237c4a52",
                                    "type": "rnbo",
                                    "subtype": "",
                                    "embed": 1,
                                    "snapshot": {
                                        "ratio": {
                                            "value": 1.0
                                        },
                                        "t60": {
                                            "value": 1.0
                                        },
                                        "volume": {
                                            "value": 0.5
                                        },
                                        "depth": {
                                            "value": 1.0
                                        },
                                        "smooth": {
                                            "value": 0.98
                                        },
                                        "__presetid": "cc3d1311-0d9b-11f1-9311-de14237c4a52"
                                    },
                                    "fileref": {
                                        "name": "untitled",
                                        "filename": "untitled_20260225.maxsnap",
                                        "filepath": "~/Documents/Max 9/Snapshots",
                                        "filepos": -1,
                                        "snapshotfileid": "7aef193ce45efcbddafe25fcc19ca31a"
                                    }
                                }
                            ]
                        }
                    },
                    "text": "rnbo~",
                    "varname": "rnbo~[12]"
                }
            },
            {
                "box": {
                    "id": "obj-15",
                    "maxclass": "comment",
                    "numinlets": 1,
                    "numoutlets": 0,
                    "patching_rect": [ 89.0, 64.0, 150.0, 20.0 ],
                    "text": "FM Bells"
                }
            },
            {
                "box": {
                    "attr": "depth",
                    "id": "obj-25",
                    "maxclass": "attrui",
                    "numinlets": 1,
                    "numoutlets": 1,
                    "outlettype": [ "" ],
                    "parameter_enable": 0,
                    "patching_rect": [ 287.0, 23.0, 150.0, 22.0 ]
                }
            },
            {
                "box": {
                    "attr": "smooth",
                    "id": "obj-26",
                    "maxclass": "attrui",
                    "numinlets": 1,
                    "numoutlets": 1,
                    "outlettype": [ "" ],
                    "parameter_enable": 0,
                    "patching_rect": [ 287.0, 71.0, 150.0, 22.0 ]
                }
            },
            {
                "box": {
                    "attr": "volume",
                    "id": "obj-27",
                    "maxclass": "attrui",
                    "numinlets": 1,
                    "numoutlets": 1,
                    "outlettype": [ "" ],
                    "parameter_enable": 0,
                    "patching_rect": [ 261.0, 120.0, 150.0, 22.0 ]
                }
            },
            {
                "box": {
                    "attr": "t60",
                    "id": "obj-28",
                    "maxclass": "attrui",
                    "numinlets": 1,
                    "numoutlets": 1,
                    "outlettype": [ "" ],
                    "parameter_enable": 0,
                    "patching_rect": [ 265.0, 171.0, 150.0, 22.0 ]
                }
            }
        ],
        "lines": [
            {
                "patchline": {
                    "destination": [ "obj-20", 1 ],
                    "source": [ "obj-16", 1 ]
                }
            },
            {
                "patchline": {
                    "destination": [ "obj-20", 0 ],
                    "source": [ "obj-16", 0 ]
                }
            },
            {
                "patchline": {
                    "destination": [ "obj-16", 0 ],
                    "source": [ "obj-25", 0 ]
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
                    "destination": [ "obj-16", 0 ],
                    "source": [ "obj-27", 0 ]
                }
            },
            {
                "patchline": {
                    "destination": [ "obj-16", 0 ],
                    "source": [ "obj-28", 0 ]
                }
            },
            {
                "patchline": {
                    "destination": [ "obj-58", 1 ],
                    "source": [ "obj-53", 1 ]
                }
            },
            {
                "patchline": {
                    "destination": [ "obj-58", 0 ],
                    "source": [ "obj-53", 0 ]
                }
            },
            {
                "patchline": {
                    "destination": [ "obj-16", 1 ],
                    "source": [ "obj-55", 0 ]
                }
            },
            {
                "patchline": {
                    "destination": [ "obj-55", 0 ],
                    "source": [ "obj-58", 0 ]
                }
            }
        ],
        "parameters": {
            "obj-13": [ "rnbo~[11]", "rnbo~[11]", 0 ],
            "obj-16": [ "rnbo~[12]", "rnbo~[11]", 0 ],
            "obj-57": [ "rnbo~[6]", "rnbo~", 0 ],
            "inherited_shortname": 1
        },
        "autosave": 0
    }
}