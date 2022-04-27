interface SearchSeriesFormat {
  [entryTitle: string]: {
    ["1. symbol"]: string;
    ["2. name"]: string;
    ["3. interface"]: string;
    ["4. region"]: string;
    ["5. marketOpen"]: string;
    ["6. marketClose"]: string;
    ["7. timezone"]: string;
    ["8. currency"]: string;
    ["9. matchScore"]: string;
  }[];
}

export interface SearchDataFormat {
  ["bestMatches"]: SearchSeriesFormat;
}
