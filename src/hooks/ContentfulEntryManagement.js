import { useEffect, useState } from "react";
import { createClient } from "contentful-management";

const useContentfulEntryManagement = (
  engEntry,
  croEntry = null,
  imageFile = null
) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (!isUpdating) return;

    const spaceId = process.env.REACT_APP_SPACE;
    const accessToken = process.env.REACT_APP_ACCESS_TOKEN;
    const environment = process.env.REACT_APP_ENVIRONMENT;

    const client = createClient({ accessToken });

    client
      .getSpace(spaceId)
      .then((space) => space.getEnvironment(environment))
      .then((environment) => {
        const entryId = engEntry.entryId || createUniqueId();
        let entry;

        if (engEntry.entryId) {
          return environment.getEntry(entryId);
        } else {
          entry = environment.createEntry("contents");
          return entry;
        }
      })
      .then((entry) => {
        entry.fields.title = {
          "en-US": engEntry.title,
        };

        entry.fields.subTitle = {
          "en-US": engEntry.subTitle,
        };
        entry.fields.dateOfCreation = {
          "en-US": engEntry.dateOfCreation,
        };
        entry.fields.author = {
          "en-US": engEntry.author,
        };
        entry.fields.authorEmail = {
          "en-US": engEntry.authorEmail,
        };
        entry.fields.category = {
          "en-US": engEntry.category,
        };
        entry.fields.content = {
          "en-US": engEntry.content,
        };

        if (imageFile) {
          return createAssetAndLink(environment, imageFile).then((asset) => {
            entry.fields.image = {
              "en-US": {
                sys: {
                  type: "Link",
                  linkType: "Asset",
                  id: asset.sys.id,
                },
              },
            };
            return entry;
          });
        }

        return entry;
      })
      .then((entry) => {
        if (croEntry !== null) {
          entry.fields.title["hr-HR"] = croEntry.title;
          entry.fields.subTitle["hr-HR"] = croEntry.subTitle;
          entry.fields.dateOfCreation["hr-HR"] = croEntry.dateOfCreation;
          entry.fields.author["hr-HR"] = croEntry.author;
          entry.fields.authorEmail["hr-HR"] = croEntry.authorEmail;
          entry.fields.category["hr-HR"] = croEntry.category;
          entry.fields.content["hr-HR"] = croEntry.content;

          if (imageFile) {
            return createAssetAndLink(environment, imageFile).then((asset) => {
              entry.fields.image["hr-HR"] = {
                sys: {
                  type: "Link",
                  linkType: "Asset",
                  id: asset.sys.id,
                },
              };
              return entry;
            });
          }
        }

        if (engEntry.entryId) {
          return entry.update();
        } else {
          return environment.createEntry(entry);
        }
      })
      .then(() => {
        setSuccess(true);
        setError(null);
      })
      .catch((err) => {
        setError(err);
        setSuccess(false);
      })
      .finally(() => {
        setIsUpdating(false);
      });
  }, [isUpdating]);

  const updateEntry = () => {
    setIsUpdating(true);
  };

  const createUniqueId = () => {
    return (
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15)
    );
  };

  const createAssetAndLink = (environment, file) => {
    return environment
      .createAssetFromFiles({
        fields: {
          title: {
            "en-US": file.name,
          },
          file: {
            "en-US": {
              contentType: file.type,
              fileName: file.name,
              file: file,
            },
          },
        },
      })
      .then((asset) => asset.processForAllLocales())
      .then((asset) => asset.publish());
  };

  return {
    updateEntry,
    isUpdating,
    success,
    error,
  };
};

export default useContentfulEntryManagement;
