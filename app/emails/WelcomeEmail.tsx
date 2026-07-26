import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";

interface WelcomeEmailProps {
  userFirstName?: string;
}

export const WelcomeEmail = ({
  userFirstName = "Developer",
}: WelcomeEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>
        Welcome to Obsidian Base! Your SaaS is ready to take off.🚀
      </Preview>
      <Body style={main}>
        <Container style={container}>
          {/* Logo simulada ou texto */}
          <Section style={header}>
            <Text style={logoText}>Obsidian Base</Text>
          </Section>

          <Heading style={h1}>Welcome board, {userFirstName}! 🚀</Heading>

          <Text style={text}>
            We’re really happy to have you with us. You’ve just taken the first
            step in saving dozens of hours on building your next big project.
          </Text>

          <Text style={text}>
            Your account is already active and set up. To access your control
            panel and start creating content, click the button below:
          </Text>

          <Section style={buttonContainer}>
            <Button style={button} href="https://yoursite.com/dashboard">
             Access Dashboard
            </Button>
          </Section>

          <Text style={text}>
          If you need any help, just get in touch!
          </Text>

          <Hr style={hr} />

          <Text style={footer}>
            © {new Date().getFullYear()} Obsidian Base. All rights reserved.
          </Text>
        </Container>
      </Body>
    </Html>
  );
};

export default WelcomeEmail;

const main = {
  backgroundColor: "#050505",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: "#171717", 
  margin: "40px auto",
  padding: "20px 40px",
  borderRadius: "12px",
  border: "1px solid #262626", 
  maxWidth: "600px",
};

const header = {
  paddingBottom: "20px",
  borderBottom: "1px solid #262626",
};

const logoText = {
  color: "#3b82f6", // accent-blue
  fontSize: "20px",
  fontWeight: "bold",
  margin: "0",
};

const h1 = {
  color: "#ffffff",
  fontSize: "24px",
  fontWeight: "bold",
  margin: "30px 0 15px",
  padding: "0",
};

const text = {
  color: "#a3a3a3", // text-secondary
  fontSize: "16px",
  lineHeight: "24px",
  margin: "0 0 20px",
};

const buttonContainer = {
  textAlign: "center" as const,
  margin: "32px 0",
};

const button = {
  backgroundColor: "#3b82f6", // accent-blue
  borderRadius: "8px",
  color: "#ffffff",
  fontSize: "16px",
  fontWeight: "bold",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "inline-block",
  padding: "14px 28px",
};

const hr = {
  borderColor: "#262626",
  margin: "30px 0",
};

const footer = {
  color: "#525252",
  fontSize: "14px",
  textAlign: "center" as const,
};
