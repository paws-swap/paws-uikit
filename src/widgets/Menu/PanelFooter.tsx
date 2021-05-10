import React from "react";
import styled from "styled-components";
import { CogIcon, SvgProps } from "../../components/Svg";
import Text from "../../components/Text/Text";
import Flex from "../../components/Flex/Flex";
import Dropdown from "../../components/Dropdown/Dropdown";
import Link from "../../components/Link/Link";
import Button from "../../components/Button/Button";
import IconButton from "../../components/Button/IconButton";
import MenuButton from "./MenuButton";
import * as IconModule from "./icons";
import { socials, MENU_ENTRY_HEIGHT } from "./config";
import { PanelProps, PushedProps } from "./types";

interface Props extends PanelProps, PushedProps { }

const Icons = (IconModule as unknown) as { [key: string]: React.FC<SvgProps> };
const { LanguageIcon } = Icons;

const Container = styled.div`
  flex: none;
  padding: 8px 4px;
  background-color: ${({ theme }) => theme.nav.background};
  border-top: solid 2px rgba(133, 133, 133, 0.1);
`;

const PriceLink = styled.a`
  display: flex;
  align-items: center;
  svg {
    transition: transform 0.3s;
  }
  :hover {
    svg {
      transform: scale(1.2);
    }
  }
`;

const SettingsEntry = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: ${MENU_ENTRY_HEIGHT}px;
  padding: 0 8px;
`;

const SocialEntry = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: ${MENU_ENTRY_HEIGHT}px;
  padding: 0 16px;
`;

const PanelFooter: React.FC<Props> = ({
  isPushed,
  pushNav,
  toggleTheme,
  isDark,
  currentLang,
  langs,
  setLang,
}) => {
  if (!isPushed) {
    return (
      <Container>
        <IconButton variant="text" onClick={() => pushNav(true)}>
          <CogIcon />
        </IconButton>
      </Container>
    );
  }

  return (
    <Container>
      <SocialEntry>
        <Flex flex="1" justifyContent="space-evenly">
          {socials.map((social, index) => {
            const Icon = Icons[social.icon];
            const iconProps = { width: "24px", height: social.icon === 'InstagramIcon' || social.icon === 'DiscordIcon' ? "21px" : "24px", color: "textSubtle", style: { cursor: "pointer" } };
            const mr = index < socials.length - 1 ? "8px" : 0;
            return (
              <Link external key={social.label} href={social.href} aria-label={social.label} mr={mr}>
                <Icon {...iconProps} />
              </Link>
            );
          })}

          <Dropdown
            position="top-right"
            target={
              <Button variant="text" startIcon={<LanguageIcon color="textSubtle" width="24px" />}>
                <Text color="textSubtle">{currentLang?.toUpperCase()}</Text>
              </Button>
            }
          >
            {langs.map((lang) => (
              <MenuButton
                key={lang.code}
                fullWidth
                onClick={() => setLang(lang)}
                // Safari fix
                style={{ minHeight: "32px", height: "auto" }}
              >
                {lang.language}
              </MenuButton>
            ))}
          </Dropdown>
        </Flex>
      </SocialEntry>
    </Container>
  );
};

export default PanelFooter;
