// TODO: give credit to getTargetBranch from https://github.com/OndraM/ci-detector/ ?

/**
 * # Continuous Integration helper utilities
 *
 * ## Supported
 *
 * * AppVeyor
 * * AzurePipelines
 * * Bamboo
 * * BitbucketPipelines
 * * Buddy
 * * Drone
 * * GitHubActions
 * * GitLab
 * * Travis
 *
 * ## Unsupported
 *
 * * Circle
 * * Codeship
 * * Continuousphp
 * * Jenkins
 * * TeamCity
 * * Wercker
 * * AwsCodeBuild
 * * SourceHut
 */

export function getTargetBranch(): string {
  return (
    // AzurePipelines
    process.env["SYSTEM_PULLREQUEST_TARGETBRANCH"] ??
    // Bamboo
    process.env["bamboo_repository_pr_targetBranch"] ??
    // BitbucketPipelines
    process.env["BITBUCKET_PR_DESTINATION_BRANCH"] ??
    // Buddy
    process.env["BUDDY_EXECUTION_PULL_REQUEST_BASE_BRANCH"] ??
    // Drone
    process.env["DRONE_TARGET_BRANCH"] ??
    // GitHubActions
    process.env["GITHUB_BASE_REF"] ??
    // GitLab
    ((process.env["CI_EXTERNAL_PULL_REQUEST_TARGET_BRANCH_NAME"] ?? "") !== ""
      ? process.env["CI_EXTERNAL_PULL_REQUEST_TARGET_BRANCH_NAME"]
      : process.env["CI_MERGE_REQUEST_TARGET_BRANCH_NAME"]) ??
    //   AppVeyor
    ((process.env["APPVEYOR_PULL_REQUEST_NUMBER"] ?? "") !== ""
      ? process.env["APPVEYOR_REPO_BRANCH"]
      : undefined) ??
    // Travis
    (process.env["TRAVIS_PULL_REQUEST"] !== undefined &&
    process.env["TRAVIS_PULL_REQUEST"] !== "false"
      ? process.env["TRAVIS_BRANCH"]
      : undefined) ??
    "HEAD"
  );
}
