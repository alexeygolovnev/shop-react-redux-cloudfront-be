const formatJSONResponse = (status: 'success' | 'failed', response: Record<string, unknown> | Array<unknown>) => {
    const statusCodeMapper: Record<typeof status, number> = {
        success: 200,
        failed: 400,
    }
    return {
      statusCode: statusCodeMapper[status],
      body: JSON.stringify(response),
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
    }
  }

export default formatJSONResponse;
