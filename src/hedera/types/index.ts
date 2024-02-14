import { z } from "zod";

export const ZHederaIdRegex = z.string().regex(/^0.0.\d{1,9}$/);
export const ZHederaEvmRegex = z.string().regex(/^0x[0-9a-fA-F]{40}$/);
export const ZHederaTransactionRegex = z.string();

export const ZDateRegex = z.string().regex(/^\d{4}-\d{2}-\d{2}$/);

export enum Language {
    ENGLISH = "en",
    SPANISH = "es",
  }
   
export const ZLanguage = z.nativeEnum(Language);

export enum Locale {
    ENGLISH_US = "en-US",
    SPANISH_MEXICO = "es-MX",
  }
  export const ZLocale = z.nativeEnum(Locale);

export enum Currency {
    USD = "USD",
  }
  export const ZCurrency = z.nativeEnum(Currency);

export enum MimeTypes {
    aac = "audio/aac",
    abw = "application/x-abiword",
    arc = "application/x-freearc",
    avi = "video/x-msvideo",
    azw = "application/vnd.amazon.ebook",
    bin = "application/octet-stream",
    bmp = "image/bmp",
    bz = "application/x-bzip",
    bz2 = "application/x-bzip2",
    csh = "application/x-csh",
    css = "text/css",
    csv = "text/csv",
    doc = "application/msword",
    docx = "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    eot = "application/vnd.ms-fontobject",
    epub = "application/epub+zip",
    gz = "application/gzip",
    gif = "image/gif",
    htm = "text/html",
    html = "text/html",
    ico = "image/vnd.microsoft.icon",
    ics = "text/calendar",
    jar = "application/java-archive",
    jpeg = "image/jpeg",
    js = "text/javascript",
    json = "application/json",
    jsonld = "application/ld+json",
    mid = "audio/midi",
    mjs = "text/javascript",
    mp3 = "audio/mpeg",
    mpeg = "video/mpeg",
    mpkg = "application/vnd.apple.installer+xml",
    odp = "application/vnd.oasis.opendocument.presentation",
    ods = "application/vnd.oasis.opendocument.spreadsheet",
    odt = "application/vnd.oasis.opendocument.text",
    oga = "audio/ogg",
    ogv = "video/ogg",
    ogx = "application/ogg",
    opus = "audio/opus",
    otf = "font/otf",
    png = "image/png",
    pdf = "application/pdf",
    php = "application/php",
    ppt = "application/vnd.ms-powerpoint",
    pptx = "application/vnd.openxmlformats-officedocument.presentationml.presentation",
    rar = "application/vnd.rar",
    rtf = "application/rtf",
    sh = "application/x-sh",
    svg = "image/svg+xml",
    swf = "application/x-shockwave-flash",
    tar = "application/x-tar",
    tif = "image/tiff",
    tiff = "image/tiff",
    ts = "video/mp2t",
    ttf = "font/ttf",
    txt = "text/plain",
    vsd = "application/vnd.visio",
    wav = "audio/wav",
    weba = "audio/webm",
    webm = "video/webm",
    webp = "image/webp",
    woff = "font/woff",
    woff2 = "font/woff2",
    xhtml = "application/xhtml+xml",
    xls = "application/vnd.ms-excel",
    xlsx = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    xml = "XML",
    xul = "application/vnd.mozilla.xul+xml",
    zip = "application/zip",
    _3gp = "video/3gpp",
    _3g2 = "video/3gpp2",
    _7z = "application/x-7z-compressed",
  }
  export const ZMimeType = z.nativeEnum(MimeTypes);
  
  export enum AmoritizationType {
    FULL = "full",
    INTEREST_ONLY = "interest only",
    PARTIAL = "partial",
  }
  export const ZAmoritizationType = z.nativeEnum(AmoritizationType);
  
  export enum AccrualDayCount {
    ACTUAL_360 = "actual/360",
    ACTUAL_365 = "actual/365",
    ACTUAL_ACTUAL = "actual/actual",
    THIRTY_360 = "30/360",
    THIRTY_365 = "30/365",
  }
  export const ZAccrualDayCount = z.nativeEnum(AccrualDayCount);
  
  export enum Occupancy {
    PRIMARY = "primary",
    SECONDARY = "secondary",
    INVESTMENT = "investment",
  }
  export const ZOccupancy = z.nativeEnum(Occupancy);
  
  export enum InterestRateType {
    ADJUSTABLE = "adjustable",
    FIXED = "fixed",
  }
  export const ZInterestRateType = z.nativeEnum(InterestRateType);
  
  export enum ClosedLoanType {
    HELOC = "heloc",
    MORTGAGE = "mortgage",
  }
  export const ZClosedLoanType = z.nativeEnum(ClosedLoanType);

