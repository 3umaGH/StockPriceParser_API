const express = require('express')
const { getTickerPrice, fetchTickerPrices } = require('./util/util')
const cors = require('cors')
const app = express()

const stockObjArray = [
  { symbol: 'EURUSD', type: 'currency' },
  { symbol: 'JPYUSD', type: 'currency' },
  { symbol: 'GBPUSD', type: 'currency' },
  { symbol: 'AUDUSD', type: 'currency' },
  { symbol: 'CADUSD', type: 'currency' },
  { symbol: 'CHFUSD', type: 'currency' },
  { symbol: 'HKDUSD', type: 'currency' },
  { symbol: 'NZDUSD', type: 'currency' },
  { symbol: 'CNYUSD', type: 'currency' },
  { symbol: 'SEKUSD', type: 'currency' },
  { symbol: 'MXNUSD', type: 'currency' },
  { symbol: 'NZDUSD', type: 'currency' },
  { symbol: 'SGDUSD', type: 'currency' },
  { symbol: 'HKDUSD', type: 'currency' },
  { symbol: 'NOKUSD', type: 'currency' },
  { symbol: 'KRWUSD', type: 'currency' },
  { symbol: 'TRYUSD', type: 'currency' },
  { symbol: 'INRUSD', type: 'currency' },
  { symbol: 'RUBUSD', type: 'currency' },
  { symbol: 'BRLUSD', type: 'currency' },
  { symbol: 'ZARUSD', type: 'currency' },
  { symbol: 'DKKUSD', type: 'currency' },
  { symbol: 'THBUSD', type: 'currency' },

  { symbol: 'VWCE:FRA:EUR', type: 'stock' },
  { symbol: 'SPY:PCQ:USD', type: 'stock' },
  { symbol: 'IVV:PCQ:USD', type: 'stock' },
  { symbol: 'VOO:PCQ:USD', type: 'stock' },
  { symbol: 'VTI:PCQ:USD', type: 'stock' },
  { symbol: 'QQQ:NMQ:USD', type: 'stock' },
  { symbol: 'VEA:PCQ:USD', type: 'stock' },
  { symbol: 'IEFA:BTQ:USD', type: 'stock' },
  { symbol: 'VTV:PCQ:USD', type: 'stock' },
  /*{ symbol: "BND:NMQ:USD", type: "stock" },
  { symbol: "VUG:PCQ:USD", type: "stock" },
  { symbol: "AGG:PCQ:USD", type: "stock" },
  { symbol: "IWF:PCQ:USD", type: "stock" },
  { symbol: "VWO:PCQ:USD", type: "stock" },
  { symbol: "IJH:PCQ:USD", type: "stock" },
  { symbol: "IEMG:PCQ:USD", type: "stock" },
  { symbol: "VIG:PCQ:USD", type: "stock" },
  { symbol: "IJR:PCQ:USD", type: "stock" },
  { symbol: "VXUS:NMQ:USD", type: "stock" },
  { symbol: "GLD:PCQ:USD", type: "stock" },
  { symbol: "VGT:PCQ:USD", type: "stock" },
  { symbol: "XLK:PCQ:USD", type: "stock" },
  { symbol: "VO:PCQ:USD", type: "stock" },
  { symbol: "IWM:PCQ:USD", type: "stock" },
  { symbol: "BNDX:NMQ:USD", type: "stock" },
  { symbol: "IWD:PCQ:USD", type: "stock" },
  { symbol: "SCHD:PCQ:USD", type: "stock" },
  { symbol: "VYM:PCQ:USD", type: "stock" },
  { symbol: "EFA:PCQ:USD", type: "stock" },
  { symbol: "ITOT:PCQ:USD", type: "stock" },
  { symbol: "TLT:NMQ:USD", type: "stock" },
  { symbol: "VB:PCQ:USD", type: "stock" },
  { symbol: "RSP:PCQ:USD", type: "stock" },
  { symbol: "VCIT:NMQ:USD", type: "stock" },
  { symbol: "XLV:PCQ:USD", type: "stock" },
  { symbol: "XLE:PCQ:USD", type: "stock" },
  { symbol: "MUB:PCQ:USD", type: "stock" },
  { symbol: "IVW:PCQ:USD", type: "stock" },
  { symbol: "BIL:PCQ:USD", type: "stock" },
  { symbol: "VEU:PCQ:USD", type: "stock" },
  { symbol: "VCSH:NMQ:USD", type: "stock" },
  { symbol: "SCHX:PCQ:USD", type: "stock" },
  { symbol: "QUAL:BTQ:USD", type: "stock" },
  { symbol: "SCHF:PCQ:USD", type: "stock" },
  { symbol: "IXUS:NMQ:USD", type: "stock" },
  { symbol: "XLF:PCQ:USD", type: "stock" },
  { symbol: "BSV:PCQ:USD", type: "stock" },
  { symbol: "IWB:PCQ:USD", type: "stock" },
  { symbol: "VNQ:PCQ:USD", type: "stock" },
  { symbol: "VTEB:PCQ:USD", type: "stock" },
  { symbol: "LQD:PCQ:USD", type: "stock" },
  { symbol: "DIA:PCQ:USD", type: "stock" },
  { symbol: "JEPI:PCQ:USD", type: "stock" },
  { symbol: "VT:PCQ:USD", type: "stock" },
  { symbol: "VV:PCQ:USD", type: "stock" },
  { symbol: "IWR:PCQ:USD", type: "stock" },
  { symbol: "IEF:NMQ:USD", type: "stock" },
  { symbol: "MBB:NMQ:USD", type: "stock" },
  { symbol: "USMV:LSE:USD", type: "stock" },
  { symbol: "SHY:NMQ:USD", type: "stock" },
  { symbol: "IAU:PCQ:USD", type: "stock" },
  { symbol: "IVE:PCQ:USD", type: "stock" },
  { symbol: "VBR:PCQ:USD", type: "stock" },
  { symbol: "DGRO:PCQ:USD", type: "stock" },
  { symbol: "SCHB:PCQ:USD", type: "stock" },
  { symbol: "SPLG:PCQ:USD", type: "stock" },
  { symbol: "GOVT:ASX:AUD", type: "stock" },
  { symbol: "JPST:PCQ:USD", type: "stock" },
  { symbol: "DFAC:PCQ:USD", type: "stock" },
  { symbol: "IUSB:NMQ:USD", type: "stock" },
  { symbol: "VGSH:NMQ:USD", type: "stock" },
  { symbol: "SCHG:PCQ:USD", type: "stock" },
  { symbol: "IGSB:NMQ:USD", type: "stock" },
  { symbol: "VGIT:NMQ:USD", type: "stock" },
  { symbol: "SPYG:PCQ:USD", type: "stock" },
  { symbol: "SDY:PCQ:USD", type: "stock" },
  { symbol: "SHV:NMQ:USD", type: "stock" },
  { symbol: "TIP:PCQ:USD", type: "stock" },
  { symbol: "TQQQ:NMQ:USD", type: "stock" },
  { symbol: "MDY:PCQ:USD", type: "stock" },
  { symbol: "USFR:PCQ:USD", type: "stock" },
  { symbol: "ACWI:NMQ:USD", type: "stock" },
  { symbol: "DVY:NMQ:USD", type: "stock" },
  { symbol: "SPYV:PCQ:USD", type: "stock" },
  { symbol: "VGK:PCQ:USD", type: "stock" },
  { symbol: "XLY:PCQ:USD", type: "stock" },
  { symbol: "VMBS:NMQ:USD", type: "stock" },
  { symbol: "SGOV:PCQ:USD", type: "stock" },
  { symbol: "SPDW:PCQ:USD", type: "stock" },
  { symbol: "QQQM:NMQ:USD", type: "stock" },
  { symbol: "HYG:PCQ:USD", type: "stock" },
  { symbol: "COWZ:BTQ:USD", type: "stock" },
  { symbol: "EEM:PCQ:USD", type: "stock" },
  { symbol: "EFV:BTQ:USD", type: "stock" },
  { symbol: "VONG:NMQ:USD", type: "stock" },
  { symbol: "VHT:PCQ:USD", type: "stock" },
  { symbol: "BIV:PCQ:USD", type: "stock" },
  { symbol: "VXF:PCQ:USD", type: "stock" },
  { symbol: "MGK:PCQ:USD", type: "stock" },
  { symbol: "XLP:PCQ:USD", type: "stock" },
  { symbol: "VOE:PCQ:USD", type: "stock" },
  { symbol: "XLC:PCQ:USD", type: "stock" },
  { symbol: "EMB:NMQ:USD", type: "stock" },
  { symbol: "IUSV:NMQ:USD", type: "stock" },
  { symbol: "XLI:PCQ:USD", type: "stock" },
  { symbol: "IUSG:NMQ:USD", type: "stock" },
  { symbol: "SCHA:PCQ:USD", type: "stock" },
  { symbol: "VBK:PCQ:USD", type: "stock" },
  { symbol: "XLU:PCQ:USD", type: "stock" },
  { symbol: "IYW:PCQ:USD", type: "stock" },
  { symbol: "GDX:PCQ:USD", type: "stock" },
  { symbol: "IWP:PCQ:USD", type: "stock" },
  { symbol: "PFF:NMQ:USD", type: "stock" },
  { symbol: "EWJ:PCQ:USD", type: "stock" },
  { symbol: "ESGU:LSE:USD", type: "stock" },
  { symbol: "IEI:NMQ:USD", type: "stock" },
  { symbol: "VTIP:NMQ:USD", type: "stock" },
  { symbol: "FNDX:PCQ:USD", type: "stock" },
  { symbol: "IWS:PCQ:USD", type: "stock" },
  { symbol: "OEF:PCQ:USD", type: "stock" },
  { symbol: "SCHO:PCQ:USD", type: "stock" },
  { symbol: "MOAT:BTQ:USD", type: "stock" },
  { symbol: "IWV:PCQ:USD", type: "stock" },
  { symbol: "SCHP:PCQ:USD", type: "stock" },
  { symbol: "IGIB:NMQ:USD", type: "stock" },
  { symbol: "IDEV:PCQ:USD", type: "stock" },
  { symbol: "FNDF:PCQ:USD", type: "stock" },
  { symbol: "NOBL:BTQ:USD", type: "stock" },
  { symbol: "GSLC:PCQ:USD", type: "stock" },
  { symbol: "VOT:PCQ:USD", type: "stock" },
  { symbol: "SLV:PCQ:USD", type: "stock" },
  { symbol: "IWN:PCQ:USD", type: "stock" },
  { symbol: "TFLO:PCQ:USD", type: "stock" },
  { symbol: "USHY:ASX:AUD", type: "stock" },
  { symbol: "DGRW:LSE:USD", type: "stock" },
  { symbol: "FVD:PCQ:USD", type: "stock" },
  { symbol: "SMH:LSE:USD", type: "stock" },
  { symbol: "EFG:BTQ:USD", type: "stock" },
  { symbol: "MINT:PCQ:USD", type: "stock" },
  { symbol: "HDV:PCQ:USD", type: "stock" },
  { symbol: "SCHM:PCQ:USD", type: "stock" },
  { symbol: "SCHV:PCQ:USD", type: "stock" },
  { symbol: "USIG:LSE:USD", type: "stock" },
  { symbol: "IWO:PCQ:USD", type: "stock" },
  { symbol: "BBJP:BTQ:USD", type: "stock" },
  { symbol: "SCZ:NMQ:USD", type: "stock" },
  { symbol: "SOXX:NMQ:USD", type: "stock" },
  { symbol: "SUB:PCQ:USD", type: "stock" },
  { symbol: "DFUV:PCQ:USD", type: "stock" },
  { symbol: "STIP:PCQ:USD", type: "stock" },
  { symbol: "VGLT:NMQ:USD", type: "stock" },
  { symbol: "VFH:PCQ:USD", type: "stock" },

  { symbol: "LLY:NYQ", type: "stock" },
  { symbol: "V:NYQ", type: "stock" },
  { symbol: "UNH:NYQ", type: "stock" },
  { symbol: "TSM:NYQ", type: "stock" },
  { symbol: "NVO:NYQ", type: "stock" },
  { symbol: "JPM:NYQ", type: "stock" },
  { symbol: "WMT:NYQ", type: "stock" },
  { symbol: "XOM:NYQ", type: "stock" },
  { symbol: "MA:NYQ", type: "stock" },
  { symbol: "JNJ:NYQ", type: "stock" },
  { symbol: "PG:NYQ", type: "stock" },
  { symbol: "ORCL:NYQ", type: "stock" },
  { symbol: "HD:NYQ", type: "stock" },
  { symbol: "CVX:NYQ", type: "stock" },
  { symbol: "MRK:NYQ", type: "stock" },
  { symbol: "KO:NYQ", type: "stock" },
  { symbol: "TM:NYQ", type: "stock" },
  { symbol: "ABBV:NYQ", type: "stock" },
  { symbol: "BAC:NYQ", type: "stock" },
  { symbol: "FMX:NYQ", type: "stock" },
  { symbol: "CRM:NYQ", type: "stock" },
  { symbol: "SHEL:NYQ", type: "stock" },
  { symbol: "ACN:NYQ", type: "stock" },
  { symbol: "MCD:NYQ", type: "stock" },
  { symbol: "NVS:NYQ", type: "stock" },
  { symbol: "BABA:NYQ", type: "stock" },
  { symbol: "TMO:NYQ", type: "stock" },
  { symbol: "SAP:NYQ", type: "stock" },
  { symbol: "ABT:NYQ", type: "stock" },
  { symbol: "PFE:NYQ", type: "stock" },
  { symbol: "DIS:NYQ", type: "stock" },
  { symbol: "NKE:NYQ", type: "stock" },
  { symbol: "TTE:NYQ", type: "stock" },
  { symbol: "DHR:NYQ", type: "stock" },
  { symbol: "VZ:NYQ", type: "stock" },
  { symbol: "BHP:NYQ", type: "stock" },
  { symbol: "WFC:NYQ", type: "stock" },
  { symbol: "HDB:NYQ", type: "stock" },
  { symbol: "HSBC:NYQ", type: "stock" },
  { symbol: "PM:NYQ", type: "stock" },
  { symbol: "IBM:NYQ", type: "stock" },
  { symbol: "NOW:NYQ", type: "stock" },
  { symbol: "COP:NYQ", type: "stock" },
  { symbol: "UNP:NYQ", type: "stock" },
  { symbol: "BA:NYQ", type: "stock" },
  { symbol: "GE:NYQ", type: "stock" },
  { symbol: "SPGI:NYQ", type: "stock" },
  { symbol: "BX:NYQ", type: "stock" },
  { symbol: "MS:NYQ", type: "stock" },
  { symbol: "UPS:NYQ", type: "stock" },
  { symbol: "CAT:NYQ", type: "stock" },
  { symbol: "AMAT:NSQ", type: "stock" },
  { symbol: "BUD:NYQ", type: "stock" },
  { symbol: "RY:NYQ", type: "stock" },
  { symbol: "UL:NYQ", type: "stock" },
  { symbol: "AXP:NYQ", type: "stock" },
  { symbol: "NEE:NYQ", type: "stock" },
  { symbol: "UBER:NYQ", type: "stock" },
  { symbol: "T:NYQ", type: "stock" },
  { symbol: "LOW:NYQ", type: "stock" },
  { symbol: "RTX:NYQ", type: "stock" },
  { symbol: "ELV:NYQ", type: "stock" },
  { symbol: "RIO:NYQ", type: "stock" },
  { symbol: "SYK:NYQ", type: "stock" },
  { symbol: "LMT:NYQ", type: "stock" },
  { symbol: "TD:NYQ", type: "stock" },
  { symbol: "GS:NYQ", type: "stock" },
  { symbol: "BLK:NYQ", type: "stock" },
  { symbol: "SONY:NYQ", type: "stock" },
  { symbol: "MDT:NYQ", type: "stock" },
  { symbol: "MUFG:NYQ", type: "stock" },
  { symbol: "DE:NYQ", type: "stock" },
  { symbol: "PLD:NYQ", type: "stock" },
  { symbol: "TJX:NYQ", type: "stock" },
  { symbol: "BP:NYQ", type: "stock" },
  { symbol: "BMY:NYQ", type: "stock" },
  { symbol: "SCHW:NYQ", type: "stock" },
  { symbol: "MMC:NYQ", type: "stock" },
  { symbol: "PBR:NYQ", type: "stock" },
  { symbol: "EQNR:NYQ", type: "stock" },
  { symbol: "PGR:NYQ", type: "stock" },
  { symbol: "SHOP:NYQ", type: "stock" },
  { symbol: "AMT:NYQ", type: "stock" },
  { symbol: "CB:NYQ", type: "stock" },
  { symbol: "ETN:NYQ", type: "stock" },
  { symbol: "CVS:NYQ", type: "stock" },
  { symbol: "C:NYQ", type: "stock" },
  { symbol: "UBS:NYQ", type: "stock" },
  { symbol: "CI:NYQ", type: "stock" },
  { symbol: "ZTS:NYQ", type: "stock" },
  { symbol: "BSX:NYQ", type: "stock" },
  { symbol: "DEO:NYQ", type: "stock" },
  { symbol: "KKR:NYQ", type: "stock" },
  { symbol: "IBN:NYQ", type: "stock" },
  { symbol: "SO:NYQ", type: "stock" },
  { symbol: "FI:NYQ", type: "stock" },
  { symbol: "SLB:NYQ", type: "stock" },
  { symbol: "CNI:NYQ", type: "stock" },
  { symbol: "MO:NYQ", type: "stock" },
  { symbol: "GSK:NYQ", type: "stock" },
  { symbol: "RELX:NYQ", type: "stock" },
  { symbol: "ITW:NYQ", type: "stock" },
  { symbol: "ENB:NYQ", type: "stock" },
  { symbol: "BTI:NYQ", type: "stock" },
  { symbol: "INFY:NYQ", type: "stock" },
  { symbol: "EOG:NYQ", type: "stock" },
  { symbol: "CNQ:NYQ", type: "stock" },
  { symbol: "NOC:NYQ", type: "stock" },
  { symbol: "SHW:NYQ", type: "stock" },
  { symbol: "DUK:NYQ", type: "stock" },
  { symbol: "BDX:NYQ", type: "stock" },
  { symbol: "WM:NYQ", type: "stock" },
  { symbol: "ANET:NYQ", type: "stock" },
  { symbol: "HCA:NYQ", type: "stock" },
  { symbol: "GD:NYQ", type: "stock" },
  { symbol: "RACE:NYQ", type: "stock" },
  { symbol: "SMFG:NYQ", type: "stock" },
  { symbol: "MCO:NYQ", type: "stock" },
  { symbol: "AON:NYQ", type: "stock" },
  { symbol: "CP:NYQ", type: "stock" },
  { symbol: "SAN:NYQ", type: "stock" },
  { symbol: "VALE:NYQ", type: "stock" },
  { symbol: "ICE:NYQ", type: "stock" },
  { symbol: "FDX:NYQ", type: "stock" },
  { symbol: "CL:NYQ", type: "stock" },
  { symbol: "TRI:NYQ", type: "stock" },
  { symbol: "HUM:NYQ", type: "stock" },
  { symbol: "STLA:NYQ", type: "stock" },
  { symbol: "MCK:NYQ", type: "stock" },
  { symbol: "CMG:NYQ", type: "stock" },
  { symbol: "ITUB:NYQ", type: "stock" },
  { symbol: "TGT:NYQ", type: "stock" },
  { symbol: "APD:NYQ", type: "stock" },
  { symbol: "EPD:NYQ", type: "stock" },
  { symbol: "BMO:NYQ", type: "stock" },
  { symbol: "USB:NYQ", type: "stock" },
  { symbol: "MPC:NYQ", type: "stock" },
  { symbol: "SNOW:NYQ", type: "stock" },
  { symbol: "AMX:NYQ", type: "stock" },
  { symbol: "BN:NYQ", type: "stock" },
  { symbol: "SCCO:NYQ", type: "stock" },
  { symbol: "PH:NYQ", type: "stock" },
  { symbol: "PXD:NYQ", type: "stock" },
  { symbol: "AJG:NYQ", type: "stock" },
  { symbol: "APH:NYQ", type: "stock" },
  { symbol: "TDG:NYQ", type: "stock" },
  { symbol: "BBVA:NYQ", type: "stock" },
  { symbol: "ECL:NYQ", type: "stock" },
  { symbol: "DELL:NYQ", type: "stock" },
  { symbol: "MMM:NYQ", type: "stock" },
  { symbol: "E:NYQ", type: "stock" },
  { symbol: "BNS:NYQ", type: "stock" },
  { symbol: "MSI:NYQ", type: "stock" },
  { symbol: "OXY:NYQ", type: "stock" },
  { symbol: "FCX:NYQ", type: "stock" },
  { symbol: "PSX:NYQ", type: "stock" },
  { symbol: "APO:NYQ", type: "stock" },
  { symbol: "TT:NYQ", type: "stock" },
  { symbol: "PNC:NYQ", type: "stock" },
  { symbol: "HMC:NYQ", type: "stock" },
  { symbol: "RSG:NYQ", type: "stock" },
  { symbol: "EMR:NYQ", type: "stock" },
  { symbol: "WELL:NYQ", type: "stock" },
  { symbol: "NSC:NYQ", type: "stock" },
  { symbol: "AFL:NYQ", type: "stock" },
  { symbol: "ING:NYQ", type: "stock" },
  { symbol: "NGG:NYQ", type: "stock" },
  { symbol: "AZO:NYQ", type: "stock" },
  { symbol: "CCI:NYQ", type: "stock" },
  { symbol: "MET:NYQ", type: "stock" },
  { symbol: "SRE:NYQ", type: "stock" },
  { symbol: "ET:NYQ", type: "stock" },
  { symbol: "BSBR:NYQ", type: "stock" },
  { symbol: "AIG:NYQ", type: "stock" },
  { symbol: "PCG:NYQ", type: "stock" },
  { symbol: "SPG:NYQ", type: "stock" },
  { symbol: "PSA:NYQ", type: "stock" },
  { symbol: "EL:NYQ", type: "stock" },
  { symbol: "MFG:NYQ", type: "stock" },
  { symbol: "HES:NYQ", type: "stock" },
  { symbol: "TAK:NYQ", type: "stock" },
  { symbol: "WMB:NYQ", type: "stock" },
  { symbol: "CRH:NYQ", type: "stock" },
  { symbol: "CARR:NYQ", type: "stock" },
  { symbol: "NEM:NYQ", type: "stock" },
  { symbol: "STZ:NYQ", type: "stock" },
  { symbol: "HLT:NYQ", type: "stock" },
  { symbol: "ABEV:NYQ", type: "stock" },
  { symbol: "VLO:NYQ", type: "stock" },
  { symbol: "TFC:NYQ", type: "stock" },
  { symbol: "DHI:NYQ", type: "stock" },
  { symbol: "SU:NYQ", type: "stock" },
  { symbol: "PLTR:NYQ", type: "stock" },
  { symbol: "MSCI:NYQ", type: "stock" },
  { symbol: "DLR:NYQ", type: "stock" },
  { symbol: "KMB:NYQ", type: "stock" },
  { symbol: "STM:NYQ", type: "stock" },
  { symbol: "F:NYQ", type: "stock" },
  { symbol: "EW:NYQ", type: "stock" },
  { symbol: "TEL:NYQ", type: "stock" },
  { symbol: "TRV:NYQ", type: "stock" },
  { symbol: "COF:NYQ", type: "stock" },
  { symbol: "COR:NYQ", type: "stock" },
  { symbol: "GWW:NYQ", type: "stock" },
  { symbol: "NUE:NYQ", type: "stock" },
  { symbol: "CNC:NYQ", type: "stock" },
  { symbol: "WDS:NYQ", type: "stock" },
  { symbol: "HLN:NYQ", type: "stock" },
  { symbol: "ADM:NYQ", type: "stock" },
  { symbol: "NU:NYQ", type: "stock" },
  { symbol: "D:NYQ", type: "stock" },
  { symbol: "OKE:NYQ", type: "stock" },
  { symbol: "GM:NYQ", type: "stock" },
  { symbol: "O:NYQ", type: "stock" },
  { symbol: "IQV:NYQ", type: "stock" },
  { symbol: "HSY:NYQ", type: "stock" },
  { symbol: "KVUE:NYQ", type: "stock" },
  { symbol: "KMI:NYQ", type: "stock" },
  { symbol: "TRP:NYQ", type: "stock" },
  { symbol: "SQ:NYQ", type: "stock" },
  { symbol: "LVS:NYQ", type: "stock" },
  { symbol: "GIS:NYQ", type: "stock" },
  { symbol: "A:NYQ", type: "stock" },
  { symbol: "SYY:NYQ", type: "stock" },
  { symbol: "MPLX:NYQ", type: "stock" },
  { symbol: "ALC:NYQ", type: "stock" },
  { symbol: "BK:NYQ", type: "stock" },
  { symbol: "DOW:NYQ", type: "stock" },
  { symbol: "CM:NYQ", type: "stock" },
  { symbol: "BCE:NYQ", type: "stock" },
  { symbol: "SPOT:NYQ", type: "stock" },
  { symbol: "LHX:NYQ", type: "stock" },
  { symbol: "YUM:NYQ", type: "stock" },
  { symbol: "ALL:NYQ", type: "stock" },
  { symbol: "AMP:NYQ", type: "stock" },
  { symbol: "LEN:NYQ", type: "stock" },
  { symbol: "JCI:NYQ", type: "stock" },
  { symbol: "AME:NYQ", type: "stock" },
  { symbol: "MFC:NYQ", type: "stock" },
  { symbol: "BBD:NYQ", type: "stock" },
  { symbol: "OTIS:NYQ", type: "stock" },
  { symbol: "WCN:NYQ", type: "stock" },
  { symbol: "PRU:NYQ", type: "stock" },
  { symbol: "FERG:NYQ", type: "stock" },
  { symbol: "HAL:NYQ", type: "stock" },
  { symbol: "IT:NYQ", type: "stock" },
  { symbol: "ARES:NYQ", type: "stock" },
  { symbol: "LYG:NYQ", type: "stock" },
  { symbol: "FIS:NYQ", type: "stock" },
  { symbol: "CVE:NYQ", type: "stock" },
  { symbol: "ORAN:NYQ", type: "stock" },
  { symbol: "CTVA:NYQ", type: "stock" },
  { symbol: "PPG:NYQ", type: "stock" },
  { symbol: "PEG:NYQ", type: "stock" },
  { symbol: "KR:NYQ", type: "stock" },
  { symbol: "CMI:NYQ", type: "stock" },
  { symbol: "PUK:NYQ", type: "stock" },
  { symbol: "URI:NYQ", type: "stock" },
  { symbol: "ROK:NYQ", type: "stock" },
  { symbol: "ED:NYQ", type: "stock" },
  { symbol: "QSR:NYQ", type: "stock" },
  { symbol: "DD:NYQ", type: "stock" },
  { symbol: "LYB:NYQ", type: "stock" },
  { symbol: "SLF:NYQ", type: "stock" },
  { symbol: "VICI:NYQ", type: "stock" },
  { symbol: "GPN:NYQ", type: "stock" },
  { symbol: "CHT:NYQ", type: "stock" },
  { symbol: "CPNG:NYQ", type: "stock" },
  { symbol: "GOLD:NYQ", type: "stock" },
  { symbol: "DVN:NYQ", type: "stock" },
  { symbol: "MLM:NYQ", type: "stock" },
  { symbol: "IR:NYQ", type: "stock" },
  { symbol: "ELP:NYQ", type: "stock" },
  { symbol: "HPQ:NYQ", type: "stock" },
  { symbol: "VEEV:NYQ", type: "stock" },
  { symbol: "VMC:NYQ", type: "stock" },
  { symbol: "EXR:NYQ", type: "stock" },
  { symbol: "DG:NYQ", type: "stock" },
  { symbol: "PKX:NYQ", type: "stock" },
  { symbol: "RCL:NYQ", type: "stock" },
  { symbol: "NTR:NYQ", type: "stock" },
  { symbol: "BCS:NYQ", type: "stock" },
  { symbol: "PWR:NYQ", type: "stock" },
  { symbol: "FICO:NYQ", type: "stock" },
  { symbol: "CAH:NYQ", type: "stock" },
  { symbol: "WST:NYQ", type: "stock" },
  { symbol: "EC:NYQ", type: "stock" },
  { symbol: "EFX:NYQ", type: "stock" },
  { symbol: "TU:NYQ", type: "stock" },
  { symbol: "WEC:NYQ", type: "stock" },
  { symbol: "AWK:NYQ", type: "stock" },
  { symbol: "EIX:NYQ", type: "stock" },
  { symbol: "NET:NYQ", type: "stock" },
  { symbol: "AEM:NYQ", type: "stock" },
  { symbol: "XYL:NYQ", type: "stock" },
  { symbol: "AVB:NYQ", type: "stock" },
  { symbol: "WIT:NYQ", type: "stock" },
  { symbol: "DB:NYQ", type: "stock" },
  { symbol: "RBLX:NYQ", type: "stock" },
  { symbol: "KEYS:NYQ", type: "stock" },
  { symbol: "CBRE:NYQ", type: "stock" },
  { symbol: "GLW:NYQ", type: "stock" },
  { symbol: "TEF:NYQ", type: "stock" },
  { symbol: "PDX:NYQ", type: "stock" },
  { symbol: "HUBS:NYQ", type: "stock" },
  { symbol: "ZBH:NYQ", type: "stock" },
  { symbol: "FTV:NYQ", type: "stock" },
  { symbol: "TLK:NYQ", type: "stock" },
  { symbol: "APTV:NYQ", type: "stock" },
  { symbol: "MTD:NYQ", type: "stock" },
  { symbol: "HIG:NYQ", type: "stock" },
  { symbol: "CHD:NYQ", type: "stock" },
  { symbol: "GIB:NYQ", type: "stock" },
  { symbol: "GRMN:NYQ", type: "stock" },
  { symbol: "WY:NYQ", type: "stock" },
  { symbol: "DAL:NYQ", type: "stock" },
  { symbol: "NWG:NYQ", type: "stock" },
  { symbol: "RMD:NYQ", type: "stock" },
  { symbol: "RCI:NYQ", type: "stock" },
  { symbol: "FNV:NYQ", type: "stock" },
  { symbol: "PINS:NYQ", type: "stock" },
  { symbol: "BR:NYQ", type: "stock" },
  { symbol: "RJF:NYQ", type: "stock" },
  { symbol: "STT:NYQ", type: "stock" },
  { symbol: "HWM:NYQ", type: "stock" },
  { symbol: "DTE:NYQ", type: "stock" },
  { symbol: "DFS:NYQ", type: "stock" },
  { symbol: "FE:NYQ", type: "stock" },
  { symbol: "EQR:NYQ", type: "stock" },
  { symbol: "MOH:NYQ", type: "stock" },
  { symbol: "ETR:NYQ", type: "stock" },
  { symbol: "WPM:NYQ", type: "stock" },
  { symbol: "IX:NYQ", type: "stock" },
  { symbol: "SE:NYQ", type: "stock" },
  { symbol: "BRO:NYQ", type: "stock" },
  { symbol: "HEI:NYQ", type: "stock" },
  { symbol: "WAB:NYQ", type: "stock" },
  { symbol: "SNAP:NYQ", type: "stock" },
  { symbol: "MTB:NYQ", type: "stock" },
  { symbol: "ES:NYQ", type: "stock" },
  { symbol: "MT:NYQ", type: "stock" },
  { symbol: "INVH:NYQ", type: "stock" },
  { symbol: "AEE:NYQ", type: "stock" },
  { symbol: "HPE:NYQ", type: "stock" },
  { symbol: "LYV:NYQ", type: "stock" },
  { symbol: "TS:NYQ", type: "stock" },
  { symbol: "STE:NYQ", type: "stock" },
  { symbol: "FTS:NYQ", type: "stock" },
  { symbol: "CTRA:NYQ", type: "stock" },
  { symbol: "TRGP:NYQ", type: "stock" },
  { symbol: "PHG:NYQ", type: "stock" },
  { symbol: "NVR:NYQ", type: "stock" },
  { symbol: "NOK:NYQ", type: "stock" },
  { symbol: "UMC:NYQ", type: "stock" },
  { symbol: "DOV:NYQ", type: "stock" },
  { symbol: "CCJ:NYQ", type: "stock" },
  { symbol: "ROL:NYQ", type: "stock" },
  { symbol: "BEKE:NYQ", type: "stock" },
  { symbol: "PPL:NYQ", type: "stock" },
  { symbol: "CCL:NYQ", type: "stock" },
  { symbol: "GPC:NYQ", type: "stock" },
  { symbol: "AMAT:NSQ", type: "stock" },
  { symbol: "CME:NSQ", type: "stock" },
  { symbol: "ADP:NSQ", type: "stock" },
  { symbol: "CSCO:NSQ", type: "stock" },
  { symbol: "CHTR:NSQ", type: "stock" },
  { symbol: "ISRG:NSQ", type: "stock" },
  { symbol: "KLAC:NSQ", type: "stock" },
  { symbol: "CDNS:NSQ", type: "stock" },
  { symbol: "INTU:NSQ", type: "stock" },
  { symbol: "DLTR:NSQ", type: "stock" },
  { symbol: "ODFL:NSQ", type: "stock" },
  { symbol: "TXN:NSQ", type: "stock" },
  { symbol: "REGN:NSQ", type: "stock" },
  { symbol: "KHC:NSQ", type: "stock" },
  { symbol: "MNST:NSQ", type: "stock" },
  { symbol: "BIDU:NSQ", type: "stock" },
  { symbol: "DASH:NSQ", type: "stock" },
  { symbol: "SGEN:NSQ", type: "stock" },
  { symbol: "AMGN:NSQ", type: "stock" },
  { symbol: "PYPL:NSQ", type: "stock" },
  { symbol: "MCHP:NSQ", type: "stock" },
  { symbol: "DDOG:NSQ", type: "stock" },
  { symbol: "HON:NSQ", type: "stock" },
  { symbol: "PDD:NSQ", type: "stock" },
  { symbol: "AMZN:NSQ", type: "stock" },
  { symbol: "MRVL:NSQ", type: "stock" },
  { symbol: "PAYX:NSQ", type: "stock" },
  { symbol: "LRCX:NSQ", type: "stock" },
  { symbol: "BKNG:NSQ", type: "stock" },
  { symbol: "ROP:NSQ", type: "stock" },
  { symbol: "COST:NSQ", type: "stock" },
  { symbol: "NTES:NSQ", type: "stock" },
  { symbol: "ABNB:NSQ", type: "stock" },
  { symbol: "AMD:NSQ", type: "stock" },
  { symbol: "AAPL:NSQ", type: "stock" },
  { symbol: "AEP:NSQ", type: "stock" },
  { symbol: "AZN:NSQ", type: "stock" },
  { symbol: "ARM:NSQ", type: "stock" },
  { symbol: "TMUS:NSQ", type: "stock" },
  { symbol: "VRTX:NSQ", type: "stock" },
  { symbol: "TSLA:NSQ", type: "stock" },
  { symbol: "MELI:NSQ", type: "stock" },
  { symbol: "QCOM:NSQ", type: "stock" },
  { symbol: "GILD:NSQ", type: "stock" },
  { symbol: "GOOGL:NSQ", type: "stock" },
  { symbol: "SNY:NSQ", type: "stock" },
  { symbol: "IMO:TOR", type: "stock" },
  { symbol: "LNG:ASQ", type: "stock" },
  { symbol: "CEG:NSQ", type: "stock" },
  { symbol: "CMCSA:NSQ", type: "stock" },
  { symbol: "ASML:NSQ", type: "stock" },
  { symbol: "TROW:NSQ", type: "stock" },
  { symbol: "WDAY:NSQ", type: "stock" },
  { symbol: "MSFT:NSQ", type: "stock" },
  { symbol: "PEP:NSQ", type: "stock" },
  { symbol: "ADI:NSQ", type: "stock" },
  { symbol: "ORLY:NSQ", type: "stock" },
  { symbol: "DXCM:NSQ", type: "stock" },
  { symbol: "CSX:NSQ", type: "stock" },
  { symbol: "SBUX:NSQ", type: "stock" },
  { symbol: "EA:NSQ", type: "stock" },
  { symbol: "ZS:NSQ", type: "stock" },
  { symbol: "CPRT:NSQ", type: "stock" },
  { symbol: "NVDA:NSQ", type: "stock" },
  { symbol: "AVGO:NSQ", type: "stock" },
  { symbol: "ADBE:NSQ", type: "stock" },
  { symbol: "TEAM:NSQ", type: "stock" },
  { symbol: "CRWD:NSQ", type: "stock" },
  { symbol: "LIN:NSQ", type: "stock" },
  { symbol: "ADSK:NSQ", type: "stock" },
  { symbol: "NFLX:NSQ", type: "stock" },
  { symbol: "NXPI:NSQ", type: "stock" },
  { symbol: "LULU:NSQ", type: "stock" },
  { symbol: "ICLR:NSQ", type: "stock" },
  { symbol: "INTC:NSQ", type: "stock" },
  { symbol: "BNTX:NSQ", type: "stock" },
  { symbol: "ROST:NSQ", type: "stock" },
  { symbol: "WTW:NSQ", type: "stock" },
  { symbol: "META:NSQ", type: "stock" },
  { symbol: "MDLZ:NSQ", type: "stock" },
  { symbol: "PANW:NSQ", type: "stock" },
  { symbol: "IDXX:NSQ", type: "stock" },
  { symbol: "EXC:NSQ", type: "stock" },
  { symbol: "SYM:LSE", type: "stock" },
  { symbol: "MRNA:NSQ", type: "stock" },
  { symbol: "JD:NSQ", type: "stock" },
  { symbol: "TSCO:NSQ", type: "stock" },
  { symbol: "COIN:NSQ", type: "stock" },
  { symbol: "MPWR:NSQ", type: "stock" },
  { symbol: "GEHC:NSQ", type: "stock" },
  { symbol: "MBLY:NSQ", type: "stock" },
  { symbol: "SBAC:NSQ", type: "stock" },
  { symbol: "BKR:NSQ", type: "stock" },
  { symbol: "CTSH:NSQ", type: "stock" },
  { symbol: "MDB:NMQ", type: "stock" },
  { symbol: "PCAR:NSQ", type: "stock" },
  { symbol: "XEL:NSQ", type: "stock" },
  { symbol: "IBKR:NSQ", type: "stock" },
  { symbol: "CDW:NSQ", type: "stock" },
  { symbol: "ULTA:NSQ", type: "stock" },
  { symbol: "VOD:NSQ", type: "stock" },
  { symbol: "ANSS:NSQ", type: "stock" },
  { symbol: "WBD:NSQ", type: "stock" },
  { symbol: "TTWO:NSQ", type: "stock" },
  { symbol: "SPLK:NSQ", type: "stock" },
  { symbol: "CQP:ASQ", type: "stock" },
  { symbol: "VRSN:NSQ", type: "stock" },
  { symbol: "MU:NSQ", type: "stock" },
  { symbol: "FANG:NSQ", type: "stock" },
  { symbol: "FCNCA:NSQ", type: "stock" },
  { symbol: "ARGX:NSQ", type: "stock" },
  { symbol: "CCEP:NSQ", type: "stock" },
  { symbol: "ALNY:NSQ", type: "stock" },
  { symbol: "CSGP:NSQ", type: "stock" },
  { symbol: "FTNT:NSQ", type: "stock" },
  { symbol: "FAST:NSQ", type: "stock" },
  { symbol: "BGNE:NSQ", type: "stock" },
  { symbol: "GFS:NSQ", type: "stock" },
  { symbol: "GMAB:NSQ", type: "stock" },
  { symbol: "NDAQ:NSQ", type: "stock" },
  { symbol: "ACGL:NSQ", type: "stock" },
  { symbol: "CTAS:NSQ", type: "stock" },
  { symbol: "VRSK:NSQ", type: "stock" },
  { symbol: "ZM:NSQ", type: "stock" },
  { symbol: "TTD:NMQ", type: "stock" },
  { symbol: "ON:NSQ", type: "stock" },
  { symbol: "TW:NSQ", type: "stock" },
  { symbol: "KDP:NSQ", type: "stock" },
  { symbol: "EQIX:NSQ", type: "stock" },
  { symbol: "SNPS:NSQ", type: "stock" },
  { symbol: "RYAAY:NSQ", type: "stock" },
  { symbol: "TCOM:NSQ", type: "stock" },
  { symbol: "EBAY:NSQ", type: "stock" },
  { symbol: "LI:NSQ", type: "stock" },
  { symbol: "MAR:NSQ", type: "stock" },
  { symbol: "BIIB:NSQ", type: "stock" },*/
]

const tickerPrices = new Map()

const delay = 1000 * stockObjArray.length // 1 second per ticker

fetchTickerPrices(stockObjArray, tickerPrices, 100)

setInterval(() => fetchTickerPrices(stockObjArray, tickerPrices, delay), 1000 * 60 * 30)

app.use(
  cors({
    origin: '*',
    optionsSuccessStatus: 200,
  })
)

app.get('/', (req, res) => {
  console.log(tickerPrices.values())
  res.status(200).json(Array.from(tickerPrices.values()))
})

app.get('/all', (req, res) => {
  console.log(tickerPrices.values())
  res.status(200).json(stockObjArray)
})

app.listen(3000, '::')
