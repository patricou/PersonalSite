	CREATE  TABLE URL_LINKS(
    ID BIGINT identity primary key ,
    LINK_DESCRIPTION VARCHAR(255),
    LINK_NAME VARCHAR(255),
    URL VARCHAR(255),
    CATEGORY_LINK_ID BIGINT
);
	CREATE  TABLE CATEGORY_LINK(
    ID BIGINT  identity primary key,
    CATEGORY_DESCRIPTION VARCHAR(255),
    CATEGORY_NAME VARCHAR(255)
);
	CREATE  TABLE LOGGING(
    ID BIGINT  identity primary key,
    LOGGING_DESCRIPTION VARCHAR(255),
    LOGGING_NAME VARCHAR(255)
);