export enum CredentialTokenType {
  Appraisal = "Appraisal",
  GovernmentDocuments = "GovernmentDocuments",
  Guarantee = "Guarantee",
  HazardInsurance = "HazardInsurance",
  LoanClosed = "LoanClosed",
  LoanReview = "LoanReview",
  LoanStatus = "LoanStatus",
  Settlement = "Settlement",
  SDG = "SDG",
  TitleInsurance = "TitleInsurance",
}
export const ZCredentialTokenType = z.nativeEnum(CredentialTokenType);

export enum PermissionTokenType {
  Appraiser = "Appraiser",
  Auditor = "Auditor",
  Borrower = "Borrower",
  Developer = "Developer",
  DocumentRecorder = "Document Recorder",
  Guarantor = "Guarantor",
  ImpactReviewer = "Impact Reviewer",
  Investor = "Investor",
  Lender = "Lender",
  LoanReviewer = "Loan Reviewer",
  Servicer = "Servicer",
  Settlement = "Settlement",
  TitleInsurance = "Title Insurance",
}

export const ZPermissionTokenType = z.nativeEnum(PermissionTokenType);

export enum ActionType {
  ADD_LOAN_PAYMENT = "ADD LOAN PAYMENT",
  ASSIGN_LOAN_CREDENTIAL = "ASSIGN LOAN CREDENTIAL",
  CREATE_LOAN = "CREATE LOAN",
  REMOVE_LOAN_CREDENTIAL = "REMOVE LOAN CREDENTIAL",
  UPDATE_LOAN_STATUS = "UPDATE LOAN STATUS",
}
export const ZActionType = z.nativeEnum(ActionType);

export const ZTopicAction = z.object({
  requesterId: ZHederaIdRegex,
  entityId: ZHederaIdRegex,
  action: ZActionType,
  metadata: z.any(),
  scheduleId: ZHederaTransactionRegex,
  scheduleTransactionId: ZHederaTransactionRegex,
});
export type TTopicAction = z.infer<typeof ZTopicAction>;

export const ZTopicActionResult = z.object({
  actionMessageId: ZHederaIdRegex,
  requesterId: ZHederaIdRegex,
  entityId: ZHederaIdRegex,
  action: ZActionType,
  metadata: z.any(),
  permissionMessageId: ZHederaIdRegex,
  scheduleId: ZHederaTransactionRegex,
  scheduleTransactionId: ZHederaTransactionRegex,
  success: z.boolean(),
  reason: z.string().nullable(),
  topicMessageId: ZHederaIdRegex.nullable(),
});
export type TActionResult = z.infer<typeof ZTopicActionResult>;

export const ZPermissionCheck = z.object({
  actionMessageId: ZHederaIdRegex,
  requesterId: ZHederaIdRegex,
  entityId: ZHederaIdRegex,
  actionProof: z.any(),
  entityProof: z.any(),
  loanProof: z.any(),
  success: z.boolean(),
  reason: z.string().nullable(),
});
export type TPermissionCheck = z.infer<typeof ZPermissionCheck>;

export const ZSDGTarget = z.object({
  name: z.string(),
  number: z.union([z.string(), z.number().int().positive().finite()]),
});
export type TSDGTarget = z.infer<typeof ZSDGTarget>;

export const ZSDGGoal = z.object({
  name: z.string(),
  number: z.number().int().positive().finite(),
  targets: z.array(ZSDGTarget),
});
export type TSDGGoal = z.infer<typeof ZSDGGoal>;

export const ZSDGGoals = z.array(ZSDGGoal);
export type TSDGGoals = z.infer<typeof ZSDGGoals>;

export const ZSDGGoalTokenMetadata = z.object({
  goal: ZSDGGoal,
  reviewerId: ZHederaIdRegex,
  reviewerName: z.string(),
  signingTransaction: ZHederaTransactionRegex,
  target: ZSDGTarget,
});
export type TSDGGoalTokenMetadata = z.infer<typeof ZSDGGoalTokenMetadata>;

export const ZImpactTokenMetadata = z.object({
  borrowerAMI: z.number().int().gte(0).finite(),
  communityAMI: z.number().int().gte(0).finite(),
  constructionNew: z.boolean(),
  constructionRenovation: z.boolean(),
  firstTimeBuyer: z.boolean(),
  impactDocumentation: z.string(),
  loan: z.number().int().positive().finite(),
  minority: z.array(z.string()),
  profession: z.array(z.string()),
  reviewerId: ZHederaIdRegex,
  reviewerName: z.string(),
  signingTransaction: ZHederaTransactionRegex,
});
export type TImpactTokenMetadata = z.infer<typeof ZImpactTokenMetadata>;

