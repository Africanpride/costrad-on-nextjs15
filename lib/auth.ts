import { betterAuth } from "better-auth";
import Database from "better-sqlite3";
import {
  bearer,
  admin,
  multiSession,
  organization,
  twoFactor,
  oneTap,
  oAuthProxy,
  openAPI,
  oidcProvider,
  emailOTP,
} from "better-auth/plugins";
import { reactInvitationEmail } from "./email/invitation";
import { LibsqlDialect } from "@libsql/kysely-libsql";
import { reactResetPasswordEmail } from "./email/rest-password";
import { resend } from "./email/resend";
import { MysqlDialect } from "kysely";
import { createPool } from "mysql2/promise";
import { nextCookies } from "better-auth/next-js";
import { passkey } from "better-auth/plugins/passkey";

const from = process.env.BETTER_AUTH_EMAIL || "delivered@resend.dev";
const to = process.env.TEST_EMAIL || "";

const libsql = new LibsqlDialect({
  url: process.env.TURSO_DATABASE_URL || "",
  authToken: process.env.TURSO_AUTH_TOKEN || "",
});

const mysql = process.env.USE_MYSQL
  ? new MysqlDialect(createPool(process.env.MYSQL_DATABASE_URL || ""))
  : null;

const dialect = process.env.USE_MYSQL ? mysql : libsql;

if (!dialect) {
  throw new Error("No dialect found");
}

export const auth = betterAuth({
  appName: "College of Sustainable Transformation and Development",

  database: new Database("./sqlite.db"),

  emailVerification: {
    autoSignInAfterVerification: true,
    sendOnSignUp: true,
    async sendVerificationEmail({ user, url }) {
      const res = await resend.emails.send({
        from,
        to: to || user.email,
        subject: "Verify your email address",
        html: `<a href="${url}">Verify your email address</a>`,
      });
    },
  },

  account: {
    accountLinking: {
      trustedProviders: ["google", "facebook", "microsoft", "linkedin"],
    },
  },
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
    minPasswordLength: 8,
    async sendResetPassword({ user, url }) {
      await resend.emails.send({
        from: "no-reply@costrad.org",
        to: user.email,
        subject: "Reset your COSTrAD password",
        react: reactResetPasswordEmail({
          username: user.email,
          resetLink: url,
        }),
      });
    },
  },
  socialProviders: {
    facebook: {
      clientId: process.env.FACEBOOK_CLIENT_ID || "",
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET || "",
    },
    google: {
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    },
    microsoft: {
      clientId: process.env.MICROSOFT_CLIENT_ID || "",
      clientSecret: process.env.MICROSOFT_CLIENT_SECRET || "",
    },
  },
  plugins: [
    emailOTP({
      async sendVerificationOTP({ email, otp, type = "sign-in" }) {
        await resend.emails.send({
          from,
          to: email,
          subject: "Your Login OTP",
          html: `<p>Hello,</p>
                 <p>Your One-Time Password (OTP) is: <strong>${otp}</strong></p>
                 <p>This OTP is valid for 10 minutes.</p>
                 <p>If you did not request this, please ignore this email.</p>`,
        });
      },
    }),

    organization({
      async sendInvitationEmail(data) {
        await resend.emails.send({
          from,
          to: data.email,
          subject: "You've been invited to join an organization",
          react: reactInvitationEmail({
            username: data.email,
            invitedByUsername: data.inviter.user.name,
            invitedByEmail: data.inviter.user.email,
            teamName: data.organization.name,
            inviteLink:
              process.env.NODE_ENV === "development"
                ? `http://localhost:3000/accept-invitation/${data.id}`
                : `$${
                    process.env.BETTER_AUTH_URL
                  }/accept-invitation/${data.id}`,
          }),
        });
      },
    }),
    twoFactor({
      otpOptions: {
        async sendOTP({ user, otp }) {
          await resend.emails.send({
            from,
            to: user.email,
            subject: "Your OTP",
            html: `Your OTP is ${otp}`,
          });
        },
      },
    }),
    openAPI(),
    passkey(),
    oneTap(),
    openAPI(),
    bearer(),
    admin(),
    multiSession(),
    oneTap(),
    oAuthProxy(),
    nextCookies(),
    oidcProvider({
      loginPage: "/auth/sign-in",
    }),
  ],
});
