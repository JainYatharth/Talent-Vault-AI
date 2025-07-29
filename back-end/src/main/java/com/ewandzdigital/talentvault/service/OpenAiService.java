package com.ewandzdigital.talentvault.service;

import com.ewandzdigital.talentvault.dto.ResumeParsedDTO;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.*;

@Service
public class OpenAiService {

    @Value("${openai.api.key}")
    private String apiKey;

    private final String OPENAI_URL = "https://api.openai.com/v1/chat/completions";

    public ResumeParsedDTO extractFieldsFromText(String resumeText) throws Exception {
        RestTemplate restTemplate = new RestTemplate();
        ObjectMapper mapper = new ObjectMapper();

        String prompt = "Extract the following fields from the resume text below:\n" +
                "- candidateName\n- email\n- contactNumber(without country code, read the text carefully as sometimes there can be space between the digits which may lead you to pick only a part of the no.)\n- code(+91 for india, +1 for US/Canada)\n- country(if not mentioned, look for reference to places, and then input the country as per the place)\n- city\n" +
                "- highestEducation(drop down: PH (if Doctorate), PG (if Post Graduation), UG (if Under Graduation), DP (if Diploma) or HS (if High School)\n- specialization(like B.Tech, BCA, BBA, MBA, etc)\n- primarySkillset(if exac keywords or words not present, look for context between the line, look for skills, they needn't specifically be technical, they can be other skills like management, etc, same with secondary skills, avoid putting hobbies or interests as skills unless they seem relevant.) \n- secondarySkillset\n" +
                "- workExperience (in years, integer)\n- lastOrganization(check according to dates and years mentioned in work experience)\n- department (dropdown: TC (if Technical), CS (if Cyber Security), CM (if Content Media), OT (if Others))\n" +
                "- currentStatus (check as per latest work experience or any other relevant field, dropdown: SF (if Student / Fresher), EM (if Employed), UEM (if Unemployed), FR (if Freelancer), NP (if Notice Period)). If any of the fields is not explicitly mentioned,look for context between the line, sematically read the text, to find or infer relevant information that may not be mentioned explicitly.\n\n" +
                "Return strictly in this JSON format:\n" +
                "{\n" +
                "  \"candidateName\": \"\",\n" +
                "  \"email\": \"\",\n" +
                "  \"contactNumber\": \"\",\n" +
                "  \"country\": \"\",\n" +
                "  \"code\": \"\",\n" +
                "  \"city\": \"\",\n" +
                "  \"highestEducation\": \"\",\n" +
                "  \"specialization\": \"\",\n" +
                "  \"primarySkill\": \"\",\n" +
                "  \"secondarySkill\": \"\",\n" +
                "  \"workExperience\": 0,\n" +
                "  \"lastOrganization\": \"\",\n" +
                "  \"department\": \"\",\n" +
                "  \"currentStatus\": \"\"\n" +
                "}\n\n" +
                "Resume Text:\n" + resumeText;

        Map<String, Object> requestBody = new HashMap<>();
        requestBody.put("model", "gpt-3.5-turbo");
        requestBody.put("messages", List.of(Map.of(
                "role", "user",
                "content", prompt
        )));
        requestBody.put("temperature", 0.2);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setBearerAuth(apiKey);

        HttpEntity<Map<String, Object>> request = new HttpEntity<>(requestBody, headers);
        ResponseEntity<Map> response = restTemplate.postForEntity(OPENAI_URL, request, Map.class);

        if (response.getStatusCode().is2xxSuccessful()) {
            Map<String, Object> responseBody = response.getBody();
            List<Map<String, Object>> choices = (List<Map<String, Object>>) responseBody.get("choices");
            Map<String, Object> message = (Map<String, Object>) choices.get(0).get("message");
            String json = (String) message.get("content");
            System.out.println("GPT JSON:\n" + json);

            return mapper.readValue(json, ResumeParsedDTO.class);
        } else {
            throw new RuntimeException("OpenAI API error: " + response.getStatusCode());
        }
    }

}