export const ZLoanReviewTokenMetadata = z.object({
  documentation: z.string(),
  documentationVerified: z.boolean(),
  loan: z.number().int().positive().finite(),
  name: z.string(),
  reviewerId: ZHederaIdRegex,
  reviewerName: z.string(),
  riskRating: z.number().positive().int().finite().nullable(),
  signingTransaction: ZHederaTransactionRegex,
});
export type TLoanReviewTokenMetadata = z.infer<typeof ZLoanReviewTokenMetadata>;

export const ZGuaranteeTokenMetadata = z.object({
  documentation: z.string(),
  guarantorId: ZHederaIdRegex,
  guarantorName: z.string(),
  loan: z.number().int().positive().finite(),
  signingTransaction: ZHederaTransactionRegex,
});
export type TGuaranteeTokenMetadata = z.infer<typeof ZGuaranteeTokenMetadata>;

export const ZLoanStatusTokenMetadata = z.object({
  current: z.boolean(),
  daysLate: z.number().int().gte(0).finite(),
  date: ZDateRegex,
  servicerId: ZHederaIdRegex,
  signingTransaction: ZHederaTransactionRegex,
});
export type TLoanStatus = z.infer<typeof ZLoanStatusTokenMetadata>;

export const ZSettlementTokenMetadata = z.object({
  payoffsConfirmed: z.boolean(),
  settlementCompany: z.string(),
  settlementDate: ZDateRegex,
  settlementDocumentation: z.string(),
  settlementProviderId: ZHederaIdRegex,
  signingTransaction: ZHederaTransactionRegex,
});
export type TSettlementTokenMetadata = z.infer<typeof ZSettlementTokenMetadata>;

export const ZAppraisalTokenMetadata = z.object({
  appraiserId: ZHederaIdRegex,
  appraisalDate: ZDateRegex,
  appraisalDocumentation: z.string(),
  appraisalValue: z.number().positive().int().finite(),
  signingTransaction: ZHederaTransactionRegex,
});
export type TAppraisalTokenMetadata = z.infer<typeof ZAppraisalTokenMetadata>;

export const ZGovernmentDocumentsTokenMetadata = z.object({
  recorderDocumentation: z.string(),
  recorderId: ZHederaIdRegex,
  signingTransaction: ZHederaTransactionRegex,
});
export type TGovernmentDocumentsTokenMetadata = z.infer<
  typeof ZGovernmentDocumentsTokenMetadata
>;

export const ZHazardsInsuranceTokenMetadata = z.object({
  coverageStart: ZDateRegex,
  coverageEnd: ZDateRegex,
  insuranceCompany: z.string(),
  insuranceId: ZHederaIdRegex,
  signingTransaction: ZHederaTransactionRegex,
});
export type THazardsInsuranceTokenMetadata = z.infer<
  typeof ZHazardsInsuranceTokenMetadata
>;

export const ZMintCredentialTokenTopicMetadata = z.object({
  cosigners: z.array(ZHederaIdRegex),
  loan: z.number().int().positive().finite(),
  metadata: z.union([
    ZSDGGoalTokenMetadata,
    ZGuaranteeTokenMetadata,
    ZImpactTokenMetadata,
    ZLoanReviewTokenMetadata,
    ZLoanStatusTokenMetadata,
    ZSettlementTokenMetadata,
    ZAppraisalTokenMetadata,
    ZGovernmentDocumentsTokenMetadata,
    ZHazardsInsuranceTokenMetadata,
  ]),
  requester: ZHederaIdRegex,
  tokenType: ZCredentialTokenType,
  transactionId: ZHederaTransactionRegex,
});
export type TMintCredentialTokenTopicMetadata = z.infer<
  typeof ZMintCredentialTokenTopicMetadata
>;

export const ZCredentialTokenMetadataMinted = z.object({
  loan: z.number().int().positive().finite(),
  metadata: z.union([
    ZSDGGoalTokenMetadata,
    ZImpactTokenMetadata,
    ZLoanReviewTokenMetadata,
    ZLoanStatusTokenMetadata,
    ZSettlementTokenMetadata,
    ZAppraisalTokenMetadata,
    ZGovernmentDocumentsTokenMetadata,
    ZGuaranteeTokenMetadata,
    ZHazardsInsuranceTokenMetadata,
  ]),
  mintRequestTransaction: ZHederaTransactionRegex,
  serialNumber: z.number().int().positive().finite(),
  signers: z.array(ZHederaIdRegex),
  tokenType: ZCredentialTokenType,
  transactionId: ZHederaTransactionRegex,
});
export type TCredentialTokenMetadataMinted = z.infer<
  typeof ZCredentialTokenMetadataMinted
