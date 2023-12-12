enum ChannelsEnum {
  general = "123456789012345678",
  activities = "123456789012345678",
  bizDevStandup = "123456789012345678",
  contractualStandup = "123456789012345678",
  bizDevReporting = "123456789012345678",
  productDevStandup = "123456789012345678",
  productDevReporting = "123456789012345678",
  pmStandup = "123456789012345678",
  pmReporting = "123456789012345678",
  productSolutionStandup = "123456789012345678",
  productSolutionReporting = "123456789012345678",
  serverNotification="22"
}

const standUpChannels = [
  {
    name: "bizDevStandup",
    id: "123456789012345678",
  },
  {
    name: "productDevStandup",
    id: "123456789012345678",
  },
  {
    name: "pmStandup",
    id: "123456789012345678",
  },
  {
    name: "productSolutionStandup",
    id: "123456789012345678",
  },
  {
    name: "productSolutionStandup",
    id: "123456789012345678",
  },
];

const reportingChannels = [
  {
    name: "bizDevReporting",
    id: "123456789012345678",
  },
  {
    name: "productDevReporting",
    id: "123456789012345678",
  },
  {
    name: "pmReporting",
    id: "123456789012345678",
  },
  {
    name: "productSolutionReporting",
    id: "123456789012345678",
  },
];

export { ChannelsEnum, standUpChannels, reportingChannels };
