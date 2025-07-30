const messages = {
  navigation: {
    dashboard: 'Dashboard',
    events: 'Events',
    orders: 'Orders',
    finance: 'Finance',
    settings: 'Settings',
    selectOrganization: 'Select Organization',
    signIn: 'Sign In',
    signUp: 'Sign Up',
    byde: 'byde',
    filter: 'Filter',
    cancel: 'Cancel',
    confirm: 'Confirm',
    viewEvents: 'View Events',
    viewFinance: 'View Finance',
    withdraw: 'Withdraw',
    createEvent: 'Create an event',
    back: 'Back'
  },
  dashboard: {
    welcomeBack: 'Welcome back {name}',
    quickActions: 'Quick Actions',
    salesOverview: 'Sales Overview',
    upcomingEvents: 'Upcoming Events',
    ticketSales: 'Ticket Sales',
    wallet: 'Wallet'
  },
  events: {
    name: 'Name',
    date: 'Date',
    ticketsSold: 'Tickets Sold',
    revenue: 'Revenue',
    status: 'Status'
  },
  orders: {
    orderId: 'Order ID',
    event: 'Event',
    buyer: 'Buyer',
    date: 'Date',
    total: 'Total',
    status: 'Status',
    refundMethod: 'Refund Method',
    orderNotFound: 'Order not found'
  },
  finance: {
    payouts: 'Payouts',
    bankAccounts: 'Bank Accounts',
    amount: 'Amount',
    date: 'Date',
    name: 'Name',
    bank: 'Bank',
    dateAdded: 'Date Added',
    accountNumber: 'Account Number',
    accountType: 'Account Type',
    country: 'Country',
    currency: 'Currency',
    status: 'Status'
  },
  status: {
    live: 'Live',
    draft: 'Draft',
    pending: 'Pending',
    ended: 'Ended',
    paid: 'Paid',
    cancelled: 'Cancelled',
    refunded: 'Refunded',
    underReview: 'Under Review',
    rejected: 'Rejected',
    verified: 'Verified',
    unverified: 'Unverified'
  },
  modals: {
    createEvent: {
      stepOne: {
        title: 'Create an event',
        description: 'Create an event to sell tickets to your audience.',

        fields: {
          title: {
            title: 'Title',
            placeholder: 'The name of you event'
          },
          description: {
            title: 'Description',
            placeholder: 'Describe your event'
          },
          location: {
            title: 'Location',
            placeholder: 'Where is it happening'
          },
          online: {
            title: 'Is it happening online?'
          },
          link: {
            title: 'Link',
            placeholder: 'Conference link'
          },
          startDate: {
            title: 'Start Date'
          },
          includeDuration: {
            title: 'Add end time'
          },
          endDate: {
            title: 'End time'
          },
          timezoneUTCOffset: {
            title: 'Timezone',
            placeholder: 'Select a timezone'
          }
        }
      },
      stepTwo: {
        title: 'Pricing',
        description: 'Set the price of your event',

        pricing: {
          free: {
            title: 'Free',
            subtitle: 'Attendees can register for free'
          },
          paid: {
            title: 'Paid',
            subtitle: 'Attendees pay to register'
          }
        },

        fields: {
          price: {
            title: 'Price',
            placeholder: '0.00'
          },
          absorbFees: {
            title: 'Absorb fees',
            subtitle:
              'You cover the service fees, so customers pay exactly the ticket price'
          },
          currency: {
            title: 'Currency',
            placeholder: 'Select a currency'
          }
        },
        priceBreakdown: {
          ticketPrice: 'Ticket price',
          serviceFee: 'Service fee',
          serviceFeePerTicket: '{price} per ticket',
          processingFee: 'Processing fee',
          processingFeePerTicket: '{price} per ticket',
          costToBuyer: 'Cost to buyer',
          yourPayout: 'Your payout'
        }
      },
      stepThree: {
        title: 'Create an event',
        description: 'Sales',

        fields: {
          salesStart: {
            title: 'Sales start'
          },
          salesEnd: {
            title: 'Sales end'
          },
          quantity: {
            title: 'Quantity',
            placeholder: 'How many tickets are available?'
          },
          unlimited: {
            title: 'Unlimited'
          }
        }
      },
      stepFour: {
        title: 'Go Live',
        description: 'When you want to publish your event',

        now: {
          title: 'Now',
          subtitle: 'Publish your event immediately'
        },
        schedule: {
          title: 'Schedule',
          subtitle: 'Schedule when your event will go live'
        },
        fields: {
          timezone: {
            title: 'Timezone',
            placeholder: 'Select a timezone'
          },
          goLiveDate: {
            title: 'Go live date',
            placeholder: 'Select a date'
          },
          goLiveTime: {
            title: 'Go live time'
          }
        },
        publish: 'Publish'
      }
    }
  },
  settings: {
    title: 'Settings',
    description: 'Manage your account settings and preferences.',
    account: 'Account'
  },
  common: {
    name: 'Name',
    date: 'Date',
    status: 'Status',
    amount: 'Amount',
    total: 'Total',
    filter: 'Filter',
    cancel: 'Cancel',
    confirm: 'Confirm',
    back: 'Back',
    orderNotFound: 'Order not found',
    currency: {
      GBP: '£',
      USD: '$',
      EUR: '€',
      CAD: 'CA$',
      AUD: 'A$',
      NZD: 'NZ$',
      CHF: 'CHF',
      JPY: '¥'
    }
  },
  metadata: {
    title: 'Create Next App',
    description: 'Generated by create next app'
  },
  pagination: {
    previous: 'Previous',
    next: 'Next'
  },
  actions: {
    view: 'View',
    edit: 'Edit',
    delete: 'Delete',
    create: 'Create',
    save: 'Save',
    update: 'Update'
  }
}

export default messages