>;

export const ZMintPermissionTokenTopicMetadata = z.object({
  entityId: ZHederaIdRegex,
  permissionTokenId: ZHederaIdRegex,
  permissionTokenType: ZPermissionTokenType,
  serialNumber: z.number().int().positive().finite(),
  signatureTransaction: ZHederaTransactionRegex,
});
export type TMintPermissionTokenTopicMetadata = z.infer<
  typeof ZMintPermissionTokenTopicMetadata
>;

export const ZTokenLoanClosedMetadata = z.object({
  accrualDayCountDay: ZAccrualDayCount,
  accrualDayCountPeriod: ZAccrualDayCount,
  active: z.boolean(),
  adjustableRateId: ZHederaIdRegex.nullable(),
  amoritization: ZAmoritizationType,
  borrowerId: ZHederaIdRegex.nullable(),
  collateralId: ZHederaIdRegex.nullable(),
  currency: ZCurrency,
  escrowRecurring: z.number().nullable(),
  guarantorId: ZHederaIdRegex.nullable(),
  insurerId: ZHederaIdRegex.nullable(),
  interestRate: z.number().gte(0),
  investorId: ZHederaIdRegex,
  lenderId: ZHederaIdRegex,
  loanAddress: ZHederaIdRegex,
  loanNumber: z.number().gte(0),
  loanType: ZClosedLoanType,
  language: ZLanguage,
  locale: ZLocale,
  maturityDate: ZDateRegex,
  nextStatementDate: ZDateRegex.nullable(),
  nextRateDate: ZDateRegex.nullable(),
  occupancy: ZOccupancy.nullable(),
  originationDate: ZDateRegex,
  paymentRecurring: z.number().nullable(),
  paymentsPerYear: z.number().gte(0),
  precisionCurrency: z.number().gte(0),
  precisionInterest: z.number().gte(0),
  principal: z.number().gte(0),
  prevStatementDate: ZDateRegex.nullable(),
  prevRateDate: ZHederaIdRegex.nullable(),
  rateType: ZInterestRateType,
  serialNumber: z.number().gte(0),
  servicerId: ZHederaIdRegex,
  signingTransaction: ZHederaTransactionRegex,
  term: z.number().gte(0),
});
export type TTokenLoanClosedMetadata = z.infer<typeof ZTokenLoanClosedMetadata>;

