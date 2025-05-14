export interface Cliente {
  clicdemp: number;
  clicdcli: number;
  clinumid: number;
  cliobser: string;
  cliuscad: string;
  pessoa: {
    pesidtpe: number;
    pespaiso: number;
    pespaisd: number;
    pesidtpd: number;
    pesnudoc: string;
    pesdtvdo: string | null;
    pesapeli: string;
    pesnomec: string;
    pesddi01: string;
    pesddd01: string;
    pestel01: string;
    pesddi02: string;
    pesddd02: string;
    pestel02: string;
    pesemail: string;
    peshomep: string;
    fisica: {
      fisdtnas: string;
      fisflgmi: string;
      fisdesmi: string;
      fisidest: number;
      fisidrca: number;
      fisnatoc: number;
      fisocupr: number;
      fisfsexo: string;
      fistpres: string;
      fisidtpd: number;
      fisnumrg: string;
      fisorexp: string;
      fisnuseg: string;
      fisdterg: string | null;
      fisdtvrg: string | null;
      fistpemp: string;
      fiscnpje: string;
      fisnomep: string;
      fiscarge: string;
    };
    juridica: {
      jurinsbc: number;
      jurpraca: number;
      jurnuemp: number;
      jurflimp: string;
      jurflexp: string;
      jurcdram: number;
      jurtpcon: number;
      jurnrjun: string;
      jurdtrjun: string | null;
      jurinscm: string;
      jurinsce: string;
    };
    enderecos: Array<{
      endtpend: string;
      endcdcep: string;
      endender: string;
      endnumer: string;
      endcompl: string;
      endbairr: string;
      endcidad: string;
      endcdunf: string;
    }>;
  };
  tvinclientefilialsis: {
    tvimodsy: string;
    tvicdfil: number;
  };
}
