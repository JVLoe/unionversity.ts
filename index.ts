import courses from "./courses";
import studyGroups from "./studyGroups";

type Course = {
    id: number;
    studyGroupId: number;
    title: string;
    keywords: string[];
    eventType: string;
};

type StudyGroup = {
    id: number;
    courseId: number;
    title: string;
    keywords: string[];
    eventType: string;
};

type SearchEventOptions = {
    query: number | string;
    eventType: "courses" | "groups";
};

const searchEvents = (options: SearchEventOptions) => {
    const events: (Course | StudyGroup)[] =
        options.eventType === "courses" ? courses : studyGroups;

    return events.filter((event: Course | StudyGroup) => {
        if (typeof options.query === "number") {
            return event.id === options.query;
        }

        if (typeof options.query === "string") {
            return event.keywords.includes(options.query);
        }
        return event;
    });
};

let enrolledEvents: (Course | StudyGroup)[] = [];

const enrol = (event: Course | StudyGroup) => {
    enrolledEvents = [...enrolledEvents, event];
}

const searchResults = searchEvents({query: 'art', eventType: 'courses'});

enrol(searchResults[0]);

console.log(enrolledEvents);