export const SDGGoals: TSDGGoals = [
  {
    number: 1,
    name: "No Poverty",
    targets: [
      {
        name: "Eradicate Extreme Poverty",
        number: 1,
      },
      {
        name: "Reduce Poverty by at Least 50%",
        number: 2,
      },
      {
        name: "Implement Social Protection Systems",
        number: 3,
      },
      {
        name: "Equal Rights to Ownership, Basic Services, Technology, and Economic Resources",
        number: 4,
      },
      {
        name: "Build Resilience to Environmental, Economic, and Social Disasters",
        number: 5,
      },
      {
        name: "Mobilize Resources to Implement Policies to End Poverty",
        number: 6,
      },
      {
        name: "Create Pro-poor and Gender-sensitive Policy Frameworks",
        number: 7,
      },
    ],
  },
  {
    number: 2,
    name: "Zero Hunger",
    targets: [
      {
        name: "Universal Access to Safe and Nutritious Food",
        number: 1,
      },
      {
        name: "End All Forms of Malnutrition",
        number: 2,
      },
      {
        name: "Double the Productivity and Incomes of Small-scale Food Producers",
        number: 3,
      },
      {
        name: "Sustainable Food Production and Resilient Agricultural Practices",
        number: 4,
      },
      {
        name: "Maintain the Genetic Diversity in Food Production",
        number: 5,
      },
      {
        name: "Invest in Rural Infrastructure, Agricultural Research, Technology, and Gene Banks",
        number: 6,
      },
      {
        name: "Prevent Agricultural Trade Restrictions, Market Distortions, and Export Subsidies",
        number: 7,
      },
      {
        name: "Ensure Stable Food Commodity Markets and Timely Access to Market Information",
        number: 8,
      },
    ],
  },
  {
    name: "Good Health and Well-being",
    number: 3,
    targets: [
      {
        name: "Reduce Maternal Mortality",
        number: 1,
      },
      {
        name: "End All Preventable Deaths Under 5 Years of Age",
        number: 2,
      },
      {
        name: "Fight Communicable Diseases",
        number: 3,
      },
      {
        name: "Reduce Mortality from Non-communicable Diseases and Promote Mental Health",
        number: 4,
      },
      {
        name: "Prevent and Treat Substance Abuse",
        number: 5,
      },
      {
        name: "Reduce Road Injuries and Deaths",
        number: 6,
      },
      {
        name: "Universal Access to Sexual and Reproductive Care, Family Planning, and Education",
        number: 7,
      },
      {
        name: "Achieve Universal Health Coverage",
        number: 8,
      },
      {
        name: "Reduce Illnesses and Death from Hazardous Chemicals and Pollution",
        number: 9,
      },
      {
        name: "Implement the WHO Framework Convention on Tobacco Control",
        number: "A",
      },
      {
        name: "Support Research, Development and Universal Acccess to Affordable Vaccines and Medicines",
        number: "B",
      },
      {
        name: "Increase Health Financing and Support Health Workforce in Developing Countries",
        number: "C",
      },
      {
        name: "Improve Early Warning Systems for Global Health Risks",
        number: "D",
      },
    ],
  },
  {
    name: "Quality Education",
    number: 4,
    targets: [
      {
        name: "Free Primary and Secondary Education",
        number: 1,
      },
      {
        name: "Equal Access to Quality Pre-primary Education",
        number: 2,
      },
      {
        name: "Equal Access to Affordable Technical, Vocational and Higher Education",
        number: 3,
      },
      {
        name: "Increase the Number of People with Relevant Skills for Financial Success",
        number: 4,
      },
      {
        name: "Eliminate All Discrimination in Education",
        number: 5,
      },
      {
        name: "Universal Literacy and Numeracy",
        number: 6,
      },
      {
        name: "Education for Sustainable Development and Global Citizenship",
        number: 7,
      },
      {
        name: "Build and Upgrade Inclusive and Safe Schools",
        number: 8,
      },
      {
        name: "Expand Higher Education Scholarships for Developing Countries",
        number: 9,
      },
      {
        name: "Increase the Supply of Qualified Teachers in Developing Countries",
        number: "A",
      },
    ],
  },
  {
    name: "Gender Equality",
    number: 5,
    targets: [
      {
        name: "End Discrimination Against Women and Girls",
        number: 1,
      },
      {
        name: "End all Violence Against and Exploitation of Women and Girls",
        number: 2,
      },
      {
        name: "Eliminate Forced Marriages and Genital Mutilation",
        number: 3,
      },
      {
        name: "Value Unpaid Care and Promote Shared Domestic Responsibilities",
        number: 4,
      },
      {
        name: "Ensure Full Participation in Leadership and Decision-making",
        number: 5,
      },
      {
        name: "Universal Access to Reproductive Health and Rights",
        number: 6,
      },
      {
        name: "Equal Rights to Economic Resources, Property Ownership and Financial Services",
        number: 7,
      },
      {
        name: "Promote Empowerment of Women Thorugh Technology",
        number: 8,
      },
      {
        name: "Adopt and Strengthen Policies and Enforceable Legislation for Gender Equality",
        number: 9,
      },
    ],
  },
  {
    name: "Clean Water and Sanitation",
    number: 6,
    targets: [
      {
        name: "Safe and Affordable Drinking Water",
        number: 1,
      },
      {
        name: "End Open Defecation and Provide Access to Sanitation and Hygiene",
        number: 2,
      },
      {
        name: "Improve Water Quality, Wastewater Treatment and Safe Reuse",
        number: 3,
      },
      {
        name: "Increase Water-use Efficiency and Ensure Freshwater Supplies",
        number: 4,
      },
      {
        name: "Implement Integrated Water Resources Management",
        number: 5,
      },
      {
        name: "Protect and Restore Water-related Ecosystems",
        number: 6,
      },
      {
        name: "Expand Water and Sanitation Support to Developing Countries",
        number: 7,
      },
      {
        name: "Support Local Engagement in Water and Sanitation Management",
        number: 8,
      },
    ],
  },
  {
    name: "Affordable and Clean Energy",
    number: 7,
    targets: [
      {
        name: "Universal Access to Modern Energy",
        number: 1,
      },
      {
        name: "Increase Global Percentage of Renewable Energy",
        number: 2,
      },
      {
        name: "Double the Improvement in Energy Efficiency",
        number: 3,
      },
      {
        name: "Promote Access to Research, Technology and Investments in Clean Energy",
        number: 4,
      },
      {
        name: "Expand and Upgrade Energy Services for Developing Countries",
        number: 5,
      },
    ],
  },
  {
    name: "Decent Work and Economic Growth",
    number: 8,
    targets: [
      {
        name: "Sustainable Economic Growth",
        number: 1,
      },
      {
        name: "Diversify, Innovate and Upgrade for Economic Productivity",
        number: 2,
      },
      {
        name: "Promote Policies to Support Job Creation and Growing Enterprises",
        number: 3,
      },
      {
        name: "Improve Resource Efficiency in Consumption and Production",
        number: 4,
      },
      {
        name: "Full Employment and Decent Work with Equal Pay",
        number: 5,
      },
      {
        name: "Promote Youth Employment, Education and Training",
        number: 6,
      },
      {
        name: "End Modern Slavery, Trafficking and Child Labour",
        number: 7,
      },
      {
        name: "Protect Labour Rights and Promote Safe Working Environments",
        number: 8,
      },
      {
        name: "Promote Beneficial and Sustainable Tourism",
        number: 9,
      },
      {
        name: "Universal Access to Banking, Insurance and Financial Services",
        number: "A",
      },
      {
        name: "Increase Aid for Trade Support",
        number: "B",
      },
      {
        name: "Develop a Global Youth Employment Strategy",
        number: "C",
      },
    ],
  },
  {
    name: "Industry, Innovation and Infrastructure",
    number: 9,
    targets: [
      {
        name: "Develop Sustainable, Resilient and Inclusive Infrastructure",
        number: 1,
      },
      {
        name: "Promote Inclusive and Sustainable Industrialization",
        number: 2,
      },
      {
        name: "Increase Access to Financial Services and Markets",
        number: 3,
      },
      {
        name: "Upgrade all Industries and Infrastructures for Sustainability",
        number: 4,
      },
      {
        name: "Enhance Research and Upgrade Industrial Technologies",
        number: 5,
      },
      {
        name: "Facilitate Sustainable Infrastructure Development for Developing Countries",
        number: 6,
      },
      {
        name: "Support Domestic Technology Development and Industrial Diversification",
        number: 7,
      },
      {
        name: "Universal Access to Information and Communications Technology",
        number: 8,
      },
    ],
  },
  {
    name: "Reduced Inequalities",
    number: 10,
    targets: [
      {
        name: "Reduce Income Inequalities",
        number: 1,
      },
      {
        name: "Promote Universal Social, Economic and Political Inclusion",
        number: 2,
      },
      {
        name: "Ensure Equal Opportunities and End Discrimination",
        number: 3,
      },
      {
        name: "Adopt Fiscal and Social Policies that Promote Equality",
        number: 4,
      },
      {
        name: "Improved Regulation of Global Financial Markets and Institutions",
        number: 5,
      },
      {
        name: "Enhanced Representation for Developing Countries in Financial Institutions",
        number: 6,
      },
      {
        name: "Responsible and Well-managed Migration Policies",
        number: 7,
      },
      {
        name: "Special and Differential Treatment for Developing Countries",
        number: 8,
      },
      {
        name: "Encourage Development Assistance and Investment in Least Developed Countries",
        number: 9,
      },
      {
        name: "Reduce Transaction Costs for Migrant Remittances",
        number: "A",
      },
    ],
  },
  {
    name: "Sustainable Cities and Communities",
    number: 11,
    targets: [
      { name: "Safe and Affordable Housing", number: 1 },
      { name: "Affordable and Sustainable Transport Systems", number: 2 },
      { name: "Inclusive and Sustainable Urbanization", number: 3 },
      { name: "Protect the World’s Cultural and Natural Heritage", number: 4 },
      { name: "Reduce the Adverse Effects of Natural Disasters", number: 5 },
      { name: "Reduce the Environmental Impact of Cities", number: 6 },
      {
        name: "Provide Access to Safe and Inclusive Green and Public Spaces",
        number: 7,
      },
      { name: "Strong National and Regional Development Planning", number: 8 },
      {
        name: "Implement Policies for Inclusion, Resource Efficiency and Distater Risk Reduction",
        number: 9,
      },
      {
        name: "Support Least Developed Countries in Sustainable and Resilient Building",
        number: "A",
      },
    ],
  },
  {
    name: "Responsible Consumption and Production",
    number: 12,
    targets: [
      {
        name: "Implement the 10-year Sustainable Consumption and Production Framework",
        number: 1,
      },
      {
        name: "Sustainable Management and Efficient Use of Natural Resources",
        number: 2,
      },
      {
        name: "Halve Global per Capita Food Waste",
        number: 3,
      },
      {
        name: "Responsible Management of Chemicals and Waste",
        number: 4,
      },
      {
        name: "Substantially Reduce Waste Generation",
        number: 5,
      },
      {
        name: "Encourage Companies to Adopt Sustainable Practices and Sustainability Reporting",
        number: 6,
      },
      {
        name: "Promote Sustainable Public Procurement Practices",
        number: 7,
      },
      {
        name: "Promote Universal Understanding of Sustainable Lifestyles",
        number: 8,
      },
      {
        name: "Support Developing Countries' Scientific and Technological Capacity for Sustainable Consumption and Production",
        number: 9,
      },
      {
        name: "Develop and Implement Tools to Monitor Sustainable Tourism",
        number: "A",
      },
    ],
  },
  {
    name: "Climate Action",
    number: 13,
    targets: [
      {
        name: "Strengthen Resilience and Adaptive Capacity to Climate Related Disasters",
        number: 1,
      },
      {
        name: "Integrate Climate Change Measures into Policies and Planning",
        number: 2,
      },
      {
        name: "Build Knowledge and Capacity to Meet Climate Change",
        number: 3,
      },
      {
        name: "Implement the UN Framework Convention on Climate Change",
        number: 4,
      },
      {
        name: "Promote Mechanisms to Raise Capacity for Planning and Management",
        number: 5,
      },
    ],
  },
  {
    name: "Life below Water",
    number: 14,
    targets: [
      {
        name: "Reduce Marine Pollution",
        number: 1,
      },
      {
        name: "Protect and Restore Ecosystems",
        number: 2,
      },
      {
        name: "Reduce Ocean Acidification",
        number: 3,
      },
      {
        name: "Sustainable Fishing",
        number: 4,
      },
      {
        name: "Convserve Coastal and Marine Areas",
        number: 5,
      },
      {
        name: "End Subsidies Contributing to Overfishing",
        number: 6,
      },
      {
        name: "Increase the Economic Benefits from Sustainable Use of Marine Resources",
        number: 7,
      },
      {
        name: "Increase Scientific Knowledge, Research and Technology for Ocean Health",
        number: 8,
      },
      {
        name: "Support Small Scale Fishers",
        number: 9,
      },
      {
        name: "Implement and Enforce International Sea Law",
        number: "A",
      },
    ],
  },
  {
    name: "Life on Land",
    number: 15,
    targets: [
      {
        name: "Conserve and Restore Terrestrial and Freshwater Ecosystems",
        number: 1,
      },
      {
        name: "End Deforestation and Restore Degraded Forests",
        number: 2,
      },
      {
        name: "End Desertification and Restore Degraded Land",
        number: 3,
      },
      {
        name: "Ensure Conservation of Mountain Ecosystems",
        number: 4,
      },
      {
        name: "Protect Biodiversity and Natural Habitats",
        number: 5,
      },
      {
        name: "Promote Access to Genetic Resources and Fair Sharing of the Benefits",
        number: 6,
      },
      {
        name: "Eliminate Poaching and Trafficking of Protected Species",
        number: 7,
      },
      {
        name: "Prevent Invasive Alien Species on Land and in Water Ecosystems",
        number: 8,
      },
      {
        name: "Integrate Ecosystem and Biodiversity in Government Planning",
        number: 9,
      },
      {
        name: "Increase Financial Resources to Conserve and Sustainably Use Ecosystems and Biodiversity",
        number: "A",
      },
      {
        name: "Finance and Incentivize Sustainable Forest Management",
        number: "B",
      },
      {
        name: "Combat Global Poaching and Trafficking",
        number: "C",
      },
    ],
  },
  {
    name: "Peace, Justice and Strong Institutions",
    number: 16,
    targets: [
      {
        name: "Signficantly Reduce All Forms of Violence and Related Death Rates Everywhere",
        number: 1,
      },
      {
        name: "End Abuse, Exploitation, Trafficking and All Forms of Violence Against and Torture of Children",
        number: 2,
      },
      {
        name: "Promote the Rule of Law at the National and International Levels and Ensure Equal Access to Justice for All",
        number: 3,
      },
      {
        name: "By 2030, Significantly Reduce Illicit Financial and Arms Flows, Strengthen Recovery and Return of Stolen Assets, and Combat All Forms of Organized Crime",
        number: 4,
      },
      {
        name: "Substantially Reduce Corruption and Bribery in All Forms",
        number: 5,
      },
      {
        name: "Develop Effective, Accountable and Transparent Institutions at All Levels",
        number: 6,
      },
      {
        name: "Ensure Responsive, Inclusive, Participatory and Representative Decision-making at All Levels",
        number: 7,
      },
      {
        name: "Broaden and Strengthen the Participation of Developing Countries in the Institutions of Global Governance",
        number: 8,
      },
      {
        name: "By 2030, provide legal identity for all, including birth registration",
        number: 9,
      },
      {
        name: "Ensure public access to information and protect fundamental freedoms, in accordance with national legislation and international agreements",
        number: 10,
      },
      {
        name: "Strengthen relevant national institutions, including through international cooperation, for building capacity at all leves, in particular in developing countries, tok prevent violence and combat terrorism and crime",
        number: "A",
      },
      {
        name: "Promote and enforce non-discriminatory laws and policies for sustainable development",
        number: "B",
      },
    ],
  },
  {
    name: "Strengthen the Means of Implementation and Revitalize the Global Partnership for Sustainable Development",
    number: 17,
    targets: [
      {
        name: "Strengthen domestic resource mobilization, including through international support to developing countries, to improve domestic capacity for tax and other revenue collection",
        number: 1,
      },
      {
        name: "Developed countries to implement fully their official development assistance commitments, including the commitment by many developed countries to achieve the target of 0.7 per cent of ODA/GNI to developing countries and 0.15 to 0.20 per cent of ODA/GNI to least developed countries; ODA providers are encouraged to consider setting a target to provide at least 0.20 per cent of ODA/GNI to least developed countries",
        number: 2,
      },
      {
        name: "Mobilize additional financial resources for developing countries from multiple sources",
        number: 3,
      },
      {
        name: "Assist developing countries in attaining long-term debt sustainability through coordinated policies aimed at fostering debt financing, debt relief and debt restructuring, as appropriate, and address the external debt of highly indebted poor countries to reduce debt distress",
        number: 4,
      },
      {
        name: "Adopt and implement investment promotion regimes for least developed countries",
        number: 5,
      },
      {
        name: "Enhance North-South, South-South and triangular regional and international cooperation on and access to science, technology and innovation and enhance knowledge sharing on mutually agreed terms, including through improved coordination among existing mechanisms, in particular at the United Nations level, and through a global technology facilitation mechanism",
        number: 6,
      },
      {
        name: "Promote the development, transfer, dissemination and diffusion of environmentally sound technologies to developing countries on favourable terms, including on concessional and preferential terms, as mutually agreed",
        number: 7,
      },
      {
        name: "Fully operationalize the technology bank and science, technology and innovation capacity-building mechanism for least developed countries by 2017 and enhance the use of enabling technology, in particular information and communications technology",
        number: 8,
      },
      {
        name: "Enhance international support for implementing effective and targeted capacity-building in developing countries to support national plans to implement all the Sustainable Development Goals, including through North-South, South-South and triangular cooperation",
        number: 9,
      },
      {
        name: "Promote a universal, rules-based, open, non-discriminatory and equitable multilateral trading system under the World Trade Organization, including through the conclusion of negotiations under its Doha Development Agenda",
        number: 10,
      },
      {
        name: "Significantly increase the exports of developing countries, in particular with a view to doubling the least developed countries’ share of global exports by 2020",
        number: 11,
      },
      {
        name: "Realize timely implementation of duty-free and quota-free market access on a lasting basis for all least developed countries, consistent with World Trade Organization decisions, including by ensuring that preferential rules of origin applicable to imports from least developed countries are transparent and simple, and contribute to facilitating market access",
        number: 12,
      },
      {
        name: "Enhance global macroeconomic stability, including through policy coordination and policy coherence",
        number: 13,
      },
      {
        name: "Enhance policy coherence for sustainable development",
        number: 14,
      },
      {
        name: "Respect each country’s policy space and leadership to establish and implement policies for poverty eradication and sustainable development",
        number: 15,
      },
      {
        name: "Enhance the Global Partnership for Sustainable Development, complemented by multi-stakeholder partnerships that mobilize and share knowledge, expertise, technology and financial resources, to support the achievement of the Sustainable Development Goals in all countries, in particular developing countries",
        number: 16,
      },
      {
        name: "Encourage and promote effective public, public-private and civil society partnerships, building on the experience and resourcing strategies of partnerships",
        number: 17,
      },
      {
        name: "By 2020, enhance capacity-building support to developing countries, including for least developed countries and small island developing States, to increase significantly the availability of high-quality, timely and reliable data disaggregated by income, gender, age, race, ethnicity, migratory status, disability, geographic location and other characteristics relevant in national contexts",
        number: 18,
      },
      {
        name: "By 2030, build on existing initiatives to develop measurements of progress on sustainable development that complement gross domestic product, and support statistical capacity-building in developing countries",
        number: 19,
      },
    ],
  },
];