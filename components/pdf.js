import React from "react";
import {
  Font,
  Image,
  Page,
  Text,
  View,
  Document,
  StyleSheet,
} from "@react-pdf/renderer";
import { i18n } from "@lingui/core";
import { I18nProvider } from "@lingui/react";
import { Trans } from "@lingui/macro";

import formatCurrency from "utils/currency";

Font.register({
  family: "General",
  fonts: [
    { src: "/fonts/general/GeneralSans-Medium.ttf" },
    {
      src: "/fonts/general/GeneralSans-Bold.ttf",
      fontWeight: "bold",
    },
  ],
});

// Create styles
const styles = StyleSheet.create({
  page: {
    paddingTop: 35,
    paddingBottom: 35,
    paddingHorizontal: 35,
  },
  row: {
    flexDirection: "row",
  },
  section: {
    flexGrow: 1,
    width: "100%",
  },
  title: {
    fontSize: 18,
    fontFamily: "General",
    marginBottom: 24,
    borderBottom: "1px dashed #181A33",
  },
  borderTop: {
    marginTop: 24,
    paddingTop: 4,
    borderTop: "1px dashed #181A33",
  },
  text: {
    fontSize: 12,
    fontFamily: "General",
    textAlign: "left",
    marginBottom: 6,
  },
  strong: {
    fontWeight: "bold",
  },
  medium: {
    fontSize: 11,
  },
  small: {
    fontSize: 10,
  },
  right: {
    textAlign: "right",
  },
  padded4: {
    paddingLeft: 4,
  },
  padded8: {
    paddingLeft: 8,
  },
  space: {
    marginTop: 12,
  },
  qr: {
    position: "absolute",
    bottom: 35,
    right: 35,
    width: 60,
    height: 60,
  },
});

