import { Window } from 'happy-dom';

import {
    convertTitleToSlug,
    processPeopleHRDescription,
    createJobPostFromJSON,
    removeAllElementsNotInAllowlist,
    removeUnnecessaryElementAttributes,
} from './peopleHR';

import {
    juniorDeveloperDescription,
    juniorDeveloperFormattedDescription,
    illegalScriptDescription,
    illegalScriptFormattedDescription,
    jobPostingJSON,
    jobPostingObject,
    illegalElementDescription,
    illegalElementFormattedDescription,
} from './peopleHRTestData';

test('converts job title to URL slug', () => {
    expect(convertTitleToSlug('Senior Python Developer')).toBe(
        'senior-python-developer',
    );
    expect(convertTitleToSlug('Chief  Wagtail   Architect')).toBe(
        'chief-wagtail-architect',
    );
    expect(convertTitleToSlug('ux-designer')).toBe('ux-designer');
});

test('removes excess data from description HTML', () => {
    expect(processPeopleHRDescription(illegalScriptDescription)).toBe(
        illegalScriptFormattedDescription,
    );
    expect(processPeopleHRDescription(juniorDeveloperDescription)).toBe(
        juniorDeveloperFormattedDescription,
    );
    expect(processPeopleHRDescription(jobPostingJSON.description[0])).toBe(
        jobPostingObject.description,
    );
});

test('converts job JSON into a JobPost object', () => {
    expect(createJobPostFromJSON(jobPostingJSON)).toEqual(jobPostingObject);
});

test('removes all elements not in the allowlist', () => {
    const window = new Window();
    const document = window.document;

    document.body.innerHTML = illegalScriptDescription;

    expect(
        removeAllElementsNotInAllowlist(
            document,
            document.body as unknown as Element,
        ).innerHTML,
    ).toBe(illegalScriptFormattedDescription);

    document.body.innerHTML = illegalElementDescription;

    expect(
        removeAllElementsNotInAllowlist(
            document,
            document.body as unknown as Element,
        ).innerHTML,
    ).toBe(illegalElementFormattedDescription);
});

test('removes all unnecessary element attributes', () => {
    const window = new Window();
    const document = window.document;

    const testLinkElement = document.createElement('A');
    testLinkElement.setAttribute('href', 'https://torchbox.com');
    testLinkElement.setAttribute('style', 'font-weight: bold;');
    testLinkElement.setAttribute('rel', 'nofollow');

    const expectedLinkElement = document.createElement('A');
    expectedLinkElement.setAttribute('href', 'https://torchbox.com');
    expectedLinkElement.setAttribute('rel', 'noreferrer noopener');
    expectedLinkElement.setAttribute('target', '_blank');

    const testFontElement = document.createElement('FONT');
    testFontElement.setAttribute('style', 'font-weight: bold;');
    testFontElement.setAttribute('x-data', 'content-type: true;');

    const expectedFontElement = document.createElement('FONT');

    expect(
        removeUnnecessaryElementAttributes(
            testLinkElement as unknown as Element,
        ),
    ).toEqual(expectedLinkElement);

    expect(
        removeUnnecessaryElementAttributes(
            testFontElement as unknown as Element,
        ),
    ).toEqual(expectedFontElement);
});
