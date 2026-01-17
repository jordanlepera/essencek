import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from '@react-email/components';
import { Tailwind } from '@react-email/tailwind';

type ContactEmailProps = {
  email: string;
  phone: string;
  message: string;
};

export default function ContactEmail({ email, phone, message }: ContactEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Nouveau message de contact - L'Essence K</Preview>
      <Tailwind>
        <Body className="bg-white my-auto mx-auto font-sans">
          <Container className="border border-solid border-[#eaeaea] rounded my-[40px] mx-auto p-[20px] max-w-[465px]">
            <Heading className="text-black text-[24px] font-normal text-center p-0 my-[30px] mx-0">
              Nouveau message reçu
            </Heading>
            <Text className="text-black text-[14px] leading-[24px]">
              Vous avez reçu une nouvelle demande de contact via le site web.
            </Text>
            <Hr className="border border-solid border-[#eaeaea] my-[26px] mx-0 w-full" />
            <Section>
              <Text className="text-black text-[14px] leading-[24px]">
                <strong>Email :</strong>
                {' '}
                {email}
              </Text>
              <Text className="text-black text-[14px] leading-[24px]">
                <strong>Téléphone :</strong>
                {' '}
                {phone}
              </Text>
              <Hr className="border border-solid border-[#eaeaea] my-[26px] mx-0 w-full" />
              <Text className="text-black text-[14px] leading-[24px]">
                <strong>Message :</strong>
                <br />
                {message}
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