// Create Document Component
const PayslipPDF = ({
  title,
  periodStart,
  periodEnd,
  employer,
  employee,
  personalCode,
  notes,
  grossSalary,
  netSalary,
  salaryFund,
  fundedPension,
  socialTax,
  incomeTax,
  employeeUnemploymentInsuranceTax,
  employerUnemploymentInsuranceTax,
}) => (
  <I18nProvider i18n={i18n}>
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.row}>
          {/* Additional info */}
          <View style={styles.section}>
            <View style={styles.row}>
              <View style={[styles.section, { width: 100 }]}>
                <Text style={styles.text}>
                  <Trans>Periood</Trans>
                </Text>
              </View>
              <View style={styles.section}>
                <Text style={styles.text}>
                  {periodStart} - {periodEnd}
                </Text>
              </View>
            </View>
            {employer ? (
              <View style={styles.row}>
                <View style={[styles.section, { width: 100 }]}>
                  <Text style={styles.text}>
                    <Trans>Tööandja</Trans>
                  </Text>
                </View>
                <View style={styles.section}>
                  <Text style={styles.text}>{employer}</Text>
                </View>
              </View>
            ) : null}
            {employee ? (
              <View style={styles.row}>
                <View style={[styles.section, { width: 100 }]}>
                  <Text style={styles.text}>
                    <Trans>Töötaja</Trans>
                  </Text>
                </View>
                <View style={styles.section}>
                  <Text style={styles.text}>{employee}</Text>
                </View>
              </View>
            ) : null}
            {personalCode ? (
              <View style={styles.row}>
                <View style={[styles.section, { width: 100 }]}>
                  <Text style={styles.text}>
                    <Trans>Isikukood</Trans>
                  </Text>
                </View>
                <View style={styles.section}>
                  <Text style={styles.text}>{personalCode}</Text>
                </View>
              </View>
            ) : null}
            {notes ? (
              <View style={styles.row}>
                <View style={[styles.section, { width: 100 }]}>
                  <Text style={styles.text}>
                    <Trans>Märkus</Trans>
                  </Text>
                </View>
                <View style={styles.section}>
                  <Text style={styles.text}>{notes}</Text>
                </View>
              </View>
            ) : null}
          </View>

          {/* Salary */}
          <View style={styles.section}>
            <View style={styles.row}>
              <View style={styles.section}>
                <Text style={[styles.text, styles.strong]}>
                  <Trans>Brutotöötasu</Trans>
                </Text>
              </View>
              <View style={styles.section}>
                <Text style={[styles.text, styles.strong, styles.right]}>
                  {formatCurrency(grossSalary, "€")}
                </Text>
              </View>
            </View>
            <View style={styles.row}>
              <View style={styles.section}>
                <Text style={[styles.text, styles.padded4, styles.medium]}>
                  <Trans>Kinnipidamised</Trans>
                </Text>
              </View>
              <View style={styles.section}>
                <Text style={[styles.text, styles.right]}>
                  {formatCurrency(
                    fundedPension +
                      employeeUnemploymentInsuranceTax +
                      incomeTax,
                    "€"
                  )}
                </Text>
              </View>
            </View>
            <View style={styles.row}>
              <View style={styles.section}>
                <Text style={[styles.text, styles.small, styles.padded8]}>
                  <Trans>Kogumispension</Trans>
                </Text>
              </View>
              <View style={styles.section}>
                <Text style={[styles.text, styles.small, styles.right]}>
                  {formatCurrency(fundedPension, "€")}
                </Text>
              </View>
            </View>
            <View style={styles.row}>
              <View style={styles.section}>
                <Text style={[styles.text, styles.small, styles.padded8]}>
                  <Trans>Töötaja töötuskindlustusmakse</Trans>
                </Text>
              </View>
              <View style={styles.section}>
                <Text style={[styles.text, styles.small, styles.right]}>
                  {formatCurrency(employeeUnemploymentInsuranceTax, "€")}
                </Text>
              </View>
            </View>
            <View style={styles.row}>
              <View style={styles.section}>
                <Text style={[styles.text, styles.small, styles.padded8]}>
                  <Trans>Tulumaks</Trans>
                </Text>
              </View>
              <View style={styles.section}>
                <Text style={[styles.text, styles.small, styles.right]}>
                  {formatCurrency(incomeTax, "€")}
                </Text>
              </View>
            </View>

            {/* Net salary */}
            <View style={[styles.row, styles.space]}>
              <View style={styles.section}>
                <Text style={styles.text}>
                  <Trans>Neto töötasu</Trans>
                </Text>
              </View>
              <View style={styles.section}>
                <Text style={[styles.text, styles.right]}>
                  {formatCurrency(netSalary, "€")}
                </Text>
              </View>
            </View>
            <View style={styles.row}>
              <View style={styles.section}>
                <Text style={[styles.text, styles.medium, styles.padded4]}>
                  <Trans>Tööandja maksud</Trans>
                </Text>
              </View>
              <View style={styles.section}>
                <Text style={[styles.text, styles.medium, styles.right]}>
                  {formatCurrency(
                    socialTax + employerUnemploymentInsuranceTax,
                    "€"
                  )}
                </Text>
              </View>
            </View>
            <View style={styles.row}>
              <View style={styles.section}>
                <Text style={[styles.text, styles.small, styles.padded8]}>
                  <Trans>Sotsiaalmaks</Trans>
                </Text>
              </View>
              <View style={styles.section}>
                <Text style={[styles.text, styles.small, styles.right]}>
                  {formatCurrency(socialTax, "€")}
                </Text>
              </View>
            </View>
            <View style={styles.row}>
              <View style={styles.section}>
                <Text style={[styles.text, styles.small, styles.padded8]}>
                  <Trans>Tööandja töötuskindlustusmakse</Trans>
                </Text>
              </View>
              <View style={styles.section}>
                <Text style={[styles.text, styles.small, styles.right]}>
                  {formatCurrency(employerUnemploymentInsuranceTax, "€")}
                </Text>
              </View>
            </View>

            <View style={[styles.row, styles.space]}>
              <View style={styles.section}>
                <Text style={styles.text}>
                  <Trans>Tööandja kulu</Trans>
                </Text>
              </View>
              <View style={styles.section}>
                <Text style={[styles.text, styles.right]}>
                  {formatCurrency(salaryFund, "€")}
                </Text>
              </View>
            </View>
          </View>
        </View>
        {/* Total */}
        <View style={[styles.borderTop]}>
          <Text style={[styles.text, styles.medium, styles.right]}>
            <Trans>Tasumisele kuuluv neto töötasu</Trans>
          </Text>
          <Text style={[styles.text, styles.strong, styles.right]}>
            {formatCurrency(netSalary, "€")}
          </Text>
        </View>
        <Image style={styles.qr} src="/qr.png" />
      </Page>
    </Document>
  </I18nProvider>
);

export default PayslipPDF;
