/** Home page copy. Final wording from the brief unless flagged. */

export const hero = {
  chip: "Mobile app launching soon! We're putting some finishing touches.",
  // Emphasised words flagged with em.
  headline: [
    { t: "Experience Seamless Finance with " },
    { t: "100% Digital Convenience", em: true },
  ],
  // [TO CONFIRM] Compliance to confirm this interest claim before launch.
  sub: "Earn interest on your savings and investments with Zekured.",
};

export const goal = {
  eyebrow: "OUR GOAL IS SIMPLE",
  heading: [{ t: "Your go to app for " }, { t: "every need", em: true }],
  sub: "Make smarter money moves. Empower your finances.",
  // icon keys map to components/ui/Icons.tsx
  features: [
    {
      icon: "phone",
      title: "100% Online Sign up",
      text: "Sign up and open an account with us in minutes from your phone.",
    },
    {
      icon: "chat",
      title: "Customer Support",
      text: "You can chat with us on the app, slide into our DMs, or send an email.",
    },
    {
      icon: "shield",
      title: "End-to-end security",
      text: "Get peace of mind with our strong security systems and trusted partners.",
    },
    {
      icon: "bolt",
      title: "Quick Redemption",
      text: "Redeeming money should never take more than a few taps.",
    },
    // Replaces a live-site line about cards that did not match the title (team to approve).
    {
      icon: "chart",
      title: "Invest Securely",
      text: "Put your money to work through a licensed partner, with the risks and fees explained up front.",
    },
    {
      icon: "bell",
      title: "Instant Notifications",
      text: "Feel confident your payment is successful with instant notifications.",
    },
  ],
};

export const simplify = {
  heading: [{ t: "Simplifying all things " }, { t: "money", em: true }],
  sub: "Make smarter money moves. Empower your finances.",
  rows: [
    {
      product: "investments" as const,
      title: "Quick and Easy portfolio Investments",
      text: "Invest spare change, invest while you bank, and build a portfolio over time. Returns are not guaranteed.",
      image: "young Nigerian man reviewing his portfolio on a phone",
      card: { title: "My Portfolio", action: "Invest Now" },
      risk: true,
    },
    {
      product: "savings" as const,
      title: "Save your money, wherever, whenever!",
      text: "Whether you're saving for school, a dream vacation, a new car, our variety of savings plans cater to your unique goals.",
      image: "young Nigerian woman smiling, holding a phone, blue top",
      card: { title: "Education Savings", action: "Save Now" },
      risk: false,
    },
    {
      product: "insurance" as const,
      title: "Seamlessly protect your future",
      text: "Our tailored insurance options allow you to choose coverage that aligns with your circumstances and priorities.",
      image: "Nigerian small-business owner in her shop using a phone",
      card: {
        title: "General accident",
        body: "₦100,000",
        action: "Save Now",
        pill: "Get Insured",
      },
      risk: false,
    },
  ],
};

export const building = {
  heading: [{ t: "Building your financial future " }, { t: "for you", em: true }],
  // [TO CONFIRM] Compliance to confirm "comprehensive", "expert guidance" and "attractive interest rates".
  sub: "Secure the bag, get insured, invest in your wealth! We're here to help you grow your wealth and keep your finance game strong.",
  cards: [
    {
      product: "insurance" as const,
      title: "Insurance at your fingertips",
      text: "Safeguard your future and protect what matters most with comprehensive insurance coverage.",
    },
    {
      product: "investments" as const,
      title: "Invest for the future on your terms",
      text: "Explore a world of investment opportunities with expert guidance, empowering you to grow your wealth strategically.",
      risk: true,
    },
    {
      product: "savings" as const,
      title: "Create multiple saving plans to make your life goals happen!",
      text: "Start saving for your dreams with our competitive savings accounts that offer attractive interest rates.",
    },
  ],
};
