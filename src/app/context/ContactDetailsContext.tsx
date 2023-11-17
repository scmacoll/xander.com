import React, { createContext, useState, useContext } from 'react';

// Define the shape of the context data
interface ContactDetails {
  shippingDetails: {
    country: string;
    firstName: string;
    lastName: string;
    companyName: string;
    addressLineOne: string;
    addressLineTwo: string;
    city: string;
    state: string;
    zipcode: string;
  };
  billingDetails: {
    country: string;
    firstName: string;
    lastName: string;
    companyName: string;
    addressLineOne: string;
    addressLineTwo: string;
    city: string;
    state: string;
    zipcode: string;
  };
}

// Create the context with a default value
const ContactDetailsContext = createContext<{
  contactDetails: ContactDetails;
  setContactDetails: React.Dispatch<React.SetStateAction<ContactDetails>>;
}>({
  contactDetails: {
    shippingDetails: {
      country: '',
      firstName: '',
      lastName: '',
      companyName: '',
      addressLineOne: '',
      addressLineTwo: '',
      city: '',
      state: '',
      zipcode: '',
    },
    billingDetails: {
      country: '',
      firstName: '',
      lastName: '',
      companyName: '',
      addressLineOne: '',
      addressLineTwo: '',
      city: '',
      state: '',
      zipcode: '',
    },
  },
  setContactDetails: () => {},
});

export const ContactDetailsProvider: React.FC<ContactDetailsProviderProps> = ({ children }) => {
  const [contactDetails, setContactDetails] = useState<ContactDetails>({
    shippingDetails: {
      country: '',
      firstName: '',
      lastName: '',
      companyName: '',
      addressLineOne: '',
      addressLineTwo: '',
      city: '',
      state: '',
      zipcode: '',
    },
    billingDetails: {
      country: '',
      firstName: '',
      lastName: '',
      companyName: '',
      addressLineOne: '',
      addressLineTwo: '',
      city: '',
      state: '',
      zipcode: '',
    },
  });

  return (
    <ContactDetailsContext.Provider value={{ contactDetails, setContactDetails }}>
      {children}
    </ContactDetailsContext.Provider>
  );
};

// Custom hook for easy consumption of the context
export const useContactDetails = () => useContext(ContactDetailsContext);

export default ContactDetailsContext;
