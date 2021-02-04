import React, { useEffect } from 'react';
import classes from './PrivacyPolicy.module.css';
import Card from '../../UI/Card/Card';
import Button from '../../UI/Button/Button';
import scrollToTop from '../../../utils/scrollToTop';
import pathnames from '../../../assets/data/pathnames';
import { Link } from 'react-router-dom';

const PrivacyPolicy = ({ history }) => {
  useEffect(() => {
    scrollToTop();
  });
  return (
    <Card style={{ marginTop: '65px' }}>
      <Button onClick={() => history.goBack()}>
        Takaisin edelliselle sivulle
      </Button>
      <div className={classes.PrivacyPolicy}>
        <h1>Tietosuojaseloste</h1>
        <p>
          <i> Laadittu 3.2.2021</i>
        </p>
        <p>
          Nettikamu ("me", "sivusto") on sitoutunut suojaamaan henkilötietojasi
          ja oikeuttasi yksityisyyden suojaan. Jos sinulla herää kysyttävää
          tästä tietosuojaselosteesta tai tavasta, jolla käsitellä
          henkilötietojasi, ota meihin yhteyttä sähköpostitse info@nettikamu.fi.
        </p>
        <p>
          Kun vierailet www.nettikamu.fi sivustolla, otamme yksityisyytesi
          erittäin vakavasti. Tässä tietosuojaselosteessa kerromme mitä tietoja
          keräämme, miten niitä käytämme ja mitä oikeuksia sinulla on niihin
          liittyen. Toivomme, että luet selosteen huolella, koska se sisältää
          tärkeää tietoa yksityisyydestäsi. Jos seloste sisältää jotain
          sellaista, mitä et hyväksy, pyydämme sinua lopettamaan sivustomme
          käytön välittömästi. Tämä tietosuojaseloste pätee kaikkeen tietoon,
          joka sivustomme kautta kerätään.
        </p>
        <h2>SISÄLLYSLUETTELO</h2>
        <ul>
          <li>1. Mitä tietoja keräämme?</li>
          <li>2. Kuinka käytämme keräämiämme tietoja?</li>
          <li>3. Jaetaanko tietojasi sivuston ulkopuolelle?</li>
          <li>4. Mihin tietojasi jaetaan?</li>
          <li>
            5. Käytetäänkö sivustolla evästeitä tai muita seurantateknologioita?
          </li>
          <li>6. Mikä on kantamme kolmansien osapuolien sivustoihin?</li>
          <li>7. Kuinka pitkään säilytämme tietojasi?</li>
          <li>8. Miten pidämme tietosi turvassa?</li>
          <li>9. Mitä oikeuksia sinulla on tietosuojaasi liittyen?</li>
          <li>10. Teemmekö muutoksia tähän tietosuojaselosteeseen?</li>
          <li>11. Miten voit ottaa yhteyttä meihin tietosuojaasi liittyen?</li>
          <li>
            12. Miten voit tarkistaa, korjata tai poistaa tietoja, joita
            keräämme?
          </li>
        </ul>
        <h2>1. Mitä tietoja keräämme?</h2>
        <p>
          <strong>Lyhyesti: Keräämme tietoja, jotka luovutat meille</strong>
        </p>
        <p>
          Keräämme tietoja, jotka vapaaehtoisesti luovutat meille
          rekisteröityessäsi, täydentäessäsi käyttäjäprofiiliasi, jakaessasi
          ilmoituksia tai lähettäessäsi viestin löytämästäsi virheestä
          sivustolla.
        </p>
        <p>
          Keräämiemme tietojen sisältö riippuu siitä, mitä tietoja päätät jakaa
          sivustolla. Rekisteröityessäsi palveluun keräämme sinulta
          käyttäjätunnuksen, salasanan, syntymäajan, sukupuolen, puhelinnumeron
          sekä rekisteröitymisesi ajankohdan. Keräämme myös käyttäjätunnuksesi
          viestintäsovelluksiin ja asuinpaikkasi, jos päätät lisätä ne
          käyttäjäprofiiliisi. Jos jaat ystävänhakuilmoituksia tai lähetät
          virheilmoituksia, keräämme myös niiden tekstisisällön. Kaiken
          sivustollemme jakamasi tiedon on oltava oikeita tietojasi ja sinun on
          ilmoitettava meille, jos kyseisiin tietoihin tulee muutoksia.
        </p>
        <p>
          Käytämme sivustollamme Googlen AdSense palvelua, joka saattaa kerätä
          tietojasi oman tietosuojakäytäntönsä mukaisesti.{' '}
          <a
            href="https://policies.google.com/technologies/partner-sites"
            target="_blank"
            rel="noreferrer"
          >
            Lisätietoja tiedoista, joita Google saattaa kerätä
          </a>
        </p>
        <h2>2. Kuinka käytämme keräämiämme tietoja?</h2>
        <p>
          <strong>
            Lyhyesti: Käytämme tietoja mahdollistaaksemme palvelun käytön.
          </strong>
        </p>
        <p>
          Käytämme käyttäjätunnustasi ja salasanaasi mahdollistaaksemme sinun
          pääsyn käyttäjäprofiiliisi sisältämiin tietoihin ja voidaksemme estää
          sen muilta henkilöiltä.
        </p>
        <p>
          Käytämme puhelinnumeroasi voidaksemme estää sinulta sivustomme käytön,
          jos toimit käyttöehtojemme vastaisesti.
        </p>
        <p>
          Käytämme syntymäaikasi perusteella laskettua ikääsi, sukupuoltasi,
          asuinpaikkaasi sekä käyttäjätunnuksiasi viestintäsovelluksiin
          voidaksemme tarjota käyttäjillemme hakutoiminnon, jonka avulla he
          voivat etsiä ilmoituksia tiettyjen hakukriteerien perusteella.
        </p>
        <p>
          Käytämme jakamiesi ystävänhakuilmoitusten tekstiä, jotta voimme
          tarjota sinulle mahdollisuuden esitellä itsesi ja kertoa minkälaisia
          ystäviä sivustoltamme etsit.
        </p>
        <p>
          Käytämme virheilmoitusten tekstiä nopeuttaaksemme sivustoltamme
          löytyvien virheiden löytämistä ja korjaamista
        </p>
        <h2>3. Jaetaanko tietojasi sivuston ulkopuolelle?</h2>
        <p>Tietoja ei normaalitilanteessa luovuteta sivuston ulkopuolelle.</p>
        <p>
          Tietoja luovutetaan niitä pyytävälle taholle vain, jos se oon Suomen
          lainsäädännön perusteella velvollisuutemme. Mitään tietoja ei
          luovuteta kaupallisiin tarkoituksiin.
        </p>
        <p>
          Käytämme sivustollamme Googlen AdSense palvelua, joka saattaa käyttää
          tietojasi oman tietosuojakäytäntönsä mukaisesti.{' '}
          <a
            href="https://policies.google.com/technologies/partner-sites"
            target="_blank"
            rel="noreferrer"
          >
            Lisätietoja tavoista, joilla Google saattaa käyttää tietojasi
          </a>
        </p>
        <h2>4. Mihin tietojasi jaetaan?</h2>
        <p>
          Käyttäjätunnustasi ja salasanaasi ei jaeta kellekään. Jos päätät jakaa
          ystävänhakuilmoituksia, ikäsi, sukupuolesi, asuinpaikkasi ja
          ilmoitukseen lisäämäsi teksti jaetaan sivstollamme kaikkien nähtäville
          ja viestintäsovelluksien käyttäjätunnuksesi jaetaan muille sivuston
          käyttäjille.
        </p>
        Jos olemme käsitelleet tietoja luvallasi ja haluat peruuttaa antamasi
        luvan, ota meihin yhteyttä alla kohdassa 13 mainitulla tavalla.
        <h2>
          5. Käytetäänkö sivustolla evästeitä tai muita seurantateknologioita?
        </h2>
        <p>
          Käytämme sivustolla evästeitä{' '}
          <Link to={pathnames.COOKIE_POLICY}>evästekäytäntömme</Link>{' '}
          mukaisesti. Emme käytä muita seurantateknologioita.
        </p>
        <h2>6. Mikä on kantamme kolmansien osapuolien sivustoihin?</h2>
        <p>
          Sivustollamme saattaa olla mainoksia, jotka sisältävät linkkejä
          kolmansien osapuolien sivustoille tai palveluihin. Emme voi valvoa
          mitä tietoja kolmansien osapuolien sivustot keräävät tai tai mitä he
          kyseisillä tiedoilla tekevät. Emme vastaa tiedoista, joita
          sivustollemme linkatut kolmannen osapuolen sivustot keräävät. Perehdy
          huolella kyseisten sivustojen omiin tietosuojaselosteisiin ja olla
          siihen liittyen yhteydessä suoraan heihin.
        </p>
        <h2>7. Kuinka pitkään säilytämme tietojasi?</h2>
        <p>
          Säilytämme tietojasi niin kauan kun olet sivustomme käyttäjä ellei
          laki velvoita meitä poistamaan tietoja. Voit poistaa
          käyttäjätunnuksesi profiilissasi, jolloin tiedot sinusta poistetaan.
        </p>
        <h2>8. Miten pidämme tietosi turvassa?</h2>
        <p>
          Tietosi pidetään turvassa salasanasuojatussa tietokannassa erinäisillä
          teknisillä turvatoimilla. Toimistamme huolimatta sähköiset
          tietojärjestelmät eivät koskaan ole täydellisen turvallisia. Emme voi
          luvata, ettei hakkerit, rikolliset tai muut pahantahtoiset tahot pääse
          käsiksi tietoihisi. Vaikka teemme parhaamme pitääksemme tietosi
          turvassa, jaat tietojasi omalla vastuullasi.
        </p>
        <h2>9. Mitä oikeuksia sinulla on tietosuojaasi liittyen?</h2>
        <p>
          Sinulla on oikeus tarkistaa, korjata tai poistaa käyttäjätunnuksesi
          kirjautumalla sivustolle.
        </p>
        <p>Sinulla on oikeus:</p>
        <ul>
          <li>- Saada kopio sinusta kerätyistä tiedoista</li>
          <li>- Pyytää tietojesi korjausta tai poistoa</li>
          <li>- Rajoittaa tietojesi käsittelyä</li>
        </ul>
        <p>
          Voit muuttaa tai poistaa tietojasi kirjautumalla sisään sivustollemme
          tai ottamalle meihin yhteyttä alla olevilla yhteystiedoilla.
        </p>
        <p>tietosuoja@nettikamu.fi</p>
        <h2>10. Teemmekö muutoksia tähän tietosuojaselosteeseen?</h2>
        <p>
          Saatamme tehdä muutoksia tähän tietosuojaselosteeseen pitääksemme sen
          ajantasalla lainsäädännön ja sivustomme toimintoihin nähden.
          Viimeisimmät muutokset korostetaan erilaisella pohjavärillä ja
          muutosten voimaantulon päivämäärä merkataan tietosuojaselosteen
          otsikon alle. Pyrimme mahdollisuuksien mukaan ilmoittamaan
          merkittävistä muutoksista, mutta rohkaisemme sinua aika-ajoin
          silmäilemään tietosuojaselosteen läpi mahdollisten muutosten varalta.
        </p>
        <h2>11. Miten voit ottaa yhteyttä meihin tietosuojaasi liittyen?</h2>
        <p>
          Jos sinulla herää kysyttävää tai huomioita tähän selosteeseen
          liittyen, voit olla meihin yhteydessä sähköpostitse osoitteeseen
          tietosuoja@nettikamu.fi.
        </p>
        <h2>
          12. Miten voit tarkistaa, korjata tai poistaa tietoja, joita keräämme?
        </h2>
        <p>
          Voit tarkistaa, korjata tai poistaa tietojasi kirjautumalla
          käyttäjäprofiiliisi ja muokkaamalla tietojasi tai lähettämällä
          sähköpostia osoitteeseen tietosuoja@nettikamu.fi. Vastaamme pyyntöihin
          kuukauden sisällä.
        </p>
      </div>
      <Button onClick={() => history.goBack()}>
        Takaisin edelliselle sivulle
      </Button>
    </Card>
  );
};

export default PrivacyPolicy;
