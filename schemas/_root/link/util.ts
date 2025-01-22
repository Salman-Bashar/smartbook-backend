import { ISanityLink, ISanityLinkType } from "./interface";
import { Reference } from "sanity";

/**
 * This function runs validation checks on the fields of link object.
 * `parent` is marked as undefined because of how sanity works. This function
 * is meant to be used to validation for link fields which depend on other link fields.
 * @param isOptional boolean
 * @param currentValue string | boolean | Reference
 * @param parent ISanityLink
 * @param type ISanityLinkType
 * @returns "Required" | true
 */
export function isValidLink(
  isOptional: boolean,
  currentValue?: string | boolean | Reference,
  parent?: ISanityLink,
  type?: ISanityLinkType
): boolean {
  /**
   * First we have to check if parent is defined. On initial page in
   * sanity load the parent is undefined.
   *
   * Then we check if we are the link field is optional vs required
   * as these have different validation rules.
   *
   * Then we check if the `type` value is provided, as this also adds additional
   * logic to the validation.
   */
  if (parent !== undefined) {
    // Optional Link
    if (isOptional) {
      if (type) {
        if (
          parent.addLink == true &&
          parent.type == type &&
          currentValue == undefined
        ) {
          return false;
        }
      } else {
        if (parent.addLink == true && currentValue == undefined) {
          return false;
        }
      }
    } else {
      // Required Link
      if (type) {
        if (parent.type == type && currentValue == undefined) {
          return false;
        }
      } else {
        if (currentValue == undefined) {
          return false;
        }
      }
    }

    return true;
  } else {
    return true;
  }
}

/**
 * This function returns whether a field should be hidden.
 *
 * @param isOptional
 * @param parent
 * @param type
 * @returns
 */
export function isLinkInputHidden(
  isOptional: boolean,
  parent?: ISanityLink,
  type?: ISanityLinkType
) {
  if (parent !== undefined) {
    // Optional field
    if (isOptional) {
      if (type) {
        if (parent.addLink == true && parent.type == type) {
          return false;
        }
      } else {
        if (parent.addLink == true) {
          return false;
        }
      }
    } else {
      // Required field
      if (type) {
        if (parent.type == type) {
          return false;
        }
      } else {
        return false;
      }
    }

    return true;
  } else {
    return false;
  }
}
