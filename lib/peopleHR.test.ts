import {
    convertTitleToSlug,
    processPeopleHRDescription,
    createJobPostFromJSON,
} from './peopleHR';

import {
    juniorDeveloperDescription,
    juniorDeveloperFormattedDescription,
    illegalScriptDescription,
    illegalScriptFormattedDescription,
    jobPostingJSON,
    jobPostingObject,
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
