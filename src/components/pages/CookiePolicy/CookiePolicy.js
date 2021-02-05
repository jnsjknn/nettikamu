import React from 'react';
import Document from '../../UI/Document/Document';

const CookiePolicy = ({ history }) => {
  return (
    <Document history={history}>
      <h1>Evästekäytäntö</h1>
      <p>
        <i>Laadittu 1.2.2021</i>
      </p>

      <h2>Evästeet tällä sivustolla</h2>
      <p>
        Eväste on pieni tekstitiedosto, joka tallennetaan käyttäjän
        tietokoneelle, kun hän vierailee sivustossa. Evästeet ovat turvallisia:
        ne eivät sisällä henkilötietoja eikä niiden avulla voida suorittaa
        ohjelmia tai tallentaa viruksia käyttäjän tietokoneelle.
      </p>
      <p>
        Käytämme evästeitä tässä sivustossa kirjautumistoiminnon
        mahdollistamiseen, käyttäjän valitseman sivuston ulkoasu-asetuksen
        tallentamiseen sekä mainonnan kohdentamiseen.
      </p>

      <h3>Kirjautumistoiminto</h3>
      <p>
        Kirjautuessasi sisään tälle sivustolle, sivusto lähettää käyttäjänimesi
        ja salasanasi palvelimelle. Palvelin varmistaa, että kirjautumistiedot
        ovat oikeat ja lähettää vastauksena pitkän numeroita ja kirjaimia
        sisältämän kirjautumispoletin (token). Poletti tallennetaan
        tietokoneellesi evästeenä ja lähetetään jatkossa takaisin palvelimelle
        aina, kun yrität selata sisältöä, joka vaatii sivustolle kirjautumista.
        Palvelin tarkistaa, että poletti on pätevä ja lähettää tietokoneellesi
        sisällön, jota yritit selata. Poletin avulla voidaan välttää jatkuva
        käyttäjätunnuksen ja salasanan pyytäminen.
      </p>
      <h3>Ulkoasuasetuksen tallentaminen</h3>
      <p>
        Sivuston ulkoasuun on saatavilla vaalea ja tumma teema.
        Teemamieltymyksesi tallennetaan tietokoneellesi evästeenä, jolloin
        sivuston ulkoasu voidaan jatkossa automaattisesti muuttaa sellaiseksi
        kuin itse haluat, eikä asetusta tarvitse muuttaa jokaisen kirjautumisen
        yhteydessä
      </p>
      <h3>Mainosten kohdentaminen</h3>
      <p>
        Nettisivun ylläpito vaatii paljon aikaa ja osa sen toiminnallisuuksista
        kuten nettikamu.fi -verkkotunnuksen hallinta, sivuston isännöinti
        palvelimella sekä turvallisen HTTPS-yhteyden mahdollistaminen ovat
        maksullisia. Tästä syystä sivustolle on asetettu pieni määrä
        mainospaikkoja, joiden avulla sivusto voi tuottaa rahaa.
      </p>
      <p>
        Mainosten toimittamiseen käytetään Googlen AdSense palvelua, joka
        käyttää evästeitä mainosten kohdentamiseen oman{' '}
        <a
          href="https://support.google.com/adsense/answer/7549925?hl=fi"
          target="_blank"
          rel="noreferrer"
        >
          evästekäytäntönsä
        </a>{' '}
        mukaisesti.
      </p>

      <h2>Evästeiden käytön estäminen</h2>
      <p>
        Jos haluat estää evästeet, muuta selaimesi evästeasetuksia. Lisätietoja
        evästeiden hallinnasta selaimessasi on osoitteessa{' '}
        <a href="https://aboutcookies.org" target="_blank" rel="noreferrer">
          https://aboutcookies.org
        </a>
      </p>
      <p>
        Jos estät evästeiden käytön selaimessasi, laitettasi ei seurata, kun
        vierailet sivustossa. Evästeiden käytön estäminen estää nettikamuun
        kirjautumisen.
      </p>
    </Document>
  );
};

export default CookiePolicy;
