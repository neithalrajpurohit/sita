export interface TChartData {
    legends:       Legends;
    doughnutlabel: Doughnutlabel;
    datasets:      Dataset[];
    charFooter?:TChartFooter;
}

export interface TChartFooter {
    label?:string;
    value?:string;
    valueFontColor?:string;
}

export interface Dataset {
    id:              number;
    label:           string;
    showDataLabel:   boolean;
    dataLabelColor:  string;
    data:            number[];
    originalData:    number[];
    hierarchy:       string[];
    backgroundColor: string[];
    labels:          string[];
    spacing:         number;
    weight:          number;
}

export interface Doughnutlabel {
    labels: Label[];
}

export interface Label {
    text:  string;
    font:  Font;
    color: string;
}

export interface Font {
    size: string;
}

export interface Legends {
    header: string;
    items:  Item[];
}

export interface Item {
    name:  string;
    color: string;
}
