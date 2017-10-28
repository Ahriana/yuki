const { helpCreator } = require('../../utils');
const { TagOperation, TagParameter } = require('./enums');

class InvalidTagManagementPermissionError extends Error {
  /**
   * @param {Chisarok} chisarok
   */
  toString(chisarok) {
    return chisarok._('c.tag.all.error.management_permission');
  }
}

class TagAlreadyExistsError extends Error {
  constructor(name) {
    super();

    /**
     * @type {string}
     */
    this.name = name;
  }

  /**
   * @param {Chisarok} chisarok
   * @returns {string}
   */
  toString(chisarok) {
    return chisarok._('c.tag.create.error.exists', {
      name: this.name,
    });
  }
}

/**
 * @prop {TagOperation} tagOperation
 * @prop {TagParameter} tagParameter
 */
class TagParameterNotGivenError extends Error {
  /**
   * @param {number} tagParameter
   * @param {number} tagOperation
   */
  constructor(tagParameter, tagOperation) {
    super();

    this.tagOperation = tagOperation;
    this.tagParameter = tagParameter;
  }

  /**
   * @param {Chisarok} chisarok
   * @returns {string}
   */
  toString(chisarok) {
    let content;

    switch (this.tagParameter) {
      case TagParameter.NAME:
        content = chisarok._('c.tag.all.error.no_param.name');

        break;
      case TagParameter.VALUE:
        content = chisarok._('c.tag.all.error.no_param.value');
    }

    content += '\n\n';

    let command;
    let description;
    let examples;
    let usage;

    switch (this.tagOperation) {
      case TagOperation.CREATE:
        command = 'create';

        [description, examples, usage] = chisarok._m(
          'help.tag.create.description',
          'help.tag.create.examples',
          'help.tag.create.usage',
        );

        break;
      case TagOperation.DELETE:
        command = 'delete';

        [description, examples, usage] = chisarok._m(
          'help.tag.delete.description',
          'help.tag.delete.examples',
          'help.tag.delete.usage',
        );

        break;
      case TagOperation.EDIT:
        command = 'edit';

        [description, examples, usage] = chisarok._m(
          'help.tag.edit.description',
          'help.tag.edit.examples',
          'help.tag.edit.usage',
        );
    }

    content += helpCreator(command, description, usage, examples);

    return content;
  }
}

class UnknownTagError extends Error {
  constructor(name) {
    super();

    /**
     * @type {string}
     */
    this.name = name;
  }

  /**
   * @param {Chisarok} chisarok
   * @returns {string}
   */
  toString(chisarok) {
    return chisarok._('c.tag.all.error.nonexistent', {
      name: this.name,
    });
  }
}

module.exports = {
  InvalidTagManagementPermissionError,
  TagAlreadyExistsError,
  TagParameterNotGivenError,
  UnknownTagError,
};
