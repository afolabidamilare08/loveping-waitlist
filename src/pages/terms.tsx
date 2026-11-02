import { LegalDoc } from "../site/LegalDoc";
import { SITE } from "../site/config";
import { termsHighlights, termsSections } from "../site/content/terms";
import { Mark, PageHero } from "../site/ui";
import { mount } from "./mount";

mount(
  <>
    <PageHero
      eyebrow="Terms & conditions"
      title={
        <>
          The <Mark>ground rules</Mark> for showing love.
        </>
      }
      lead="The agreement between you and Loveping when you use our app and website. Short, fair and written to be read."
      meta={<>Last updated {SITE.policiesUpdated}</>}
    />
    <LegalDoc highlights={termsHighlights} sections={termsSections} />
  </>,
);
