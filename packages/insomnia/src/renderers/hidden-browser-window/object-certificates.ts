import { Property } from './object-base';
import { UrlMatchPattern, UrlMatchPatternList } from './object-urls';

export interface RawCertificateOptions {
    name?: string;
    matches?: string[];
    key?: object;
    cert?: object;
    passphrase?: string;
    pfx?: object; // PFX or PKCS12 Certificate
}

export class Certificate extends Property {
    name?: string;
    matches?: UrlMatchPatternList<UrlMatchPattern>;
    key?: object;
    cert?: object;
    passphrase?: string;
    pfx?: object; // PFX or PKCS12 Certificate

    constructor(options: RawCertificateOptions) {
        super();
        this.kind = 'Certificate';
        this.name = options.name;
        this.matches = new UrlMatchPatternList(
            undefined,
            options.matches ?
                options.matches.map(matchStr => new UrlMatchPattern(matchStr)) :
                [],
        );
        this.key = options.key;
        this.cert = options.cert;
        this.passphrase = options.passphrase;
        this.pfx = options.pfx;
    }

    static isCertificate(obj: object) {
        return 'kind' in obj && obj.kind === 'Certificate';
    }

    canApplyTo(url: string) {
        return this.matches ? this.matches.test(url) : false;
    }

    update(options: RawCertificateOptions) {
        this.name = options.name;
        this.matches = new UrlMatchPatternList(
            undefined,
            options.matches ?
                options.matches.map(matchStr => new UrlMatchPattern(matchStr)) :
                [],
        );
        this.key = options.key;
        this.cert = options.cert;
        this.passphrase = options.passphrase;
        this.pfx = options.pfx;
    }
}