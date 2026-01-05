# AI Recipe Generator

### PROJECT STATUS:
- Core recipe generation: IN PROGRESS
- External AI API: USED
- Frontend-backend communication: REQUIRED
---

## GLOBAL DEFINITIONS

``` 
DEFINE IngredientList AS ARRAY OF STRING
DEFINE PreferenceList AS ARRAY OF STRING
DEFINE RecipeObject AS STRUCT {
    title: STRING
    cook_time: STRING
    ingredients: ARRAY OF STRING
    steps: ARRAY OF STRING
}

DEFINE ApiResponse AS STRUCT {
    success: BOOLEAN
    data: RecipeObject | NULL
    error: STRING | NULL
} 
```
---

## FRONTEND

```
FUNCTION App_Init():
    LOAD UI
    INITIALIZE state.ingredients = EMPTY
    INITIALIZE state.preferences = EMPTY
    INITIALIZE state.recipe = NULL
    INITIALIZE state.loading = FALSE
END FUNCTION
```
```
FUNCTION OnIngredientInputChange(inputText):
    PARSE inputText INTO IngredientList
    UPDATE state.ingredients
END FUNCTION
```
```
FUNCTION OnPreferenceSelect(selectedOptions):
    UPDATE state.preferences
END FUNCTION
```
```
FUNCTION OnGenerateRecipeClick():
    IF state.ingredients IS EMPTY:
        DISPLAY "ERROR: Ingredients required"
        RETURN

    SET state.loading = TRUE

    CREATE requestPayload:
        ingredients = state.ingredients
        preferences = state.preferences

    CALL Backend_GenerateRecipe(requestPayload)
        → response

    IF response.success == TRUE:
        SET state.recipe = response.data
        DISPLAY recipe

    ELSE:
        DISPLAY response.error

    SET state.loading = FALSE
END FUNCTION
```
---

## BACKEND
```
FUNCTION Server_Start():
    INITIALIZE server
    REGISTER endpoint POST /generate-recipe
    LISTEN on PORT
END FUNCTION

ENDPOINT POST /generate-recipe(request):
    DECLARE response AS ApiResponse

    EXTRACT ingredients FROM request.body
    EXTRACT preferences FROM request.body

    IF ingredients IS EMPTY:
        response.success = FALSE
        response.error = "No ingredients provided"
        RETURN response

    prompt = Build_AIPrompt(ingredients, preferences)

    aiResult = Call_AI_API(prompt)

    IF aiResult FAILED:
        response.success = FALSE
        response.error = "AI service error"
        RETURN response

    recipe = Parse_AI_Response(aiResult)

    response.success = TRUE
    response.data = recipe
    RETURN response
END ENDPOINT
```
---

## AI PROMPT GENERATION

``` 
FUNCTION Build_AIPrompt(ingredients, preferences):
    promptText = ""
    promptText += "Generate a recipe using ONLY these ingredients:"
    promptText += ingredients

    IF preferences NOT EMPTY:
        promptText += "Preferences:"
        promptText += preferences

    promptText += "Constraints:"
    promptText += "- Simple steps"
    promptText += "- Beginner friendly"
    promptText += "- Minimal utensils"

    RETURN promptText
END FUNCTION
```
---

## AI COMMUNICATION
```
FUNCTION Call_AI_API(prompt):
    SEND prompt TO external AI API
    WAIT for response

    IF API returns error:
        RETURN FAILURE

    RETURN rawResponse
END FUNCTION
```
---

AI RESPONSE PARSING

```
FUNCTION Parse_AI_Response(rawResponse):
    DECLARE recipe AS RecipeObject

    EXTRACT title FROM rawResponse
    EXTRACT cook_time FROM rawResponse
    EXTRACT ingredients FROM rawResponse
    EXTRACT steps FROM rawResponse

    RETURN recipe
END FUNCTION
```
---
## ERROR HANDLING
```
ON API_KEY_INVALID:
    LOG error
    RETURN "Invalid API key"

ON TIMEOUT:
    LOG error
    RETURN "Request timeout"

ON SERVER_CRASH:
    RESTART server
    LOG incident
```
---

## OUT OF SCOPE (not implemented yet)

- User authentication
- Recipe saving
- Favorites
- User profiles
- History tracking

---

<p align="right">
>END
</p>


