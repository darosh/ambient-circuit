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
        "rect": [ 133.0, 71.0, 606.0, 508.0 ],
        "integercoordinates": 1,
        "boxes": [
            {
                "box": {
                    "id": "obj-3",
                    "maxclass": "comment",
                    "numinlets": 1,
                    "numoutlets": 0,
                    "patching_rect": [ 318.0, 56.0, 309.0, 20.0 ],
                    "text": "https://github.com/Cycling74/rnbo-threejs-experiment"
                }
            },
            {
                "box": {
                    "bubble": 1,
                    "bubbleside": 3,
                    "id": "obj-14",
                    "linecount": 4,
                    "maxclass": "comment",
                    "numinlets": 1,
                    "numoutlets": 0,
                    "patching_rect": [ 24.0, 127.0, 146.0, 64.0 ],
                    "text": "Connect your favorite Midi Keyboard and double-click midiin to select"
                }
            },
            {
                "box": {
                    "fontface": 1,
                    "fontname": "Lato",
                    "fontsize": 24.0,
                    "id": "obj-13",
                    "maxclass": "comment",
                    "numinlets": 1,
                    "numoutlets": 0,
                    "patching_rect": [ 20.0, 15.0, 364.0, 35.0 ],
                    "text": "Phase Aligned Formant Synthesis",
                    "underline": 1
                }
            },
            {
                "box": {
                    "id": "obj-25",
                    "linecount": 2,
                    "maxclass": "comment",
                    "numinlets": 1,
                    "numoutlets": 0,
                    "patching_rect": [ 20.0, 52.0, 271.0, 33.0 ],
                    "text": "Two-cosine carrier signal with a waveshaping pulse generator."
                }
            },
            {
                "box": {
                    "attr": "bandwidth",
                    "id": "obj-11",
                    "maxclass": "attrui",
                    "numinlets": 1,
                    "numoutlets": 1,
                    "outlettype": [ "" ],
                    "parameter_enable": 0,
                    "patching_rect": [ 341.0, 133.0, 188.0, 22.0 ],
                    "text_width": 125.0
                }
            },
            {
                "box": {
                    "id": "obj-9",
                    "maxclass": "newobj",
                    "numinlets": 1,
                    "numoutlets": 1,
                    "outlettype": [ "int" ],
                    "patching_rect": [ 179.0, 148.0, 40.0, 22.0 ],
                    "text": "midiin"
                }
            },
            {
                "box": {
                    "id": "obj-5",
                    "lastchannelcount": 0,
                    "maxclass": "live.gain~",
                    "numinlets": 2,
                    "numoutlets": 5,
                    "outlettype": [ "signal", "signal", "", "float", "list" ],
                    "parameter_enable": 1,
                    "patching_rect": [ 107.0, 374.0, 55.0, 137.0 ],
                    "saved_attribute_attributes": {
                        "valueof": {
                            "parameter_initial": [ -10.0 ],
                            "parameter_initial_enable": 1,
                            "parameter_longname": "live.gain~",
                            "parameter_mmax": 6.0,
                            "parameter_mmin": -70.0,
                            "parameter_modmode": 0,
                            "parameter_shortname": "live.gain~",
                            "parameter_type": 0,
                            "parameter_unitstyle": 4
                        }
                    },
                    "varname": "live.gain~"
                }
            },
            {
                "box": {
                    "id": "obj-2",
                    "maxclass": "newobj",
                    "numinlets": 2,
                    "numoutlets": 0,
                    "patching_rect": [ 107.0, 584.0, 42.0, 22.0 ],
                    "text": "dac~"
                }
            },
            {
                "box": {
                    "autosave": 1,
                    "id": "obj-1",
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
                                "tag": "",
                                "comment": ""
                            },
                            {
                                "type": "signal",
                                "index": 2,
                                "tag": "",
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
                        "rect": [ 133.0, 71.0, 70.0, 508.0 ],
                        "default_fontname": "Lato",
                        "integercoordinates": 1,
                        "title": "untitled",
                        "boxes": [
                            {
                                "box": {
                                    "bubble": 1,
                                    "bubbleside": 2,
                                    "id": "obj-3",
                                    "linecount": 2,
                                    "maxclass": "comment",
                                    "numinlets": 0,
                                    "numoutlets": 0,
                                    "patching_rect": [ 607.0, 168.0, 150.0, 54.0 ],
                                    "suppressinlet": 1,
                                    "text": "How to generate an internal sound/buffer",
                                    "textjustification": 1
                                }
                            },
                            {
                                "box": {
                                    "id": "obj-4",
                                    "maxclass": "comment",
                                    "numinlets": 1,
                                    "numoutlets": 0,
                                    "patching_rect": [ 516.0, 499.0, 236.0, 21.0 ],
                                    "text": "Inspired by Miller Puckettes PAF Generator"
                                }
                            },
                            {
                                "box": {
                                    "id": "obj-2",
                                    "maxclass": "newobj",
                                    "numinlets": 7,
                                    "numoutlets": 1,
                                    "outlettype": [ "" ],
                                    "patching_rect": [ 297.0, 230.0, 82.0, 23.0 ],
                                    "rnbo_classname": "midiformat",
                                    "rnbo_extra_attributes": {
                                        "bendmode": "float"
                                    },
                                    "rnbo_serial": 1,
                                    "rnbo_uniqueid": "midiformat_obj-2",
                                    "rnboinfo": {
                                        "needsInstanceInfo": 1,
                                        "argnames": {
                                            "midimessage": {
                                                "attrOrProp": 1,
                                                "digest": "MIDI Message Output",
                                                "isalias": 0,
                                                "aliases": [],
                                                "attachable": 0,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "outlet": 1,
                                                "type": "number"
                                            },
                                            "noteonoroff": {
                                                "attrOrProp": 1,
                                                "digest": "Note-on or Note-off (list: pitch, velocity)",
                                                "isalias": 0,
                                                "aliases": [],
                                                "attachable": 0,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "inlet": 1,
                                                "type": "list"
                                            },
                                            "polypressure": {
                                                "attrOrProp": 1,
                                                "digest": "Poly Key Pressure (list: Key, Value)",
                                                "isalias": 0,
                                                "aliases": [],
                                                "attachable": 0,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "inlet": 1,
                                                "type": "list"
                                            },
                                            "controlchange": {
                                                "attrOrProp": 1,
                                                "digest": "Control Change (list: Controller Number, Value)",
                                                "isalias": 0,
                                                "aliases": [],
                                                "attachable": 0,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "inlet": 1,
                                                "type": "list"
                                            },
                                            "programchange": {
                                                "attrOrProp": 1,
                                                "digest": "Program Change",
                                                "isalias": 0,
                                                "aliases": [],
                                                "attachable": 0,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "inlet": 1,
                                                "type": "number"
                                            },
                                            "aftertouch": {
                                                "attrOrProp": 1,
                                                "digest": "After Touch",
                                                "isalias": 0,
                                                "aliases": [],
                                                "attachable": 0,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "inlet": 1,
                                                "type": "number"
                                            },
                                            "pitchbend": {
                                                "attrOrProp": 1,
                                                "digest": "Pitch Bend (-1. to 1.)",
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
                                            "channel": {
                                                "attrOrProp": 1,
                                                "digest": "Set MIDI Channel",
                                                "defaultarg": 1,
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
                                            "bendmode": {
                                                "attrOrProp": 2,
                                                "digest": "Set pitch bend scaling",
                                                "isalias": 0,
                                                "aliases": [],
                                                "settable": 1,
                                                "attachable": 0,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "enum": [ "lores", "float", "hires" ],
                                                "type": "enum",
                                                "defaultValue": "float"
                                            }
                                        },
                                        "inputs": [
                                            {
                                                "name": "noteonoroff",
                                                "type": "list",
                                                "digest": "Note-on or Note-off (list: pitch, velocity)",
                                                "hot": 1,
                                                "docked": 0
                                            },
                                            {
                                                "name": "polypressure",
                                                "type": "list",
                                                "digest": "Poly Key Pressure (list: Key, Value)",
                                                "hot": 1,
                                                "docked": 0
                                            },
                                            {
                                                "name": "controlchange",
                                                "type": "list",
                                                "digest": "Control Change (list: Controller Number, Value)",
                                                "hot": 1,
                                                "docked": 0
                                            },
                                            {
                                                "name": "programchange",
                                                "type": "number",
                                                "digest": "Program Change",
                                                "hot": 1,
                                                "docked": 0
                                            },
                                            {
                                                "name": "aftertouch",
                                                "type": "number",
                                                "digest": "After Touch",
                                                "hot": 1,
                                                "docked": 0
                                            },
                                            {
                                                "name": "pitchbend",
                                                "type": "number",
                                                "digest": "Pitch Bend (-1. to 1.)",
                                                "hot": 1,
                                                "docked": 0
                                            },
                                            {
                                                "name": "channel",
                                                "type": "number",
                                                "digest": "Set MIDI Channel",
                                                "defaultarg": 1,
                                                "docked": 0
                                            }
                                        ],
                                        "outputs": [
                                            {
                                                "name": "midimessage",
                                                "type": "number",
                                                "digest": "MIDI Message Output",
                                                "docked": 0
                                            }
                                        ],
                                        "helpname": "midiformat",
                                        "aliasOf": "midiformat",
                                        "classname": "midiformat",
                                        "operator": 0,
                                        "versionId": 370909632,
                                        "changesPatcherIO": 0
                                    },
                                    "text": "midiformat"
                                }
                            },
                            {
                                "box": {
                                    "id": "obj-1",
                                    "maxclass": "newobj",
                                    "numinlets": 1,
                                    "numoutlets": 7,
                                    "outlettype": [ "", "", "", "", "", "", "" ],
                                    "patching_rect": [ 297.0, 198.0, 82.0, 23.0 ],
                                    "rnbo_classname": "midiparse",
                                    "rnbo_extra_attributes": {
                                        "bendmode": "float"
                                    },
                                    "rnbo_serial": 1,
                                    "rnbo_uniqueid": "midiparse_obj-1",
                                    "rnboinfo": {
                                        "needsInstanceInfo": 1,
                                        "argnames": {
                                            "midiin": {
                                                "attrOrProp": 1,
                                                "digest": "MIDI Message Input",
                                                "isalias": 0,
                                                "aliases": [],
                                                "attachable": 0,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "inlet": 1,
                                                "type": "number"
                                            },
                                            "noteonoroff": {
                                                "attrOrProp": 1,
                                                "digest": "Note-on or Note-off (list: pitch, velocity)",
                                                "isalias": 0,
                                                "aliases": [],
                                                "attachable": 0,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "outlet": 1,
                                                "type": "list"
                                            },
                                            "polypressure": {
                                                "attrOrProp": 1,
                                                "digest": "Poly Key Pressure (list: Key, Value)",
                                                "isalias": 0,
                                                "aliases": [],
                                                "attachable": 0,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "outlet": 1,
                                                "type": "list"
                                            },
                                            "controlchange": {
                                                "attrOrProp": 1,
                                                "digest": "Control Change (list: Controller Number, Value)",
                                                "isalias": 0,
                                                "aliases": [],
                                                "attachable": 0,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "outlet": 1,
                                                "type": "list"
                                            },
                                            "programchange": {
                                                "attrOrProp": 1,
                                                "digest": "Program Change",
                                                "isalias": 0,
                                                "aliases": [],
                                                "attachable": 0,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "outlet": 1,
                                                "type": "number"
                                            },
                                            "aftertouch": {
                                                "attrOrProp": 1,
                                                "digest": "After Touch",
                                                "isalias": 0,
                                                "aliases": [],
                                                "attachable": 0,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "outlet": 1,
                                                "type": "number"
                                            },
                                            "pitchbend": {
                                                "attrOrProp": 1,
                                                "digest": "Pitch Bend (-1. to 1.)",
                                                "isalias": 0,
                                                "aliases": [],
                                                "attachable": 0,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "outlet": 1,
                                                "type": "number",
                                                "defaultValue": "0"
                                            },
                                            "channel": {
                                                "attrOrProp": 1,
                                                "digest": "Set MIDI Channel",
                                                "isalias": 0,
                                                "aliases": [],
                                                "attachable": 0,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "outlet": 1,
                                                "type": "number"
                                            },
                                            "bendmode": {
                                                "attrOrProp": 2,
                                                "digest": "Set pitch bend scaling",
                                                "isalias": 0,
                                                "aliases": [],
                                                "settable": 1,
                                                "attachable": 0,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "enum": [ "lores", "float", "hires" ],
                                                "type": "enum",
                                                "defaultValue": "float"
                                            }
                                        },
                                        "inputs": [
                                            {
                                                "name": "midiin",
                                                "type": "number",
                                                "digest": "MIDI Message Input",
                                                "hot": 1,
                                                "docked": 0
                                            }
                                        ],
                                        "outputs": [
                                            {
                                                "name": "noteonoroff",
                                                "type": "list",
                                                "digest": "Note-on or Note-off (list: pitch, velocity)",
                                                "docked": 0
                                            },
                                            {
                                                "name": "polypressure",
                                                "type": "list",
                                                "digest": "Poly Key Pressure (list: Key, Value)",
                                                "docked": 0
                                            },
                                            {
                                                "name": "controlchange",
                                                "type": "list",
                                                "digest": "Control Change (list: Controller Number, Value)",
                                                "docked": 0
                                            },
                                            {
                                                "name": "programchange",
                                                "type": "number",
                                                "digest": "Program Change",
                                                "docked": 0
                                            },
                                            {
                                                "name": "aftertouch",
                                                "type": "number",
                                                "digest": "After Touch",
                                                "docked": 0
                                            },
                                            {
                                                "name": "pitchbend",
                                                "type": "number",
                                                "digest": "Pitch Bend (-1. to 1.)",
                                                "docked": 0
                                            },
                                            {
                                                "name": "channel",
                                                "type": "number",
                                                "digest": "Set MIDI Channel",
                                                "docked": 0
                                            }
                                        ],
                                        "helpname": "midiparse",
                                        "aliasOf": "midiparse",
                                        "classname": "midiparse",
                                        "operator": 0,
                                        "versionId": 1831035953,
                                        "changesPatcherIO": 0
                                    },
                                    "text": "midiparse"
                                }
                            },
                            {
                                "box": {
                                    "id": "obj-51",
                                    "maxclass": "newobj",
                                    "numinlets": 2,
                                    "numoutlets": 2,
                                    "outlettype": [ "", "" ],
                                    "patching_rect": [ 126.0, 113.66666666666666, 361.0, 23.0 ],
                                    "rnbo_classname": "param",
                                    "rnbo_extra_attributes": {
                                        "enum": "",
                                        "sendinit": 1,
                                        "exponent": 1.0,
                                        "preset": 1,
                                        "tonormalized": "",
                                        "unit": "",
                                        "order": "0",
                                        "fromnormalized": "",
                                        "ctlin": 0.0,
                                        "steps": 0.0,
                                        "displayorder": "-",
                                        "meta": "",
                                        "displayname": ""
                                    },
                                    "rnbo_serial": 1,
                                    "rnbo_uniqueid": "bandwidth",
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
                                                "defaultValue": "20"
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
                                    "text": "param @name bandwidth @value 20 @minimum 0 @maximum 127",
                                    "varname": "bandwidth"
                                }
                            },
                            {
                                "box": {
                                    "id": "obj-50",
                                    "maxclass": "newobj",
                                    "numinlets": 2,
                                    "numoutlets": 2,
                                    "outlettype": [ "", "" ],
                                    "patching_rect": [ 68.0, 78.33333333333333, 389.0, 23.0 ],
                                    "rnbo_classname": "param",
                                    "rnbo_extra_attributes": {
                                        "enum": "",
                                        "sendinit": 1,
                                        "exponent": 1.0,
                                        "preset": 1,
                                        "tonormalized": "",
                                        "unit": "",
                                        "order": "0",
                                        "fromnormalized": "",
                                        "ctlin": 0.0,
                                        "steps": 0.0,
                                        "displayorder": "-",
                                        "meta": "",
                                        "displayname": ""
                                    },
                                    "rnbo_serial": 2,
                                    "rnbo_uniqueid": "mto-center-freq",
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
                                                "defaultValue": "20"
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
                                    "text": "param @name mto-center-freq @value 20 @minimum 0 @maximum 127",
                                    "varname": "mto-center-freq"
                                }
                            },
                            {
                                "box": {
                                    "id": "obj-47",
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
                                        "rect": [ 33.0, 71.0, 877.0, 508.0 ],
                                        "default_fontname": "Lato",
                                        "integercoordinates": 1,
                                        "title": "paffer",
                                        "boxes": [
                                            {
                                                "box": {
                                                    "id": "obj-14",
                                                    "maxclass": "newobj",
                                                    "numinlets": 2,
                                                    "numoutlets": 2,
                                                    "outlettype": [ "", "" ],
                                                    "patching_rect": [ 803.0, 798.9999999999999, 355.0, 23.0 ],
                                                    "rnbo_classname": "param",
                                                    "rnbo_extra_attributes": {
                                                        "enum": "",
                                                        "sendinit": 1,
                                                        "exponent": 1.0,
                                                        "preset": 1,
                                                        "tonormalized": "",
                                                        "unit": "",
                                                        "order": "0",
                                                        "fromnormalized": "",
                                                        "ctlin": 0.0,
                                                        "steps": 0.0,
                                                        "displayorder": "-",
                                                        "meta": "",
                                                        "displayname": ""
                                                    },
                                                    "rnbo_serial": 1,
                                                    "rnbo_uniqueid": "release",
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
                                                                "defaultValue": "500"
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
                                                    "text": "param @name release @value 500 @minimum 0 @maximum 5000",
                                                    "varname": "release"
                                                }
                                            },
                                            {
                                                "box": {
                                                    "id": "obj-12",
                                                    "maxclass": "newobj",
                                                    "numinlets": 2,
                                                    "numoutlets": 2,
                                                    "outlettype": [ "", "" ],
                                                    "patching_rect": [ 731.5, 759.7777777777777, 330.0, 23.0 ],
                                                    "rnbo_classname": "param",
                                                    "rnbo_extra_attributes": {
                                                        "enum": "",
                                                        "sendinit": 1,
                                                        "exponent": 1.0,
                                                        "preset": 1,
                                                        "tonormalized": "",
                                                        "unit": "",
                                                        "order": "0",
                                                        "fromnormalized": "",
                                                        "ctlin": 0.0,
                                                        "steps": 0.0,
                                                        "displayorder": "-",
                                                        "meta": "",
                                                        "displayname": ""
                                                    },
                                                    "rnbo_serial": 2,
                                                    "rnbo_uniqueid": "sustain",
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
                                                                "defaultValue": "0.4"
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
                                                    "text": "param @name sustain @value 0.4 @minimum 0 @maximum 1",
                                                    "varname": "sustain"
                                                }
                                            },
                                            {
                                                "box": {
                                                    "id": "obj-10",
                                                    "maxclass": "newobj",
                                                    "numinlets": 2,
                                                    "numoutlets": 2,
                                                    "outlettype": [ "", "" ],
                                                    "patching_rect": [ 660.0, 720.5555555555555, 335.0, 23.0 ],
                                                    "rnbo_classname": "param",
                                                    "rnbo_extra_attributes": {
                                                        "enum": "",
                                                        "sendinit": 1,
                                                        "exponent": 1.0,
                                                        "preset": 1,
                                                        "tonormalized": "",
                                                        "unit": "",
                                                        "order": "0",
                                                        "fromnormalized": "",
                                                        "ctlin": 0.0,
                                                        "steps": 0.0,
                                                        "displayorder": "-",
                                                        "meta": "",
                                                        "displayname": ""
                                                    },
                                                    "rnbo_serial": 3,
                                                    "rnbo_uniqueid": "decay",
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
                                                                "defaultValue": "40"
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
                                                    "text": "param @name decay @value 40 @minimum 0 @maximum 127",
                                                    "varname": "decay"
                                                }
                                            },
                                            {
                                                "box": {
                                                    "id": "obj-50",
                                                    "maxclass": "newobj",
                                                    "numinlets": 2,
                                                    "numoutlets": 2,
                                                    "outlettype": [ "", "" ],
                                                    "patching_rect": [ 588.5, 681.3333333333334, 337.0, 23.0 ],
                                                    "rnbo_classname": "param",
                                                    "rnbo_extra_attributes": {
                                                        "enum": "",
                                                        "sendinit": 1,
                                                        "exponent": 1.0,
                                                        "preset": 1,
                                                        "tonormalized": "",
                                                        "unit": "",
                                                        "order": "0",
                                                        "fromnormalized": "",
                                                        "ctlin": 0.0,
                                                        "steps": 0.0,
                                                        "displayorder": "-",
                                                        "meta": "",
                                                        "displayname": ""
                                                    },
                                                    "rnbo_serial": 4,
                                                    "rnbo_uniqueid": "attack",
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
                                                                "defaultValue": "5"
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
                                                    "text": "param @name attack @value 5 @minimum 0 @maximum 1000",
                                                    "varname": "attack"
                                                }
                                            },
                                            {
                                                "box": {
                                                    "id": "obj-44",
                                                    "maxclass": "newobj",
                                                    "numinlets": 2,
                                                    "numoutlets": 1,
                                                    "outlettype": [ "signal" ],
                                                    "patching_rect": [ 517.0, 807.0, 31.0, 23.0 ],
                                                    "rnbo_classname": "sig~",
                                                    "rnbo_extra_attributes": {
                                                        "unit": "ms"
                                                    },
                                                    "rnbo_serial": 1,
                                                    "rnbo_uniqueid": "sig~_obj-44",
                                                    "text": "sig~"
                                                }
                                            },
                                            {
                                                "box": {
                                                    "id": "obj-45",
                                                    "maxclass": "newobj",
                                                    "numinlets": 2,
                                                    "numoutlets": 1,
                                                    "outlettype": [ "" ],
                                                    "patching_rect": [ 517.0, 723.0, 41.0, 23.0 ],
                                                    "rnbo_classname": "/",
                                                    "rnbo_extra_attributes": {
                                                        "hot": 0
                                                    },
                                                    "rnbo_serial": 1,
                                                    "rnbo_uniqueid": "/_obj-45",
                                                    "text": "/ 127."
                                                }
                                            },
                                            {
                                                "box": {
                                                    "id": "obj-37",
                                                    "maxclass": "newobj",
                                                    "numinlets": 0,
                                                    "numoutlets": 1,
                                                    "outlettype": [ "" ],
                                                    "patching_rect": [ 368.0, 67.0, 28.0, 23.0 ],
                                                    "rnbo_classname": "in",
                                                    "rnbo_extra_attributes": {
                                                        "comment": "",
                                                        "meta": ""
                                                    },
                                                    "rnbo_serial": 1,
                                                    "rnbo_uniqueid": "in_obj-37",
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
                                                    "id": "obj-36",
                                                    "maxclass": "newobj",
                                                    "numinlets": 0,
                                                    "numoutlets": 1,
                                                    "outlettype": [ "" ],
                                                    "patching_rect": [ 154.0, 67.0, 28.0, 23.0 ],
                                                    "rnbo_classname": "in",
                                                    "rnbo_extra_attributes": {
                                                        "comment": "",
                                                        "meta": ""
                                                    },
                                                    "rnbo_serial": 2,
                                                    "rnbo_uniqueid": "in_obj-36",
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
                                                    "text": "in 1"
                                                }
                                            },
                                            {
                                                "box": {
                                                    "id": "obj-13",
                                                    "maxclass": "newobj",
                                                    "numinlets": 2,
                                                    "numoutlets": 1,
                                                    "outlettype": [ "signal" ],
                                                    "patching_rect": [ 55.0, 984.0, 480.5, 23.0 ],
                                                    "rnbo_classname": "*~",
                                                    "rnbo_serial": 1,
                                                    "rnbo_uniqueid": "*~_obj-13",
                                                    "text": "*~"
                                                }
                                            },
                                            {
                                                "box": {
                                                    "id": "obj-9",
                                                    "maxclass": "newobj",
                                                    "numinlets": 5,
                                                    "numoutlets": 2,
                                                    "outlettype": [ "signal", "" ],
                                                    "patching_rect": [ 517.0, 862.0, 305.0, 23.0 ],
                                                    "rnbo_classname": "adsr~",
                                                    "rnbo_serial": 1,
                                                    "rnbo_uniqueid": "adsr~_obj-9",
                                                    "text": "adsr~ @attack 20 @decay 20 @sustain 0.4 @release 250"
                                                }
                                            },
                                            {
                                                "box": {
                                                    "id": "obj-2",
                                                    "maxclass": "newobj",
                                                    "numinlets": 2,
                                                    "numoutlets": 4,
                                                    "outlettype": [ "", "", "", "" ],
                                                    "patching_rect": [ 786.0, 905.0, 36.0, 23.0 ],
                                                    "rnbo_classname": "voice",
                                                    "rnbo_serial": 1,
                                                    "rnbo_uniqueid": "voice_obj-2",
                                                    "text": "voice"
                                                }
                                            },
                                            {
                                                "box": {
                                                    "id": "obj-1",
                                                    "maxclass": "newobj",
                                                    "numinlets": 1,
                                                    "numoutlets": 0,
                                                    "patching_rect": [ 55.0, 1085.0, 43.0, 23.0 ],
                                                    "rnbo_classname": "out~",
                                                    "rnbo_extra_attributes": {
                                                        "comment": "",
                                                        "meta": ""
                                                    },
                                                    "rnbo_serial": 1,
                                                    "rnbo_uniqueid": "out~_obj-1",
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
                                                    "id": "obj-8",
                                                    "maxclass": "newobj",
                                                    "numinlets": 2,
                                                    "numoutlets": 4,
                                                    "outlettype": [ "", "", "", "" ],
                                                    "patching_rect": [ 55.0, 67.0, 50.5, 23.0 ],
                                                    "rnbo_classname": "notein",
                                                    "rnbo_serial": 1,
                                                    "rnbo_uniqueid": "notein_obj-8",
                                                    "text": "notein"
                                                }
                                            },
                                            {
                                                "box": {
                                                    "id": "obj-63",
                                                    "maxclass": "newobj",
                                                    "numinlets": 2,
                                                    "numoutlets": 1,
                                                    "outlettype": [ "signal" ],
                                                    "patching_rect": [ 55.0, 746.0, 51.5, 23.0 ],
                                                    "rnbo_classname": "*~",
                                                    "rnbo_serial": 2,
                                                    "rnbo_uniqueid": "*~_obj-63",
                                                    "text": "*~"
                                                }
                                            },
                                            {
                                                "box": {
                                                    "id": "obj-62",
                                                    "maxclass": "newobj",
                                                    "numinlets": 0,
                                                    "numoutlets": 1,
                                                    "outlettype": [ "signal" ],
                                                    "patching_rect": [ 160.5, 710.0, 46.0, 23.0 ],
                                                    "rnbo_classname": "twopi~",
                                                    "rnbo_serial": 1,
                                                    "rnbo_uniqueid": "twopi~_obj-62",
                                                    "text": "twopi~"
                                                }
                                            },
                                            {
                                                "box": {
                                                    "id": "obj-61",
                                                    "maxclass": "newobj",
                                                    "numinlets": 2,
                                                    "numoutlets": 1,
                                                    "outlettype": [ "signal" ],
                                                    "patching_rect": [ 128.0, 746.0, 51.5, 23.0 ],
                                                    "rnbo_classname": "*~",
                                                    "rnbo_serial": 3,
                                                    "rnbo_uniqueid": "*~_obj-61",
                                                    "text": "*~"
                                                }
                                            },
                                            {
                                                "box": {
                                                    "id": "obj-60",
                                                    "maxclass": "newobj",
                                                    "numinlets": 0,
                                                    "numoutlets": 1,
                                                    "outlettype": [ "signal" ],
                                                    "patching_rect": [ 316.5, 475.0, 46.0, 23.0 ],
                                                    "rnbo_classname": "twopi~",
                                                    "rnbo_serial": 2,
                                                    "rnbo_uniqueid": "twopi~_obj-60",
                                                    "text": "twopi~"
                                                }
                                            },
                                            {
                                                "box": {
                                                    "id": "obj-56",
                                                    "maxclass": "newobj",
                                                    "numinlets": 2,
                                                    "numoutlets": 1,
                                                    "outlettype": [ "signal" ],
                                                    "patching_rect": [ 284.0, 506.0, 51.5, 23.0 ],
                                                    "rnbo_classname": "*~",
                                                    "rnbo_serial": 4,
                                                    "rnbo_uniqueid": "*~_obj-56",
                                                    "text": "*~"
                                                }
                                            },
                                            {
                                                "box": {
                                                    "id": "obj-57",
                                                    "maxclass": "newobj",
                                                    "numinlets": 2,
                                                    "numoutlets": 1,
                                                    "outlettype": [ "" ],
                                                    "patching_rect": [ 154.0, 117.0, 34.0, 23.0 ],
                                                    "rnbo_classname": "mtof",
                                                    "rnbo_extra_attributes": {
                                                        "scalename": "",
                                                        "filter": 1.0
                                                    },
                                                    "rnbo_serial": 1,
                                                    "rnbo_uniqueid": "mtof_obj-57",
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
                                                    "id": "obj-59",
                                                    "maxclass": "newobj",
                                                    "numinlets": 2,
                                                    "numoutlets": 1,
                                                    "outlettype": [ "" ],
                                                    "patching_rect": [ 154.0, 159.0, 67.0, 23.0 ],
                                                    "rnbo_classname": "pack",
                                                    "rnbo_extra_attributes": {
                                                        "length": 0.0,
                                                        "list": ""
                                                    },
                                                    "rnbo_serial": 1,
                                                    "rnbo_uniqueid": "pack_obj-59",
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
                                                    "text": "pack 0 250"
                                                }
                                            },
                                            {
                                                "box": {
                                                    "id": "obj-48",
                                                    "maxclass": "newobj",
                                                    "numinlets": 2,
                                                    "numoutlets": 1,
                                                    "outlettype": [ "" ],
                                                    "patching_rect": [ 368.0, 117.0, 34.0, 23.0 ],
                                                    "rnbo_classname": "mtof",
                                                    "rnbo_extra_attributes": {
                                                        "scalename": "",
                                                        "filter": 1.0
                                                    },
                                                    "rnbo_serial": 2,
                                                    "rnbo_uniqueid": "mtof_obj-48",
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
                                                    "id": "obj-34",
                                                    "maxclass": "newobj",
                                                    "numinlets": 2,
                                                    "numoutlets": 2,
                                                    "outlettype": [ "signal", "signal" ],
                                                    "patching_rect": [ 284.25, 862.0, 215.0, 23.0 ],
                                                    "rnbo_classname": "peek~",
                                                    "rnbo_extra_attributes": {
                                                        "channelmode": "ignore",
                                                        "interp": "none",
                                                        "boundmode": "ignore",
                                                        "channels": 0.0
                                                    },
                                                    "rnbo_serial": 1,
                                                    "rnbo_uniqueid": "peek~_obj-34",
                                                    "rnboinfo": {
                                                        "needsInstanceInfo": 1,
                                                        "argnames": {
                                                            "index": {
                                                                "attrOrProp": 1,
                                                                "digest": "Index to sample",
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
                                                            "offset": {
                                                                "attrOrProp": 1,
                                                                "digest": "Channel offset (zero-based)",
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
                                                            "out1": {
                                                                "attrOrProp": 1,
                                                                "digest": "Sampled value.",
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
                                                            "outindex": {
                                                                "attrOrProp": 1,
                                                                "digest": "Index (in samples).",
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
                                                            "buffer": {
                                                                "attrOrProp": 1,
                                                                "digest": "If multiple buffer names are declared to be used, this sets the currently active buffer using an index [0 based].",
                                                                "isalias": 0,
                                                                "aliases": [],
                                                                "attachable": 1,
                                                                "isparam": 0,
                                                                "deprecated": 0,
                                                                "touched": 0,
                                                                "type": "number",
                                                                "defaultValue": "0"
                                                            },
                                                            "buffername": {
                                                                "attrOrProp": 2,
                                                                "digest": "Buffer to use",
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
                                                            },
                                                            "channels": {
                                                                "attrOrProp": 2,
                                                                "digest": "Number of channels",
                                                                "defaultarg": 2,
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
                                                            "boundmode": {
                                                                "attrOrProp": 2,
                                                                "digest": "Set the bound mode for input sample values",
                                                                "isalias": 0,
                                                                "aliases": [],
                                                                "settable": 1,
                                                                "attachable": 0,
                                                                "isparam": 0,
                                                                "deprecated": 0,
                                                                "touched": 0,
                                                                "enum": [ "fold", "clamp", "clip", "wrap", "mirror", "ignore" ],
                                                                "type": "enum",
                                                                "defaultValue": "ignore"
                                                            },
                                                            "channelmode": {
                                                                "attrOrProp": 2,
                                                                "digest": "Set the bound mode for input channel values",
                                                                "isalias": 0,
                                                                "aliases": [],
                                                                "settable": 1,
                                                                "attachable": 0,
                                                                "isparam": 0,
                                                                "deprecated": 0,
                                                                "touched": 0,
                                                                "enum": [ "fold", "clamp", "clip", "wrap", "mirror", "ignore" ],
                                                                "type": "enum",
                                                                "defaultValue": "ignore"
                                                            },
                                                            "indexmode": {
                                                                "attrOrProp": 2,
                                                                "digest": "Set the lookup mode",
                                                                "isalias": 0,
                                                                "aliases": [],
                                                                "settable": 1,
                                                                "attachable": 0,
                                                                "isparam": 0,
                                                                "deprecated": 0,
                                                                "touched": 0,
                                                                "enum": [ "phase", "samples", "signal", "lookup", "wave" ],
                                                                "type": "enum",
                                                                "defaultValue": "samples"
                                                            },
                                                            "interp": {
                                                                "attrOrProp": 2,
                                                                "digest": "Set interpolation type",
                                                                "isalias": 0,
                                                                "aliases": [],
                                                                "settable": 1,
                                                                "attachable": 0,
                                                                "isparam": 0,
                                                                "deprecated": 0,
                                                                "touched": 0,
                                                                "enum": [ "linear", "cubic", "spline", "cosine", "step", "none", "fastcubic", "spline6" ],
                                                                "type": "enum",
                                                                "defaultValue": "none"
                                                            }
                                                        },
                                                        "inputs": [
                                                            {
                                                                "name": "index",
                                                                "type": "auto",
                                                                "digest": "Index to sample",
                                                                "hot": 1,
                                                                "docked": 0
                                                            },
                                                            {
                                                                "name": "offset",
                                                                "type": "auto",
                                                                "digest": "Channel offset (zero-based)",
                                                                "docked": 0
                                                            }
                                                        ],
                                                        "outputs": [
                                                            {
                                                                "name": "out1",
                                                                "type": "signal",
                                                                "digest": "Sampled value.",
                                                                "docked": 0
                                                            },
                                                            {
                                                                "name": "outindex",
                                                                "type": "signal",
                                                                "digest": "Index (in samples).",
                                                                "docked": 0
                                                            }
                                                        ],
                                                        "helpname": "peek~",
                                                        "aliasOf": {
                                                            "name": "peek~"
                                                        },
                                                        "classname": "peek~",
                                                        "operator": 0,
                                                        "versionId": -2122242524,
                                                        "changesPatcherIO": 0
                                                    },
                                                    "text": "peek~ bellcurve @indexmode samples"
                                                }
                                            },
                                            {
                                                "box": {
                                                    "id": "obj-33",
                                                    "maxclass": "newobj",
                                                    "numinlets": 2,
                                                    "numoutlets": 1,
                                                    "outlettype": [ "signal" ],
                                                    "patching_rect": [ 284.25, 723.0, 46.0, 23.0 ],
                                                    "rnbo_classname": "+~",
                                                    "rnbo_serial": 1,
                                                    "rnbo_uniqueid": "+~_obj-33",
                                                    "text": "+~ 100"
                                                }
                                            },
                                            {
                                                "box": {
                                                    "id": "obj-32",
                                                    "maxclass": "newobj",
                                                    "numinlets": 2,
                                                    "numoutlets": 1,
                                                    "outlettype": [ "signal" ],
                                                    "patching_rect": [ 55.0, 943.0, 248.25, 23.0 ],
                                                    "rnbo_classname": "*~",
                                                    "rnbo_serial": 5,
                                                    "rnbo_uniqueid": "*~_obj-32",
                                                    "text": "*~"
                                                }
                                            },
                                            {
                                                "box": {
                                                    "id": "obj-31",
                                                    "maxclass": "newobj",
                                                    "numinlets": 2,
                                                    "numoutlets": 1,
                                                    "outlettype": [ "signal" ],
                                                    "patching_rect": [ 127.25, 862.0, 86.75, 23.0 ],
                                                    "rnbo_classname": "*~",
                                                    "rnbo_serial": 6,
                                                    "rnbo_uniqueid": "*~_obj-31",
                                                    "text": "*~"
                                                }
                                            },
                                            {
                                                "box": {
                                                    "id": "obj-30",
                                                    "maxclass": "newobj",
                                                    "numinlets": 2,
                                                    "numoutlets": 1,
                                                    "outlettype": [ "signal" ],
                                                    "patching_rect": [ 55.0, 905.0, 91.25, 23.0 ],
                                                    "rnbo_classname": "+~",
                                                    "rnbo_serial": 2,
                                                    "rnbo_uniqueid": "+~_obj-30",
                                                    "text": "+~"
                                                }
                                            },
                                            {
                                                "box": {
                                                    "id": "obj-29",
                                                    "maxclass": "newobj",
                                                    "numinlets": 2,
                                                    "numoutlets": 1,
                                                    "outlettype": [ "signal" ],
                                                    "patching_rect": [ 128.0, 828.0, 29.5, 23.0 ],
                                                    "rnbo_classname": "-~",
                                                    "rnbo_serial": 1,
                                                    "rnbo_uniqueid": "-~_obj-29",
                                                    "text": "-~"
                                                }
                                            },
                                            {
                                                "box": {
                                                    "id": "obj-28",
                                                    "maxclass": "newobj",
                                                    "numinlets": 1,
                                                    "numoutlets": 1,
                                                    "outlettype": [ "signal" ],
                                                    "patching_rect": [ 128.0, 789.0, 34.0, 23.0 ],
                                                    "rnbo_classname": "cos~",
                                                    "rnbo_serial": 1,
                                                    "rnbo_uniqueid": "cos~_obj-28",
                                                    "text": "cos~"
                                                }
                                            },
                                            {
                                                "box": {
                                                    "id": "obj-27",
                                                    "maxclass": "newobj",
                                                    "numinlets": 1,
                                                    "numoutlets": 1,
                                                    "outlettype": [ "signal" ],
                                                    "patching_rect": [ 55.0, 789.0, 34.0, 23.0 ],
                                                    "rnbo_classname": "cos~",
                                                    "rnbo_serial": 2,
                                                    "rnbo_uniqueid": "cos~_obj-27",
                                                    "text": "cos~"
                                                }
                                            },
                                            {
                                                "box": {
                                                    "id": "obj-26",
                                                    "maxclass": "newobj",
                                                    "numinlets": 2,
                                                    "numoutlets": 1,
                                                    "outlettype": [ "signal" ],
                                                    "patching_rect": [ 128.0, 657.0, 29.5, 23.0 ],
                                                    "rnbo_classname": "+~",
                                                    "rnbo_serial": 3,
                                                    "rnbo_uniqueid": "+~_obj-26",
                                                    "text": "+~"
                                                }
                                            },
                                            {
                                                "box": {
                                                    "id": "obj-25",
                                                    "maxclass": "newobj",
                                                    "numinlets": 2,
                                                    "numoutlets": 1,
                                                    "outlettype": [ "signal" ],
                                                    "patching_rect": [ 55.0, 613.0, 29.5, 23.0 ],
                                                    "rnbo_classname": "*~",
                                                    "rnbo_serial": 7,
                                                    "rnbo_uniqueid": "*~_obj-25",
                                                    "text": "*~"
                                                }
                                            },
                                            {
                                                "box": {
                                                    "id": "obj-24",
                                                    "maxclass": "newobj",
                                                    "numinlets": 2,
                                                    "numoutlets": 1,
                                                    "outlettype": [ "signal" ],
                                                    "patching_rect": [ 195.0, 481.0, 36.0, 23.0 ],
                                                    "rnbo_classname": "%~",
                                                    "rnbo_serial": 1,
                                                    "rnbo_uniqueid": "%~_obj-24",
                                                    "text": "%~ 1"
                                                }
                                            },
                                            {
                                                "box": {
                                                    "id": "obj-23",
                                                    "maxclass": "newobj",
                                                    "numinlets": 2,
                                                    "numoutlets": 1,
                                                    "outlettype": [ "signal" ],
                                                    "patching_rect": [ 154.0, 547.0, 29.5, 23.0 ],
                                                    "rnbo_classname": "-~",
                                                    "rnbo_serial": 2,
                                                    "rnbo_uniqueid": "-~_obj-23",
                                                    "text": "-~"
                                                }
                                            },
                                            {
                                                "box": {
                                                    "id": "obj-22",
                                                    "maxclass": "newobj",
                                                    "numinlets": 3,
                                                    "numoutlets": 1,
                                                    "outlettype": [ "signal" ],
                                                    "patching_rect": [ 154.0, 415.0, 65.0, 23.0 ],
                                                    "rnbo_classname": "sah~",
                                                    "rnbo_serial": 1,
                                                    "rnbo_uniqueid": "sah~_obj-22",
                                                    "rnboinfo": {
                                                        "needsInstanceInfo": 1,
                                                        "argnames": {
                                                            "input": {
                                                                "attrOrProp": 1,
                                                                "digest": "input to be sampled",
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
                                                            "trig": {
                                                                "attrOrProp": 1,
                                                                "digest": "trigger",
                                                                "defaultarg": 1,
                                                                "isalias": 0,
                                                                "aliases": [],
                                                                "settable": 1,
                                                                "attachable": 0,
                                                                "isparam": 0,
                                                                "deprecated": 0,
                                                                "touched": 0,
                                                                "inlet": 1,
                                                                "type": "number",
                                                                "defaultValue": "-1"
                                                            },
                                                            "thresh": {
                                                                "attrOrProp": 1,
                                                                "digest": "threshold",
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
                                                            "out": {
                                                                "attrOrProp": 1,
                                                                "digest": "output",
                                                                "isalias": 0,
                                                                "aliases": [],
                                                                "attachable": 0,
                                                                "isparam": 0,
                                                                "deprecated": 0,
                                                                "touched": 0,
                                                                "outlet": 1,
                                                                "type": "signal"
                                                            }
                                                        },
                                                        "inputs": [
                                                            {
                                                                "name": "input",
                                                                "type": "auto",
                                                                "digest": "input to be sampled",
                                                                "hot": 1,
                                                                "docked": 0
                                                            },
                                                            {
                                                                "name": "trig",
                                                                "type": "auto",
                                                                "digest": "trigger",
                                                                "defaultarg": 1,
                                                                "docked": 0
                                                            },
                                                            {
                                                                "name": "thresh",
                                                                "type": "auto",
                                                                "digest": "threshold",
                                                                "defaultarg": 2,
                                                                "docked": 0
                                                            }
                                                        ],
                                                        "outputs": [
                                                            {
                                                                "name": "out",
                                                                "type": "signal",
                                                                "digest": "output",
                                                                "docked": 0
                                                            }
                                                        ],
                                                        "helpname": "sah~",
                                                        "aliasOf": "sah",
                                                        "classname": "sah~",
                                                        "operator": 0,
                                                        "versionId": 962616476,
                                                        "changesPatcherIO": 0
                                                    },
                                                    "text": "sah~ 1 0.5"
                                                }
                                            },
                                            {
                                                "box": {
                                                    "id": "obj-21",
                                                    "maxclass": "newobj",
                                                    "numinlets": 2,
                                                    "numoutlets": 1,
                                                    "outlettype": [ "signal" ],
                                                    "patching_rect": [ 365.5, 542.0, 38.0, 23.0 ],
                                                    "rnbo_classname": "*~",
                                                    "rnbo_serial": 8,
                                                    "rnbo_uniqueid": "*~_obj-21",
                                                    "text": "*~ 25"
                                                }
                                            },
                                            {
                                                "box": {
                                                    "id": "obj-20",
                                                    "maxclass": "newobj",
                                                    "numinlets": 2,
                                                    "numoutlets": 1,
                                                    "outlettype": [ "signal" ],
                                                    "patching_rect": [ 284.25, 591.0, 100.25, 23.0 ],
                                                    "rnbo_classname": "*~",
                                                    "rnbo_serial": 9,
                                                    "rnbo_uniqueid": "*~_obj-20",
                                                    "text": "*~"
                                                }
                                            },
                                            {
                                                "box": {
                                                    "id": "obj-19",
                                                    "maxclass": "newobj",
                                                    "numinlets": 1,
                                                    "numoutlets": 1,
                                                    "outlettype": [ "signal" ],
                                                    "patching_rect": [ 284.0, 542.0, 34.0, 23.0 ],
                                                    "rnbo_classname": "cos~",
                                                    "rnbo_serial": 3,
                                                    "rnbo_uniqueid": "cos~_obj-19",
                                                    "text": "cos~"
                                                }
                                            },
                                            {
                                                "box": {
                                                    "id": "obj-18",
                                                    "maxclass": "newobj",
                                                    "numinlets": 2,
                                                    "numoutlets": 1,
                                                    "outlettype": [ "signal" ],
                                                    "patching_rect": [ 284.0, 437.0, 47.0, 23.0 ],
                                                    "rnbo_classname": "-~",
                                                    "rnbo_serial": 3,
                                                    "rnbo_uniqueid": "-~_obj-18",
                                                    "text": "-~ 0.25"
                                                }
                                            },
                                            {
                                                "box": {
                                                    "id": "obj-17",
                                                    "maxclass": "newobj",
                                                    "numinlets": 2,
                                                    "numoutlets": 1,
                                                    "outlettype": [ "signal" ],
                                                    "patching_rect": [ 284.0, 393.0, 40.0, 23.0 ],
                                                    "rnbo_classname": "*~",
                                                    "rnbo_serial": 10,
                                                    "rnbo_uniqueid": "*~_obj-17",
                                                    "text": "*~ 0.5"
                                                }
                                            },
                                            {
                                                "box": {
                                                    "id": "obj-15",
                                                    "maxclass": "newobj",
                                                    "numinlets": 2,
                                                    "numoutlets": 1,
                                                    "outlettype": [ "" ],
                                                    "patching_rect": [ 368.0, 159.0, 67.0, 23.0 ],
                                                    "rnbo_classname": "pack",
                                                    "rnbo_extra_attributes": {
                                                        "length": 0.0,
                                                        "list": ""
                                                    },
                                                    "rnbo_serial": 2,
                                                    "rnbo_uniqueid": "pack_obj-15",
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
                                                    "text": "pack 0 100"
                                                }
                                            },
                                            {
                                                "box": {
                                                    "id": "obj-16",
                                                    "maxclass": "newobj",
                                                    "numinlets": 3,
                                                    "numoutlets": 2,
                                                    "outlettype": [ "signal", "" ],
                                                    "patching_rect": [ 368.0, 239.0, 45.0, 23.0 ],
                                                    "rnbo_classname": "curve~",
                                                    "rnbo_extra_attributes": {
                                                        "value": 0.0
                                                    },
                                                    "rnbo_serial": 1,
                                                    "rnbo_uniqueid": "curve~_obj-16",
                                                    "text": "curve~"
                                                }
                                            },
                                            {
                                                "box": {
                                                    "id": "obj-11",
                                                    "maxclass": "newobj",
                                                    "numinlets": 2,
                                                    "numoutlets": 1,
                                                    "outlettype": [ "signal" ],
                                                    "patching_rect": [ 368.0, 305.0, 41.5, 23.0 ],
                                                    "rnbo_classname": "*~",
                                                    "rnbo_serial": 11,
                                                    "rnbo_uniqueid": "*~_obj-11",
                                                    "text": "*~"
                                                }
                                            },
                                            {
                                                "box": {
                                                    "id": "obj-7",
                                                    "maxclass": "newobj",
                                                    "numinlets": 3,
                                                    "numoutlets": 2,
                                                    "outlettype": [ "signal", "" ],
                                                    "patching_rect": [ 154.0, 195.0, 45.0, 23.0 ],
                                                    "rnbo_classname": "curve~",
                                                    "rnbo_extra_attributes": {
                                                        "value": 0.0
                                                    },
                                                    "rnbo_serial": 2,
                                                    "rnbo_uniqueid": "curve~_obj-7",
                                                    "text": "curve~"
                                                }
                                            },
                                            {
                                                "box": {
                                                    "id": "obj-6",
                                                    "maxclass": "newobj",
                                                    "numinlets": 2,
                                                    "numoutlets": 1,
                                                    "outlettype": [ "signal" ],
                                                    "patching_rect": [ 154.0, 305.0, 65.5, 23.0 ],
                                                    "rnbo_classname": "*~",
                                                    "rnbo_serial": 12,
                                                    "rnbo_uniqueid": "*~_obj-6",
                                                    "text": "*~"
                                                }
                                            },
                                            {
                                                "box": {
                                                    "id": "obj-5",
                                                    "maxclass": "newobj",
                                                    "numinlets": 1,
                                                    "numoutlets": 1,
                                                    "outlettype": [ "" ],
                                                    "patching_rect": [ 200.5, 256.0, 64.0, 23.0 ],
                                                    "rnbo_classname": "expr",
                                                    "rnbo_extra_attributes": {
                                                        "safemath": 1,
                                                        "nocache": 0,
                                                        "hot": 0
                                                    },
                                                    "rnbo_serial": 1,
                                                    "rnbo_uniqueid": "expr_obj-5",
                                                    "rnboinfo": {
                                                        "needsInstanceInfo": 1,
                                                        "argnames": {
                                                            "reset": {
                                                                "attrOrProp": 1,
                                                                "digest": "Reset all state and params to initial values",
                                                                "isalias": 0,
                                                                "aliases": [],
                                                                "attachable": 1,
                                                                "isparam": 0,
                                                                "deprecated": 0,
                                                                "touched": 0,
                                                                "type": "bang"
                                                            },
                                                            "in1": {
                                                                "attrOrProp": 1,
                                                                "digest": "in1",
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
                                                            "out1": {
                                                                "attrOrProp": 1,
                                                                "digest": "out1",
                                                                "isalias": 0,
                                                                "aliases": [],
                                                                "settable": 0,
                                                                "attachable": 0,
                                                                "isparam": 0,
                                                                "deprecated": 0,
                                                                "touched": 0,
                                                                "outlet": 1,
                                                                "type": "number"
                                                            },
                                                            "expr": {
                                                                "attrOrProp": 2,
                                                                "digest": "expr",
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
                                                            "hot": {
                                                                "attrOrProp": 2,
                                                                "digest": "Trigger computation on all inlets.",
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
                                                            "safemath": {
                                                                "attrOrProp": 2,
                                                                "digest": "Use safe math expressions (e.g.: division by 0 will not crash).",
                                                                "isalias": 0,
                                                                "aliases": [],
                                                                "settable": 1,
                                                                "attachable": 0,
                                                                "isparam": 0,
                                                                "deprecated": 0,
                                                                "touched": 0,
                                                                "type": "bool",
                                                                "defaultValue": "true"
                                                            },
                                                            "nocache": {
                                                                "attrOrProp": 2,
                                                                "digest": "Do not use parsing cache. This is only useful with very very big code sizes. Code generation will then take a looooong time.",
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
                                                                "type": "number",
                                                                "digest": "in1",
                                                                "hot": 1,
                                                                "docked": 0
                                                            }
                                                        ],
                                                        "outputs": [
                                                            {
                                                                "name": "out1",
                                                                "type": "number",
                                                                "digest": "out1",
                                                                "docked": 0
                                                            }
                                                        ],
                                                        "helpname": "expr",
                                                        "aliasOf": "expr",
                                                        "classname": "expr",
                                                        "operator": 0,
                                                        "versionId": 835263063,
                                                        "changesPatcherIO": 0
                                                    },
                                                    "text": "expr 1/in1"
                                                }
                                            },
                                            {
                                                "box": {
                                                    "id": "obj-4",
                                                    "maxclass": "newobj",
                                                    "numinlets": 2,
                                                    "numoutlets": 1,
                                                    "outlettype": [ "signal" ],
                                                    "patching_rect": [ 55.0, 261.0, 52.0, 23.0 ],
                                                    "rnbo_classname": "phasor~",
                                                    "rnbo_extra_attributes": {
                                                        "lock": 0.0
                                                    },
                                                    "rnbo_serial": 1,
                                                    "rnbo_uniqueid": "phasor~_obj-4",
                                                    "text": "phasor~"
                                                }
                                            },
                                            {
                                                "box": {
                                                    "id": "obj-3",
                                                    "maxclass": "newobj",
                                                    "numinlets": 2,
                                                    "numoutlets": 1,
                                                    "outlettype": [ "" ],
                                                    "patching_rect": [ 55.0, 195.0, 34.0, 23.0 ],
                                                    "rnbo_classname": "mtof",
                                                    "rnbo_extra_attributes": {
                                                        "scalename": "",
                                                        "filter": 1.0
                                                    },
                                                    "rnbo_serial": 3,
                                                    "rnbo_uniqueid": "mtof_obj-3",
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
                                            }
                                        ],
                                        "lines": [
                                            {
                                                "patchline": {
                                                    "destination": [ "obj-9", 2 ],
                                                    "source": [ "obj-10", 0 ]
                                                }
                                            },
                                            {
                                                "patchline": {
                                                    "destination": [ "obj-21", 0 ],
                                                    "source": [ "obj-11", 0 ]
                                                }
                                            },
                                            {
                                                "patchline": {
                                                    "destination": [ "obj-9", 3 ],
                                                    "source": [ "obj-12", 0 ]
                                                }
                                            },
                                            {
                                                "patchline": {
                                                    "destination": [ "obj-1", 0 ],
                                                    "source": [ "obj-13", 0 ]
                                                }
                                            },
                                            {
                                                "patchline": {
                                                    "destination": [ "obj-9", 4 ],
                                                    "source": [ "obj-14", 0 ]
                                                }
                                            },
                                            {
                                                "patchline": {
                                                    "destination": [ "obj-16", 0 ],
                                                    "source": [ "obj-15", 0 ]
                                                }
                                            },
                                            {
                                                "patchline": {
                                                    "destination": [ "obj-11", 0 ],
                                                    "source": [ "obj-16", 0 ]
                                                }
                                            },
                                            {
                                                "patchline": {
                                                    "destination": [ "obj-18", 0 ],
                                                    "source": [ "obj-17", 0 ]
                                                }
                                            },
                                            {
                                                "patchline": {
                                                    "destination": [ "obj-56", 0 ],
                                                    "source": [ "obj-18", 0 ]
                                                }
                                            },
                                            {
                                                "patchline": {
                                                    "destination": [ "obj-20", 0 ],
                                                    "source": [ "obj-19", 0 ]
                                                }
                                            },
                                            {
                                                "patchline": {
                                                    "destination": [ "obj-33", 0 ],
                                                    "source": [ "obj-20", 0 ]
                                                }
                                            },
                                            {
                                                "patchline": {
                                                    "destination": [ "obj-20", 1 ],
                                                    "source": [ "obj-21", 0 ]
                                                }
                                            },
                                            {
                                                "patchline": {
                                                    "destination": [ "obj-23", 0 ],
                                                    "order": 1,
                                                    "source": [ "obj-22", 0 ]
                                                }
                                            },
                                            {
                                                "patchline": {
                                                    "destination": [ "obj-24", 0 ],
                                                    "order": 0,
                                                    "source": [ "obj-22", 0 ]
                                                }
                                            },
                                            {
                                                "patchline": {
                                                    "destination": [ "obj-25", 1 ],
                                                    "source": [ "obj-23", 0 ]
                                                }
                                            },
                                            {
                                                "patchline": {
                                                    "destination": [ "obj-23", 1 ],
                                                    "order": 1,
                                                    "source": [ "obj-24", 0 ]
                                                }
                                            },
                                            {
                                                "patchline": {
                                                    "destination": [ "obj-31", 1 ],
                                                    "order": 0,
                                                    "source": [ "obj-24", 0 ]
                                                }
                                            },
                                            {
                                                "patchline": {
                                                    "destination": [ "obj-26", 0 ],
                                                    "order": 0,
                                                    "source": [ "obj-25", 0 ]
                                                }
                                            },
                                            {
                                                "patchline": {
                                                    "destination": [ "obj-63", 0 ],
                                                    "order": 1,
                                                    "source": [ "obj-25", 0 ]
                                                }
                                            },
                                            {
                                                "patchline": {
                                                    "destination": [ "obj-61", 0 ],
                                                    "source": [ "obj-26", 0 ]
                                                }
                                            },
                                            {
                                                "patchline": {
                                                    "destination": [ "obj-29", 1 ],
                                                    "order": 0,
                                                    "source": [ "obj-27", 0 ]
                                                }
                                            },
                                            {
                                                "patchline": {
                                                    "destination": [ "obj-30", 0 ],
                                                    "order": 1,
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
                                                    "destination": [ "obj-31", 0 ],
                                                    "source": [ "obj-29", 0 ]
                                                }
                                            },
                                            {
                                                "patchline": {
                                                    "destination": [ "obj-4", 0 ],
                                                    "order": 1,
                                                    "source": [ "obj-3", 0 ]
                                                }
                                            },
                                            {
                                                "patchline": {
                                                    "destination": [ "obj-5", 0 ],
                                                    "order": 0,
                                                    "source": [ "obj-3", 0 ]
                                                }
                                            },
                                            {
                                                "patchline": {
                                                    "destination": [ "obj-32", 0 ],
                                                    "source": [ "obj-30", 0 ]
                                                }
                                            },
                                            {
                                                "patchline": {
                                                    "destination": [ "obj-30", 1 ],
                                                    "source": [ "obj-31", 0 ]
                                                }
                                            },
                                            {
                                                "patchline": {
                                                    "destination": [ "obj-13", 0 ],
                                                    "source": [ "obj-32", 0 ]
                                                }
                                            },
                                            {
                                                "patchline": {
                                                    "destination": [ "obj-34", 0 ],
                                                    "source": [ "obj-33", 0 ]
                                                }
                                            },
                                            {
                                                "patchline": {
                                                    "destination": [ "obj-32", 1 ],
                                                    "source": [ "obj-34", 0 ]
                                                }
                                            },
                                            {
                                                "patchline": {
                                                    "destination": [ "obj-57", 0 ],
                                                    "source": [ "obj-36", 0 ]
                                                }
                                            },
                                            {
                                                "patchline": {
                                                    "destination": [ "obj-48", 0 ],
                                                    "source": [ "obj-37", 0 ]
                                                }
                                            },
                                            {
                                                "patchline": {
                                                    "destination": [ "obj-17", 0 ],
                                                    "order": 0,
                                                    "source": [ "obj-4", 0 ]
                                                }
                                            },
                                            {
                                                "patchline": {
                                                    "destination": [ "obj-22", 1 ],
                                                    "order": 1,
                                                    "source": [ "obj-4", 0 ]
                                                }
                                            },
                                            {
                                                "patchline": {
                                                    "destination": [ "obj-25", 0 ],
                                                    "order": 3,
                                                    "source": [ "obj-4", 0 ]
                                                }
                                            },
                                            {
                                                "patchline": {
                                                    "destination": [ "obj-26", 1 ],
                                                    "order": 2,
                                                    "source": [ "obj-4", 0 ]
                                                }
                                            },
                                            {
                                                "patchline": {
                                                    "destination": [ "obj-9", 0 ],
                                                    "source": [ "obj-44", 0 ]
                                                }
                                            },
                                            {
                                                "patchline": {
                                                    "destination": [ "obj-44", 0 ],
                                                    "source": [ "obj-45", 0 ]
                                                }
                                            },
                                            {
                                                "patchline": {
                                                    "destination": [ "obj-15", 0 ],
                                                    "source": [ "obj-48", 0 ]
                                                }
                                            },
                                            {
                                                "patchline": {
                                                    "destination": [ "obj-11", 1 ],
                                                    "order": 0,
                                                    "source": [ "obj-5", 0 ]
                                                }
                                            },
                                            {
                                                "patchline": {
                                                    "destination": [ "obj-6", 1 ],
                                                    "order": 1,
                                                    "source": [ "obj-5", 0 ]
                                                }
                                            },
                                            {
                                                "patchline": {
                                                    "destination": [ "obj-9", 1 ],
                                                    "source": [ "obj-50", 0 ]
                                                }
                                            },
                                            {
                                                "patchline": {
                                                    "destination": [ "obj-19", 0 ],
                                                    "source": [ "obj-56", 0 ]
                                                }
                                            },
                                            {
                                                "patchline": {
                                                    "destination": [ "obj-59", 0 ],
                                                    "source": [ "obj-57", 0 ]
                                                }
                                            },
                                            {
                                                "patchline": {
                                                    "destination": [ "obj-7", 0 ],
                                                    "source": [ "obj-59", 0 ]
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
                                                    "destination": [ "obj-56", 1 ],
                                                    "source": [ "obj-60", 0 ]
                                                }
                                            },
                                            {
                                                "patchline": {
                                                    "destination": [ "obj-28", 0 ],
                                                    "source": [ "obj-61", 0 ]
                                                }
                                            },
                                            {
                                                "patchline": {
                                                    "destination": [ "obj-61", 1 ],
                                                    "order": 0,
                                                    "source": [ "obj-62", 0 ]
                                                }
                                            },
                                            {
                                                "patchline": {
                                                    "destination": [ "obj-63", 1 ],
                                                    "order": 1,
                                                    "source": [ "obj-62", 0 ]
                                                }
                                            },
                                            {
                                                "patchline": {
                                                    "destination": [ "obj-27", 0 ],
                                                    "source": [ "obj-63", 0 ]
                                                }
                                            },
                                            {
                                                "patchline": {
                                                    "destination": [ "obj-6", 0 ],
                                                    "source": [ "obj-7", 0 ]
                                                }
                                            },
                                            {
                                                "patchline": {
                                                    "destination": [ "obj-3", 0 ],
                                                    "source": [ "obj-8", 0 ]
                                                }
                                            },
                                            {
                                                "patchline": {
                                                    "destination": [ "obj-45", 0 ],
                                                    "source": [ "obj-8", 1 ]
                                                }
                                            },
                                            {
                                                "patchline": {
                                                    "destination": [ "obj-13", 1 ],
                                                    "source": [ "obj-9", 0 ]
                                                }
                                            },
                                            {
                                                "patchline": {
                                                    "destination": [ "obj-2", 1 ],
                                                    "source": [ "obj-9", 1 ]
                                                }
                                            }
                                        ],
                                        "styles": [
                                            {
                                                "name": "Default 4 New Patchers",
                                                "default": {
                                                    "fontsize": [ 10.0 ]
                                                },
                                                "parentstyle": "",
                                                "multi": 0
                                            }
                                        ]
                                    },
                                    "patching_rect": [ 68.0, 285.0, 128.0, 23.0 ],
                                    "rnbo_classname": "p",
                                    "rnbo_extra_attributes": {
                                        "voicecontrol": "simple",
                                        "uidstyle": "auto",
                                        "args": [],
                                        "notecontroller": 0,
                                        "exposevoiceparams": 0,
                                        "receivemode": "local"
                                    },
                                    "rnbo_serial": 1,
                                    "rnbo_uniqueid": "paffer",
                                    "rnboinfo": {
                                        "needsInstanceInfo": 1,
                                        "argnames": {
                                            "attack": {
                                                "attrOrProp": 1,
                                                "digest": "attack",
                                                "isalias": 0,
                                                "aliases": [],
                                                "settable": 1,
                                                "attachable": 1,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "type": "number"
                                            },
                                            "decay": {
                                                "attrOrProp": 1,
                                                "digest": "decay",
                                                "isalias": 0,
                                                "aliases": [],
                                                "settable": 1,
                                                "attachable": 1,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "type": "number"
                                            },
                                            "sustain": {
                                                "attrOrProp": 1,
                                                "digest": "sustain",
                                                "isalias": 0,
                                                "aliases": [],
                                                "settable": 1,
                                                "attachable": 1,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "type": "number"
                                            },
                                            "release": {
                                                "attrOrProp": 1,
                                                "digest": "release",
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
                                                "type": "list"
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
                                            "__probingout2": {
                                                "attrOrProp": 1,
                                                "digest": "__probingout2",
                                                "isalias": 0,
                                                "aliases": [],
                                                "attachable": 0,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "type": "signal"
                                            },
                                            "__probingout3": {
                                                "attrOrProp": 1,
                                                "digest": "__probingout3",
                                                "isalias": 0,
                                                "aliases": [],
                                                "attachable": 0,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "type": "signal"
                                            },
                                            "__probingout4": {
                                                "attrOrProp": 1,
                                                "digest": "__probingout4",
                                                "isalias": 0,
                                                "aliases": [],
                                                "attachable": 0,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "type": "signal"
                                            },
                                            "__probingout5": {
                                                "attrOrProp": 1,
                                                "digest": "__probingout5",
                                                "isalias": 0,
                                                "aliases": [],
                                                "attachable": 0,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "type": "signal"
                                            },
                                            "__probingout6": {
                                                "attrOrProp": 1,
                                                "digest": "__probingout6",
                                                "isalias": 0,
                                                "aliases": [],
                                                "attachable": 0,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "type": "signal"
                                            },
                                            "__probingout7": {
                                                "attrOrProp": 1,
                                                "digest": "__probingout7",
                                                "isalias": 0,
                                                "aliases": [],
                                                "attachable": 0,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "type": "signal"
                                            },
                                            "__probingout8": {
                                                "attrOrProp": 1,
                                                "digest": "__probingout8",
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
                                            "midiin": {
                                                "attrOrProp": 1,
                                                "digest": "midiin",
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
                                                "name": "midiin",
                                                "type": "number",
                                                "digest": "midiin",
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
                                    "text": "p paffer @polyphony 8",
                                    "varname": "paffer"
                                }
                            },
                            {
                                "box": {
                                    "id": "obj-12",
                                    "maxclass": "newobj",
                                    "numinlets": 1,
                                    "numoutlets": 1,
                                    "outlettype": [ "" ],
                                    "patching_rect": [ 297.0, 164.0, 41.0, 23.0 ],
                                    "rnbo_classname": "midiin",
                                    "rnbo_serial": 1,
                                    "rnbo_uniqueid": "midiin_obj-12",
                                    "text": "midiin"
                                }
                            },
                            {
                                "box": {
                                    "id": "obj-41",
                                    "maxclass": "newobj",
                                    "numinlets": 1,
                                    "numoutlets": 0,
                                    "patching_rect": [ 128.5, 499.0, 43.0, 23.0 ],
                                    "rnbo_classname": "out~",
                                    "rnbo_extra_attributes": {
                                        "comment": "",
                                        "meta": ""
                                    },
                                    "rnbo_serial": 1,
                                    "rnbo_uniqueid": "out~_obj-41",
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
                                    "id": "obj-44",
                                    "maxclass": "newobj",
                                    "numinlets": 1,
                                    "numoutlets": 1,
                                    "outlettype": [ "" ],
                                    "patching_rect": [ 535.0, 168.0, 58.0, 23.0 ],
                                    "rnbo_classname": "loadbang",
                                    "rnbo_serial": 1,
                                    "rnbo_uniqueid": "loadbang_obj-44",
                                    "text": "loadbang"
                                }
                            },
                            {
                                "box": {
                                    "id": "obj-43",
                                    "maxclass": "newobj",
                                    "numinlets": 1,
                                    "numoutlets": 0,
                                    "patching_rect": [ 68.0, 499.0, 43.0, 23.0 ],
                                    "rnbo_classname": "out~",
                                    "rnbo_extra_attributes": {
                                        "comment": "",
                                        "meta": ""
                                    },
                                    "rnbo_serial": 2,
                                    "rnbo_uniqueid": "out~_obj-43",
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
                                    "id": "obj-39",
                                    "maxclass": "newobj",
                                    "numinlets": 1,
                                    "numoutlets": 1,
                                    "outlettype": [ "" ],
                                    "patching_rect": [ 563.0, 280.5, 141.0, 23.0 ],
                                    "rnbo_classname": "expr",
                                    "rnbo_extra_attributes": {
                                        "safemath": 1,
                                        "nocache": 0,
                                        "hot": 0
                                    },
                                    "rnbo_serial": 1,
                                    "rnbo_uniqueid": "expr_obj-39",
                                    "rnboinfo": {
                                        "needsInstanceInfo": 1,
                                        "argnames": {
                                            "reset": {
                                                "attrOrProp": 1,
                                                "digest": "Reset all state and params to initial values",
                                                "isalias": 0,
                                                "aliases": [],
                                                "attachable": 1,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "type": "bang"
                                            },
                                            "in1": {
                                                "attrOrProp": 1,
                                                "digest": "in1",
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
                                            "out1": {
                                                "attrOrProp": 1,
                                                "digest": "out1",
                                                "isalias": 0,
                                                "aliases": [],
                                                "settable": 0,
                                                "attachable": 0,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "outlet": 1,
                                                "type": "number"
                                            },
                                            "expr": {
                                                "attrOrProp": 2,
                                                "digest": "expr",
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
                                            "hot": {
                                                "attrOrProp": 2,
                                                "digest": "Trigger computation on all inlets.",
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
                                            "safemath": {
                                                "attrOrProp": 2,
                                                "digest": "Use safe math expressions (e.g.: division by 0 will not crash).",
                                                "isalias": 0,
                                                "aliases": [],
                                                "settable": 1,
                                                "attachable": 0,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "type": "bool",
                                                "defaultValue": "true"
                                            },
                                            "nocache": {
                                                "attrOrProp": 2,
                                                "digest": "Do not use parsing cache. This is only useful with very very big code sizes. Code generation will then take a looooong time.",
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
                                                "type": "number",
                                                "digest": "in1",
                                                "hot": 1,
                                                "docked": 0
                                            }
                                        ],
                                        "outputs": [
                                            {
                                                "name": "out1",
                                                "type": "number",
                                                "digest": "out1",
                                                "docked": 0
                                            }
                                        ],
                                        "helpname": "expr",
                                        "aliasOf": "expr",
                                        "classname": "expr",
                                        "operator": 0,
                                        "versionId": 835263063,
                                        "changesPatcherIO": 0
                                    },
                                    "text": "expr out1 = exp(-in1*in1)"
                                }
                            },
                            {
                                "box": {
                                    "id": "obj-38",
                                    "maxclass": "newobj",
                                    "numinlets": 1,
                                    "numoutlets": 1,
                                    "outlettype": [ "" ],
                                    "patching_rect": [ 563.0, 243.0, 143.0, 23.0 ],
                                    "rnbo_classname": "expr",
                                    "rnbo_extra_attributes": {
                                        "safemath": 1,
                                        "nocache": 0,
                                        "hot": 0
                                    },
                                    "rnbo_serial": 2,
                                    "rnbo_uniqueid": "expr_obj-38",
                                    "rnboinfo": {
                                        "needsInstanceInfo": 1,
                                        "argnames": {
                                            "reset": {
                                                "attrOrProp": 1,
                                                "digest": "Reset all state and params to initial values",
                                                "isalias": 0,
                                                "aliases": [],
                                                "attachable": 1,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "type": "bang"
                                            },
                                            "in1": {
                                                "attrOrProp": 1,
                                                "digest": "in1",
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
                                            "out1": {
                                                "attrOrProp": 1,
                                                "digest": "out1",
                                                "isalias": 0,
                                                "aliases": [],
                                                "settable": 0,
                                                "attachable": 0,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "outlet": 1,
                                                "type": "number"
                                            },
                                            "expr": {
                                                "attrOrProp": 2,
                                                "digest": "expr",
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
                                            "hot": {
                                                "attrOrProp": 2,
                                                "digest": "Trigger computation on all inlets.",
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
                                            "safemath": {
                                                "attrOrProp": 2,
                                                "digest": "Use safe math expressions (e.g.: division by 0 will not crash).",
                                                "isalias": 0,
                                                "aliases": [],
                                                "settable": 1,
                                                "attachable": 0,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "type": "bool",
                                                "defaultValue": "true"
                                            },
                                            "nocache": {
                                                "attrOrProp": 2,
                                                "digest": "Do not use parsing cache. This is only useful with very very big code sizes. Code generation will then take a looooong time.",
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
                                                "type": "number",
                                                "digest": "in1",
                                                "hot": 1,
                                                "docked": 0
                                            }
                                        ],
                                        "outputs": [
                                            {
                                                "name": "out1",
                                                "type": "number",
                                                "digest": "out1",
                                                "docked": 0
                                            }
                                        ],
                                        "helpname": "expr",
                                        "aliasOf": "expr",
                                        "classname": "expr",
                                        "operator": 0,
                                        "versionId": 835263063,
                                        "changesPatcherIO": 0
                                    },
                                    "text": "expr out1 = (in1-100) /25"
                                }
                            },
                            {
                                "box": {
                                    "id": "obj-37",
                                    "maxclass": "newobj",
                                    "numinlets": 2,
                                    "numoutlets": 3,
                                    "outlettype": [ "", "", "" ],
                                    "patching_rect": [ 535.0, 205.5, 47.0, 23.0 ],
                                    "rnbo_classname": "uzi",
                                    "rnbo_serial": 1,
                                    "rnbo_uniqueid": "uzi_obj-37",
                                    "text": "uzi 199"
                                }
                            },
                            {
                                "box": {
                                    "id": "obj-36",
                                    "maxclass": "newobj",
                                    "numinlets": 1,
                                    "numoutlets": 3,
                                    "outlettype": [ "", "", "" ],
                                    "patching_rect": [ 563.0, 352.5, 158.0, 23.0 ],
                                    "rnbo_classname": "buffer~",
                                    "rnbo_extra_attributes": {
                                        "preset": 0,
                                        "fill": "",
                                        "samplerate": 0.0,
                                        "type": "",
                                        "meta": "",
                                        "file": ""
                                    },
                                    "rnbo_serial": 1,
                                    "rnbo_uniqueid": "buffer~_obj-36",
                                    "rnboinfo": {
                                        "needsInstanceInfo": 1,
                                        "argnames": {
                                            "info": {
                                                "attrOrProp": 1,
                                                "digest": "Bang to report buffer information.",
                                                "isalias": 0,
                                                "aliases": [],
                                                "settable": 0,
                                                "attachable": 0,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "inlet": 1,
                                                "type": "bang"
                                            },
                                            "sizeout": {
                                                "attrOrProp": 1,
                                                "digest": "Size in Samples",
                                                "defaultarg": 2,
                                                "isalias": 0,
                                                "aliases": [],
                                                "settable": 0,
                                                "attachable": 0,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "outlet": 1,
                                                "type": "number",
                                                "defaultValue": "0"
                                            },
                                            "chanout": {
                                                "attrOrProp": 1,
                                                "digest": "Number of Channels",
                                                "isalias": 0,
                                                "aliases": [],
                                                "attachable": 0,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "outlet": 1,
                                                "type": "number",
                                                "defaultValue": "0"
                                            },
                                            "srout": {
                                                "attrOrProp": 1,
                                                "digest": "Sample rate",
                                                "isalias": 0,
                                                "aliases": [],
                                                "attachable": 0,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "outlet": 1,
                                                "type": "number",
                                                "defaultValue": "0"
                                            },
                                            "size": {
                                                "attrOrProp": 1,
                                                "digest": "Size in Samples. Take care when setting, allocation might block audio processing.",
                                                "defaultarg": 2,
                                                "isalias": 0,
                                                "aliases": [ "samples" ],
                                                "settable": 1,
                                                "attachable": 1,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "type": "number",
                                                "defaultValue": "0"
                                            },
                                            "samples": {
                                                "attrOrProp": 1,
                                                "digest": "Size in Samples. Take care when setting, allocation might block audio processing.",
                                                "defaultarg": 2,
                                                "isalias": 1,
                                                "aliasOf": "size",
                                                "aliases": [],
                                                "settable": 1,
                                                "attachable": 1,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "type": "number",
                                                "defaultValue": "0"
                                            },
                                            "sizems": {
                                                "attrOrProp": 1,
                                                "digest": "Size in Milliseconds. Take care when setting, allocation might block audio processing.",
                                                "isalias": 0,
                                                "aliases": [ "ms" ],
                                                "settable": 1,
                                                "attachable": 1,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "type": "number",
                                                "defaultValue": "0"
                                            },
                                            "ms": {
                                                "attrOrProp": 1,
                                                "digest": "Size in Milliseconds. Take care when setting, allocation might block audio processing.",
                                                "isalias": 1,
                                                "aliasOf": "sizems",
                                                "aliases": [],
                                                "settable": 1,
                                                "attachable": 1,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "type": "number",
                                                "defaultValue": "0"
                                            },
                                            "clear": {
                                                "attrOrProp": 1,
                                                "digest": "Clear the contents of the buffer",
                                                "isalias": 0,
                                                "aliases": [],
                                                "attachable": 1,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "type": "bang"
                                            },
                                            "normalize": {
                                                "attrOrProp": 1,
                                                "digest": "Find Maximum and normalize to the value given.",
                                                "isalias": 0,
                                                "aliases": [],
                                                "settable": 1,
                                                "attachable": 1,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "type": "number",
                                                "defaultValue": "0.995"
                                            },
                                            "channels": {
                                                "attrOrProp": 1,
                                                "digest": "Change channel count. Take care when setting, allocation might block audio processing.",
                                                "defaultarg": 3,
                                                "isalias": 0,
                                                "aliases": [],
                                                "settable": 1,
                                                "attachable": 1,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "type": "number",
                                                "defaultValue": "1"
                                            },
                                            "name": {
                                                "attrOrProp": 2,
                                                "digest": "Name of the data buffer",
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
                                            },
                                            "file": {
                                                "attrOrProp": 2,
                                                "digest": "File name/path or URL to load into buffer.",
                                                "isalias": 0,
                                                "aliases": [],
                                                "settable": 1,
                                                "attachable": 0,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "type": "symbol"
                                            },
                                            "type": {
                                                "attrOrProp": 2,
                                                "digest": "Type of Data (float32, float64)",
                                                "isalias": 0,
                                                "aliases": [],
                                                "settable": 1,
                                                "attachable": 0,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "type": "symbol"
                                            },
                                            "samplerate": {
                                                "attrOrProp": 2,
                                                "digest": "Sample rate",
                                                "defaultarg": 4,
                                                "isalias": 0,
                                                "aliases": [],
                                                "settable": 1,
                                                "attachable": 0,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "type": "number",
                                                "defaultValue": "0"
                                            },
                                            "fill": {
                                                "attrOrProp": 2,
                                                "digest": "Fill expression, this could be a value, or a simple function like sin(x), where x will run from 0 to 1 to fill the buffer.",
                                                "isalias": 0,
                                                "aliases": [],
                                                "settable": 1,
                                                "attachable": 0,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "type": "symbol"
                                            },
                                            "external": {
                                                "attrOrProp": 2,
                                                "digest": "Await data from the outside world.",
                                                "isalias": 0,
                                                "aliases": [],
                                                "settable": 1,
                                                "attachable": 0,
                                                "isparam": 0,
                                                "deprecated": 0,
                                                "touched": 0,
                                                "type": "bool",
                                                "doNotShowInMaxInspector": 1
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
                                                "defaultValue": "false",
                                                "label": "Include In Preset",
                                                "category": "Preset"
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
                                                "label": "Metadata"
                                            }
                                        },
                                        "inputs": [
                                            {
                                                "name": "info",
                                                "type": "bang",
                                                "digest": "Bang to report buffer information.",
                                                "hot": 1,
                                                "docked": 0
                                            }
                                        ],
                                        "outputs": [
                                            {
                                                "name": "sizeout",
                                                "type": "number",
                                                "digest": "Size in Samples",
                                                "defaultarg": 2,
                                                "docked": 0
                                            },
                                            {
                                                "name": "chanout",
                                                "type": "number",
                                                "digest": "Number of Channels",
                                                "docked": 0
                                            },
                                            {
                                                "name": "srout",
                                                "type": "number",
                                                "digest": "Sample rate",
                                                "docked": 0
                                            }
                                        ],
                                        "helpname": "buffer~",
                                        "aliasOf": "data",
                                        "classname": "buffer~",
                                        "operator": 0,
                                        "versionId": -72996304,
                                        "changesPatcherIO": 0
                                    },
                                    "text": "buffer~ bellcurve @size 199"
                                }
                            },
                            {
                                "box": {
                                    "id": "obj-35",
                                    "maxclass": "newobj",
                                    "numinlets": 4,
                                    "numoutlets": 0,
                                    "patching_rect": [ 563.0, 318.0, 215.0, 23.0 ],
                                    "rnbo_classname": "poke~",
                                    "rnbo_extra_attributes": {
                                        "channelmode": "ignore",
                                        "boundmode": "ignore",
                                        "overdubmode": "mix"
                                    },
                                    "rnbo_serial": 1,
                                    "rnbo_uniqueid": "poke~_obj-35",
                                    "text": "poke~ bellcurve @indexmode samples"
                                }
                            }
                        ],
                        "lines": [
                            {
                                "patchline": {
                                    "destination": [ "obj-2", 6 ],
                                    "source": [ "obj-1", 6 ]
                                }
                            },
                            {
                                "patchline": {
                                    "destination": [ "obj-2", 1 ],
                                    "source": [ "obj-1", 1 ]
                                }
                            },
                            {
                                "patchline": {
                                    "destination": [ "obj-2", 0 ],
                                    "source": [ "obj-1", 0 ]
                                }
                            },
                            {
                                "patchline": {
                                    "destination": [ "obj-1", 0 ],
                                    "source": [ "obj-12", 0 ]
                                }
                            },
                            {
                                "patchline": {
                                    "destination": [ "obj-47", 2 ],
                                    "source": [ "obj-2", 0 ]
                                }
                            },
                            {
                                "patchline": {
                                    "destination": [ "obj-35", 1 ],
                                    "order": 0,
                                    "source": [ "obj-37", 2 ]
                                }
                            },
                            {
                                "patchline": {
                                    "destination": [ "obj-38", 0 ],
                                    "order": 1,
                                    "source": [ "obj-37", 2 ]
                                }
                            },
                            {
                                "patchline": {
                                    "destination": [ "obj-39", 0 ],
                                    "source": [ "obj-38", 0 ]
                                }
                            },
                            {
                                "patchline": {
                                    "destination": [ "obj-35", 0 ],
                                    "source": [ "obj-39", 0 ]
                                }
                            },
                            {
                                "patchline": {
                                    "destination": [ "obj-37", 0 ],
                                    "source": [ "obj-44", 0 ]
                                }
                            },
                            {
                                "patchline": {
                                    "destination": [ "obj-41", 0 ],
                                    "order": 0,
                                    "source": [ "obj-47", 0 ]
                                }
                            },
                            {
                                "patchline": {
                                    "destination": [ "obj-43", 0 ],
                                    "order": 1,
                                    "source": [ "obj-47", 0 ]
                                }
                            },
                            {
                                "patchline": {
                                    "destination": [ "obj-47", 0 ],
                                    "source": [ "obj-50", 0 ]
                                }
                            },
                            {
                                "patchline": {
                                    "destination": [ "obj-47", 1 ],
                                    "source": [ "obj-51", 0 ]
                                }
                            }
                        ],
                        "styles": [
                            {
                                "name": "Default 4 New Patchers",
                                "default": {
                                    "fontsize": [ 10.0 ]
                                },
                                "parentstyle": "",
                                "multi": 0
                            }
                        ],
                        "export_config": {
                            "web-export": {
                                "json-web-export": {
                                    "file_name": "formant-synth-mono.json",
                                    "polyphony": "disabled"
                                }
                            }
                        }
                    },
                    "patching_rect": [ 107.0, 242.0, 91.0, 22.0 ],
                    "rnboattrcache": {
                        "paffer/attack": {
                            "label": "attack",
                            "isEnum": 0,
                            "parsestring": ""
                        },
                        "bandwidth": {
                            "label": "bandwidth",
                            "isEnum": 0,
                            "parsestring": ""
                        },
                        "paffer/decay": {
                            "label": "decay",
                            "isEnum": 0,
                            "parsestring": ""
                        },
                        "paffer/sustain": {
                            "label": "sustain",
                            "isEnum": 0,
                            "parsestring": ""
                        },
                        "paffer/release": {
                            "label": "release",
                            "isEnum": 0,
                            "parsestring": ""
                        },
                        "mto-center-freq": {
                            "label": "mto-center-freq",
                            "isEnum": 0,
                            "parsestring": ""
                        }
                    },
                    "rnboversion": "1.4.2",
                    "saved_attribute_attributes": {
                        "valueof": {
                            "parameter_invisible": 1,
                            "parameter_longname": "rnbo~",
                            "parameter_modmode": 0,
                            "parameter_shortname": "rnbo~",
                            "parameter_type": 3
                        }
                    },
                    "saved_object_attributes": {
                        "optimization": "O1",
                        "parameter_enable": 1,
                        "uuid": "777aeadf-e17b-11ea-aadf-00e04cab9ef0"
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
                            "bandwidth": {
                                "value": 80.0
                            },
                            "__sps": {
                                "paffer": [
                                    {
                                        "release": {
                                            "value": 600.0
                                        },
                                        "sustain": {
                                            "value": 0.5
                                        },
                                        "decay": {
                                            "value": 100.0
                                        },
                                        "attack": {
                                            "value": 20.0
                                        }
                                    },
                                    {
                                        "release": {
                                            "value": 600.0
                                        },
                                        "sustain": {
                                            "value": 0.5
                                        },
                                        "decay": {
                                            "value": 100.0
                                        },
                                        "attack": {
                                            "value": 20.0
                                        }
                                    },
                                    {
                                        "release": {
                                            "value": 600.0
                                        },
                                        "sustain": {
                                            "value": 0.5
                                        },
                                        "decay": {
                                            "value": 100.0
                                        },
                                        "attack": {
                                            "value": 20.0
                                        }
                                    },
                                    {
                                        "release": {
                                            "value": 600.0
                                        },
                                        "sustain": {
                                            "value": 0.5
                                        },
                                        "decay": {
                                            "value": 100.0
                                        },
                                        "attack": {
                                            "value": 20.0
                                        }
                                    },
                                    {
                                        "release": {
                                            "value": 600.0
                                        },
                                        "sustain": {
                                            "value": 0.5
                                        },
                                        "decay": {
                                            "value": 100.0
                                        },
                                        "attack": {
                                            "value": 20.0
                                        }
                                    },
                                    {
                                        "release": {
                                            "value": 600.0
                                        },
                                        "sustain": {
                                            "value": 0.5
                                        },
                                        "decay": {
                                            "value": 100.0
                                        },
                                        "attack": {
                                            "value": 20.0
                                        }
                                    },
                                    {
                                        "release": {
                                            "value": 600.0
                                        },
                                        "sustain": {
                                            "value": 0.5
                                        },
                                        "decay": {
                                            "value": 100.0
                                        },
                                        "attack": {
                                            "value": 20.0
                                        }
                                    },
                                    {
                                        "release": {
                                            "value": 600.0
                                        },
                                        "sustain": {
                                            "value": 0.5
                                        },
                                        "decay": {
                                            "value": 100.0
                                        },
                                        "attack": {
                                            "value": 20.0
                                        }
                                    }
                                ]
                            },
                            "mto-center-freq": {
                                "value": 30.0
                            },
                            "__presetid": "777aeadf-e17b-11ea-aadf-00e04cab9ef0"
                        },
                        "snapshotlist": {
                            "current_snapshot": 4,
                            "entries": [
                                {
                                    "filetype": "C74Snapshot",
                                    "version": 2,
                                    "minorversion": 0,
                                    "name": "Attack",
                                    "origin": "777aeadf-e17b-11ea-aadf-00e04cab9ef0",
                                    "type": "rnbo",
                                    "subtype": "",
                                    "embed": 1,
                                    "snapshot": {
                                        "bandwidth": {
                                            "value": 75.0
                                        },
                                        "__sps": {
                                            "paffer": [
                                                {
                                                    "release": {
                                                        "value": 1000.0
                                                    },
                                                    "sustain": {
                                                        "value": 0.4
                                                    },
                                                    "decay": {
                                                        "value": 40.0
                                                    },
                                                    "attack": {
                                                        "value": 5.0
                                                    }
                                                },
                                                {
                                                    "release": {
                                                        "value": 1000.0
                                                    },
                                                    "sustain": {
                                                        "value": 0.4
                                                    },
                                                    "decay": {
                                                        "value": 40.0
                                                    },
                                                    "attack": {
                                                        "value": 5.0
                                                    }
                                                },
                                                {
                                                    "release": {
                                                        "value": 1000.0
                                                    },
                                                    "sustain": {
                                                        "value": 0.4
                                                    },
                                                    "decay": {
                                                        "value": 40.0
                                                    },
                                                    "attack": {
                                                        "value": 5.0
                                                    }
                                                },
                                                {
                                                    "release": {
                                                        "value": 1000.0
                                                    },
                                                    "sustain": {
                                                        "value": 0.4
                                                    },
                                                    "decay": {
                                                        "value": 40.0
                                                    },
                                                    "attack": {
                                                        "value": 5.0
                                                    }
                                                },
                                                {
                                                    "release": {
                                                        "value": 1000.0
                                                    },
                                                    "sustain": {
                                                        "value": 0.4
                                                    },
                                                    "decay": {
                                                        "value": 40.0
                                                    },
                                                    "attack": {
                                                        "value": 5.0
                                                    }
                                                },
                                                {
                                                    "release": {
                                                        "value": 1000.0
                                                    },
                                                    "sustain": {
                                                        "value": 0.4
                                                    },
                                                    "decay": {
                                                        "value": 40.0
                                                    },
                                                    "attack": {
                                                        "value": 5.0
                                                    }
                                                },
                                                {
                                                    "release": {
                                                        "value": 1000.0
                                                    },
                                                    "sustain": {
                                                        "value": 0.4
                                                    },
                                                    "decay": {
                                                        "value": 40.0
                                                    },
                                                    "attack": {
                                                        "value": 5.0
                                                    }
                                                },
                                                {
                                                    "release": {
                                                        "value": 1000.0
                                                    },
                                                    "sustain": {
                                                        "value": 0.4
                                                    },
                                                    "decay": {
                                                        "value": 40.0
                                                    },
                                                    "attack": {
                                                        "value": 5.0
                                                    }
                                                },
                                                {
                                                    "release": {
                                                        "value": 1000.0
                                                    },
                                                    "sustain": {
                                                        "value": 0.4
                                                    },
                                                    "decay": {
                                                        "value": 40.0
                                                    },
                                                    "attack": {
                                                        "value": 5.0
                                                    }
                                                },
                                                {
                                                    "release": {
                                                        "value": 1000.0
                                                    },
                                                    "sustain": {
                                                        "value": 0.4
                                                    },
                                                    "decay": {
                                                        "value": 40.0
                                                    },
                                                    "attack": {
                                                        "value": 5.0
                                                    }
                                                },
                                                {
                                                    "release": {
                                                        "value": 1000.0
                                                    },
                                                    "sustain": {
                                                        "value": 0.4
                                                    },
                                                    "decay": {
                                                        "value": 40.0
                                                    },
                                                    "attack": {
                                                        "value": 5.0
                                                    }
                                                },
                                                {
                                                    "release": {
                                                        "value": 1000.0
                                                    },
                                                    "sustain": {
                                                        "value": 0.4
                                                    },
                                                    "decay": {
                                                        "value": 40.0
                                                    },
                                                    "attack": {
                                                        "value": 5.0
                                                    }
                                                },
                                                {
                                                    "release": {
                                                        "value": 1000.0
                                                    },
                                                    "sustain": {
                                                        "value": 0.4
                                                    },
                                                    "decay": {
                                                        "value": 40.0
                                                    },
                                                    "attack": {
                                                        "value": 5.0
                                                    }
                                                },
                                                {
                                                    "release": {
                                                        "value": 1000.0
                                                    },
                                                    "sustain": {
                                                        "value": 0.4
                                                    },
                                                    "decay": {
                                                        "value": 40.0
                                                    },
                                                    "attack": {
                                                        "value": 5.0
                                                    }
                                                },
                                                {
                                                    "release": {
                                                        "value": 1000.0
                                                    },
                                                    "sustain": {
                                                        "value": 0.4
                                                    },
                                                    "decay": {
                                                        "value": 40.0
                                                    },
                                                    "attack": {
                                                        "value": 5.0
                                                    }
                                                },
                                                {
                                                    "release": {
                                                        "value": 1000.0
                                                    },
                                                    "sustain": {
                                                        "value": 0.4
                                                    },
                                                    "decay": {
                                                        "value": 40.0
                                                    },
                                                    "attack": {
                                                        "value": 5.0
                                                    }
                                                }
                                            ]
                                        },
                                        "mto-center-freq": {
                                            "value": 16.0
                                        },
                                        "__presetid": "777aeadf-e17b-11ea-aadf-00e04cab9ef0"
                                    },
                                    "fileref": {
                                        "name": "rnbo",
                                        "filename": "rnbo_20200818.maxsnap",
                                        "filepath": "~/Documents/Max 8/Snapshots",
                                        "filepos": -1,
                                        "snapshotfileid": "a61c74adc9b6d9c36cf3b66b94c808ce"
                                    }
                                },
                                {
                                    "filetype": "C74Snapshot",
                                    "version": 2,
                                    "minorversion": 0,
                                    "name": "Wah",
                                    "origin": "777aeadf-e17b-11ea-aadf-00e04cab9ef0",
                                    "type": "rnbo",
                                    "subtype": "",
                                    "embed": 1,
                                    "snapshot": {
                                        "bandwidth": {
                                            "value": 88.0
                                        },
                                        "__sps": {
                                            "paffer": [
                                                {
                                                    "release": {
                                                        "value": 1000.0
                                                    },
                                                    "sustain": {
                                                        "value": 0.4
                                                    },
                                                    "decay": {
                                                        "value": 40.0
                                                    },
                                                    "attack": {
                                                        "value": 100.0
                                                    }
                                                },
                                                {
                                                    "release": {
                                                        "value": 1000.0
                                                    },
                                                    "sustain": {
                                                        "value": 0.4
                                                    },
                                                    "decay": {
                                                        "value": 40.0
                                                    },
                                                    "attack": {
                                                        "value": 100.0
                                                    }
                                                },
                                                {
                                                    "release": {
                                                        "value": 1000.0
                                                    },
                                                    "sustain": {
                                                        "value": 0.4
                                                    },
                                                    "decay": {
                                                        "value": 40.0
                                                    },
                                                    "attack": {
                                                        "value": 100.0
                                                    }
                                                },
                                                {
                                                    "release": {
                                                        "value": 1000.0
                                                    },
                                                    "sustain": {
                                                        "value": 0.4
                                                    },
                                                    "decay": {
                                                        "value": 40.0
                                                    },
                                                    "attack": {
                                                        "value": 100.0
                                                    }
                                                },
                                                {
                                                    "release": {
                                                        "value": 1000.0
                                                    },
                                                    "sustain": {
                                                        "value": 0.4
                                                    },
                                                    "decay": {
                                                        "value": 40.0
                                                    },
                                                    "attack": {
                                                        "value": 100.0
                                                    }
                                                },
                                                {
                                                    "release": {
                                                        "value": 1000.0
                                                    },
                                                    "sustain": {
                                                        "value": 0.4
                                                    },
                                                    "decay": {
                                                        "value": 40.0
                                                    },
                                                    "attack": {
                                                        "value": 100.0
                                                    }
                                                },
                                                {
                                                    "release": {
                                                        "value": 1000.0
                                                    },
                                                    "sustain": {
                                                        "value": 0.4
                                                    },
                                                    "decay": {
                                                        "value": 40.0
                                                    },
                                                    "attack": {
                                                        "value": 100.0
                                                    }
                                                },
                                                {
                                                    "release": {
                                                        "value": 1000.0
                                                    },
                                                    "sustain": {
                                                        "value": 0.4
                                                    },
                                                    "decay": {
                                                        "value": 40.0
                                                    },
                                                    "attack": {
                                                        "value": 100.0
                                                    }
                                                }
                                            ]
                                        },
                                        "mto-center-freq": {
                                            "value": 10.0
                                        },
                                        "__presetid": "777aeadf-e17b-11ea-aadf-00e04cab9ef0"
                                    },
                                    "fileref": {
                                        "name": "Wah",
                                        "filename": "Wah.maxsnap",
                                        "filepath": "~/Documents/Max 9/Snapshots",
                                        "filepos": -1,
                                        "snapshotfileid": "80ae89b075cb00e8b47f9946b33b363b"
                                    }
                                },
                                {
                                    "filetype": "C74Snapshot",
                                    "version": 2,
                                    "minorversion": 0,
                                    "name": "Slow",
                                    "origin": "777aeadf-e17b-11ea-aadf-00e04cab9ef0",
                                    "type": "rnbo",
                                    "subtype": "",
                                    "embed": 1,
                                    "snapshot": {
                                        "bandwidth": {
                                            "value": 88.0
                                        },
                                        "__sps": {
                                            "paffer": [
                                                {
                                                    "release": {
                                                        "value": 2381.0
                                                    },
                                                    "sustain": {
                                                        "value": 0.4
                                                    },
                                                    "decay": {
                                                        "value": 100.0
                                                    },
                                                    "attack": {
                                                        "value": 617.0
                                                    }
                                                },
                                                {
                                                    "release": {
                                                        "value": 2381.0
                                                    },
                                                    "sustain": {
                                                        "value": 0.4
                                                    },
                                                    "decay": {
                                                        "value": 100.0
                                                    },
                                                    "attack": {
                                                        "value": 617.0
                                                    }
                                                },
                                                {
                                                    "release": {
                                                        "value": 2381.0
                                                    },
                                                    "sustain": {
                                                        "value": 0.4
                                                    },
                                                    "decay": {
                                                        "value": 100.0
                                                    },
                                                    "attack": {
                                                        "value": 617.0
                                                    }
                                                },
                                                {
                                                    "release": {
                                                        "value": 2381.0
                                                    },
                                                    "sustain": {
                                                        "value": 0.4
                                                    },
                                                    "decay": {
                                                        "value": 100.0
                                                    },
                                                    "attack": {
                                                        "value": 617.0
                                                    }
                                                },
                                                {
                                                    "release": {
                                                        "value": 2381.0
                                                    },
                                                    "sustain": {
                                                        "value": 0.4
                                                    },
                                                    "decay": {
                                                        "value": 100.0
                                                    },
                                                    "attack": {
                                                        "value": 617.0
                                                    }
                                                },
                                                {
                                                    "release": {
                                                        "value": 2381.0
                                                    },
                                                    "sustain": {
                                                        "value": 0.4
                                                    },
                                                    "decay": {
                                                        "value": 100.0
                                                    },
                                                    "attack": {
                                                        "value": 617.0
                                                    }
                                                },
                                                {
                                                    "release": {
                                                        "value": 2381.0
                                                    },
                                                    "sustain": {
                                                        "value": 0.4
                                                    },
                                                    "decay": {
                                                        "value": 100.0
                                                    },
                                                    "attack": {
                                                        "value": 617.0
                                                    }
                                                },
                                                {
                                                    "release": {
                                                        "value": 2381.0
                                                    },
                                                    "sustain": {
                                                        "value": 0.4
                                                    },
                                                    "decay": {
                                                        "value": 100.0
                                                    },
                                                    "attack": {
                                                        "value": 617.0
                                                    }
                                                },
                                                {
                                                    "release": {
                                                        "value": 2381.0
                                                    },
                                                    "sustain": {
                                                        "value": 0.4
                                                    },
                                                    "decay": {
                                                        "value": 100.0
                                                    },
                                                    "attack": {
                                                        "value": 617.0
                                                    }
                                                },
                                                {
                                                    "release": {
                                                        "value": 2381.0
                                                    },
                                                    "sustain": {
                                                        "value": 0.4
                                                    },
                                                    "decay": {
                                                        "value": 100.0
                                                    },
                                                    "attack": {
                                                        "value": 617.0
                                                    }
                                                },
                                                {
                                                    "release": {
                                                        "value": 2381.0
                                                    },
                                                    "sustain": {
                                                        "value": 0.4
                                                    },
                                                    "decay": {
                                                        "value": 100.0
                                                    },
                                                    "attack": {
                                                        "value": 617.0
                                                    }
                                                },
                                                {
                                                    "release": {
                                                        "value": 2381.0
                                                    },
                                                    "sustain": {
                                                        "value": 0.4
                                                    },
                                                    "decay": {
                                                        "value": 100.0
                                                    },
                                                    "attack": {
                                                        "value": 617.0
                                                    }
                                                },
                                                {
                                                    "release": {
                                                        "value": 2381.0
                                                    },
                                                    "sustain": {
                                                        "value": 0.4
                                                    },
                                                    "decay": {
                                                        "value": 100.0
                                                    },
                                                    "attack": {
                                                        "value": 617.0
                                                    }
                                                },
                                                {
                                                    "release": {
                                                        "value": 2381.0
                                                    },
                                                    "sustain": {
                                                        "value": 0.4
                                                    },
                                                    "decay": {
                                                        "value": 100.0
                                                    },
                                                    "attack": {
                                                        "value": 617.0
                                                    }
                                                },
                                                {
                                                    "release": {
                                                        "value": 2381.0
                                                    },
                                                    "sustain": {
                                                        "value": 0.4
                                                    },
                                                    "decay": {
                                                        "value": 100.0
                                                    },
                                                    "attack": {
                                                        "value": 617.0
                                                    }
                                                },
                                                {
                                                    "release": {
                                                        "value": 2381.0
                                                    },
                                                    "sustain": {
                                                        "value": 0.4
                                                    },
                                                    "decay": {
                                                        "value": 100.0
                                                    },
                                                    "attack": {
                                                        "value": 617.0
                                                    }
                                                }
                                            ]
                                        },
                                        "mto-center-freq": {
                                            "value": 37.0
                                        },
                                        "__presetid": "777aeadf-e17b-11ea-aadf-00e04cab9ef0"
                                    },
                                    "fileref": {
                                        "name": "rnbo[2]",
                                        "filename": "rnbo[2].maxsnap",
                                        "filepath": "~/Documents/Max 8/Snapshots",
                                        "filepos": -1,
                                        "snapshotfileid": "3728de9aac6f71bc8e5257a3f714e463"
                                    }
                                },
                                {
                                    "filetype": "C74Snapshot",
                                    "version": 2,
                                    "minorversion": 0,
                                    "name": "Muted",
                                    "origin": "777aeadf-e17b-11ea-aadf-00e04cab9ef0",
                                    "type": "rnbo",
                                    "subtype": "",
                                    "embed": 1,
                                    "snapshot": {
                                        "bandwidth": {
                                            "value": 81.80000000000001
                                        },
                                        "__sps": {
                                            "paffer": [
                                                {
                                                    "release": {
                                                        "value": 1915.0
                                                    },
                                                    "sustain": {
                                                        "value": 0.5
                                                    },
                                                    "decay": {
                                                        "value": 127.0
                                                    },
                                                    "attack": {
                                                        "value": 23.5
                                                    }
                                                },
                                                {
                                                    "release": {
                                                        "value": 1915.0
                                                    },
                                                    "sustain": {
                                                        "value": 0.5
                                                    },
                                                    "decay": {
                                                        "value": 127.0
                                                    },
                                                    "attack": {
                                                        "value": 23.5
                                                    }
                                                },
                                                {
                                                    "release": {
                                                        "value": 1915.0
                                                    },
                                                    "sustain": {
                                                        "value": 0.5
                                                    },
                                                    "decay": {
                                                        "value": 127.0
                                                    },
                                                    "attack": {
                                                        "value": 23.5
                                                    }
                                                },
                                                {
                                                    "release": {
                                                        "value": 1915.0
                                                    },
                                                    "sustain": {
                                                        "value": 0.5
                                                    },
                                                    "decay": {
                                                        "value": 127.0
                                                    },
                                                    "attack": {
                                                        "value": 23.5
                                                    }
                                                },
                                                {
                                                    "release": {
                                                        "value": 1915.0
                                                    },
                                                    "sustain": {
                                                        "value": 0.5
                                                    },
                                                    "decay": {
                                                        "value": 127.0
                                                    },
                                                    "attack": {
                                                        "value": 23.5
                                                    }
                                                },
                                                {
                                                    "release": {
                                                        "value": 1915.0
                                                    },
                                                    "sustain": {
                                                        "value": 0.5
                                                    },
                                                    "decay": {
                                                        "value": 127.0
                                                    },
                                                    "attack": {
                                                        "value": 23.5
                                                    }
                                                },
                                                {
                                                    "release": {
                                                        "value": 1915.0
                                                    },
                                                    "sustain": {
                                                        "value": 0.5
                                                    },
                                                    "decay": {
                                                        "value": 127.0
                                                    },
                                                    "attack": {
                                                        "value": 23.5
                                                    }
                                                },
                                                {
                                                    "release": {
                                                        "value": 1915.0
                                                    },
                                                    "sustain": {
                                                        "value": 0.5
                                                    },
                                                    "decay": {
                                                        "value": 127.0
                                                    },
                                                    "attack": {
                                                        "value": 23.5
                                                    }
                                                }
                                            ]
                                        },
                                        "mto-center-freq": {
                                            "value": 30.3
                                        },
                                        "__presetid": "777aeadf-e17b-11ea-aadf-00e04cab9ef0"
                                    },
                                    "fileref": {
                                        "name": "rnbo[3]",
                                        "filename": "rnbo[3].maxsnap",
                                        "filepath": "~/Documents/Max 9/Snapshots",
                                        "filepos": -1,
                                        "snapshotfileid": "3be6d8836a7b82603856b04a1620dd73"
                                    }
                                },
                                {
                                    "filetype": "C74Snapshot",
                                    "version": 2,
                                    "minorversion": 0,
                                    "name": "Default",
                                    "origin": "777aeadf-e17b-11ea-aadf-00e04cab9ef0",
                                    "type": "rnbo",
                                    "subtype": "",
                                    "embed": 1,
                                    "snapshot": {
                                        "bandwidth": {
                                            "value": 80.0
                                        },
                                        "__sps": {
                                            "paffer": [
                                                {
                                                    "release": {
                                                        "value": 600.0
                                                    },
                                                    "sustain": {
                                                        "value": 0.5
                                                    },
                                                    "decay": {
                                                        "value": 100.0
                                                    },
                                                    "attack": {
                                                        "value": 20.0
                                                    }
                                                },
                                                {
                                                    "release": {
                                                        "value": 600.0
                                                    },
                                                    "sustain": {
                                                        "value": 0.5
                                                    },
                                                    "decay": {
                                                        "value": 100.0
                                                    },
                                                    "attack": {
                                                        "value": 20.0
                                                    }
                                                },
                                                {
                                                    "release": {
                                                        "value": 600.0
                                                    },
                                                    "sustain": {
                                                        "value": 0.5
                                                    },
                                                    "decay": {
                                                        "value": 100.0
                                                    },
                                                    "attack": {
                                                        "value": 20.0
                                                    }
                                                },
                                                {
                                                    "release": {
                                                        "value": 600.0
                                                    },
                                                    "sustain": {
                                                        "value": 0.5
                                                    },
                                                    "decay": {
                                                        "value": 100.0
                                                    },
                                                    "attack": {
                                                        "value": 20.0
                                                    }
                                                },
                                                {
                                                    "release": {
                                                        "value": 600.0
                                                    },
                                                    "sustain": {
                                                        "value": 0.5
                                                    },
                                                    "decay": {
                                                        "value": 100.0
                                                    },
                                                    "attack": {
                                                        "value": 20.0
                                                    }
                                                },
                                                {
                                                    "release": {
                                                        "value": 600.0
                                                    },
                                                    "sustain": {
                                                        "value": 0.5
                                                    },
                                                    "decay": {
                                                        "value": 100.0
                                                    },
                                                    "attack": {
                                                        "value": 20.0
                                                    }
                                                },
                                                {
                                                    "release": {
                                                        "value": 600.0
                                                    },
                                                    "sustain": {
                                                        "value": 0.5
                                                    },
                                                    "decay": {
                                                        "value": 100.0
                                                    },
                                                    "attack": {
                                                        "value": 20.0
                                                    }
                                                },
                                                {
                                                    "release": {
                                                        "value": 600.0
                                                    },
                                                    "sustain": {
                                                        "value": 0.5
                                                    },
                                                    "decay": {
                                                        "value": 100.0
                                                    },
                                                    "attack": {
                                                        "value": 20.0
                                                    }
                                                }
                                            ]
                                        },
                                        "mto-center-freq": {
                                            "value": 30.0
                                        },
                                        "__presetid": "777aeadf-e17b-11ea-aadf-00e04cab9ef0"
                                    },
                                    "fileref": {
                                        "name": "Default",
                                        "filename": "rnbo[4].maxsnap",
                                        "filepath": "~/Documents/Max 9/Snapshots",
                                        "filepos": -1,
                                        "snapshotfileid": "6b63648c8e714f70ecbf578ed0ff6dc5"
                                    }
                                }
                            ]
                        }
                    },
                    "text": "rnbo~",
                    "varname": "rnbo~"
                }
            },
            {
                "box": {
                    "attr": "mto-center-freq",
                    "id": "obj-10",
                    "maxclass": "attrui",
                    "numinlets": 1,
                    "numoutlets": 1,
                    "outlettype": [ "" ],
                    "parameter_enable": 0,
                    "patching_rect": [ 341.0, 109.0, 188.0, 22.0 ],
                    "text_width": 126.0
                }
            },
            {
                "box": {
                    "attr": "paffer/attack",
                    "id": "obj-4",
                    "maxclass": "attrui",
                    "numinlets": 1,
                    "numoutlets": 1,
                    "outlettype": [ "" ],
                    "parameter_enable": 0,
                    "patching_rect": [ 341.0, 242.0, 150.0, 22.0 ]
                }
            },
            {
                "box": {
                    "attr": "paffer/decay",
                    "id": "obj-6",
                    "maxclass": "attrui",
                    "numinlets": 1,
                    "numoutlets": 1,
                    "outlettype": [ "" ],
                    "parameter_enable": 0,
                    "patching_rect": [ 341.0, 270.0, 150.0, 22.0 ]
                }
            },
            {
                "box": {
                    "attr": "paffer/release",
                    "id": "obj-7",
                    "maxclass": "attrui",
                    "numinlets": 1,
                    "numoutlets": 1,
                    "outlettype": [ "" ],
                    "parameter_enable": 0,
                    "patching_rect": [ 341.0, 324.0, 150.0, 22.0 ]
                }
            },
            {
                "box": {
                    "attr": "paffer/sustain",
                    "id": "obj-8",
                    "maxclass": "attrui",
                    "numinlets": 1,
                    "numoutlets": 1,
                    "outlettype": [ "" ],
                    "parameter_enable": 0,
                    "patching_rect": [ 341.0, 296.0, 150.0, 22.0 ]
                }
            }
        ],
        "lines": [
            {
                "patchline": {
                    "destination": [ "obj-5", 1 ],
                    "source": [ "obj-1", 1 ]
                }
            },
            {
                "patchline": {
                    "destination": [ "obj-5", 0 ],
                    "source": [ "obj-1", 0 ]
                }
            },
            {
                "patchline": {
                    "destination": [ "obj-1", 0 ],
                    "source": [ "obj-10", 0 ]
                }
            },
            {
                "patchline": {
                    "destination": [ "obj-1", 0 ],
                    "source": [ "obj-11", 0 ]
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
                    "destination": [ "obj-2", 1 ],
                    "source": [ "obj-5", 1 ]
                }
            },
            {
                "patchline": {
                    "destination": [ "obj-2", 0 ],
                    "source": [ "obj-5", 0 ]
                }
            },
            {
                "patchline": {
                    "destination": [ "obj-1", 0 ],
                    "source": [ "obj-6", 0 ]
                }
            },
            {
                "patchline": {
                    "destination": [ "obj-1", 0 ],
                    "source": [ "obj-7", 0 ]
                }
            },
            {
                "patchline": {
                    "destination": [ "obj-1", 0 ],
                    "source": [ "obj-8", 0 ]
                }
            },
            {
                "patchline": {
                    "destination": [ "obj-1", 1 ],
                    "source": [ "obj-9", 0 ]
                }
            }
        ],
        "parameters": {
            "obj-1": [ "rnbo~", "rnbo~", 0 ],
            "obj-5": [ "live.gain~", "live.gain~", 0 ],
            "inherited_shortname": 1
        },
        "autosave": 0,
        "styles": [
            {
                "name": "helpfile_label-1",
                "default": {
                    "fontname": [ "Arial" ],
                    "fontsize": [ 13.0 ],
                    "textcolor": [ 0.501961, 0.501961, 0.501961, 1.0 ]
                },
                "parentstyle": "",
                "multi": 0
            },
            {
                "name": "newobjBlue-1",
                "default": {
                    "accentcolor": [ 0.317647, 0.654902, 0.976471, 1.0 ]
                },
                "parentstyle": "",
                "multi": 0
            },
            {
                "name": "newobjGreen-1",
                "default": {
                    "accentcolor": [ 0.0, 0.533333, 0.168627, 1.0 ]
                },
                "parentstyle": "",
                "multi": 0
            },
            {
                "name": "newobjYellow-1",
                "default": {
                    "accentcolor": [ 0.82517, 0.78181, 0.059545, 1.0 ],
                    "fontsize": [ 12.059008 ]
                },
                "parentstyle": "",
                "multi": 0
            }
        ]
    }
}