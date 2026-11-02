import { LegalDoc } from "../site/LegalDoc";
import { SITE } from "../site/config";
import { privacyHighlights, privacySections } from "../site/content/privacy";
import { Mark, PageHero } from "../site/ui";
import { mount } from "./mount";

mount(
  <>
    <PageHero
      eyebrow="Privacy policy"
      title={
        <>
          Your love life is <Mark>private</Mark>. We keep it that way.
        </>
      }
      lead="What Loveping collects, why we need it, who helps us run the app, and the choices you have — in plain words."
      meta={<>Last updated {SITE.policiesUpdated}</>}
    />
    <LegalDoc highlights={privacyHighlights} sections={privacySections} />
  </>,
);
